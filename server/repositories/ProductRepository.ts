import { startSession, Types } from "mongoose";
import ImageInstance from "../models/ImageInstance";
import Product from "../models/Product";
import Review from "../models/Review";
import { Repository } from "./Repository";

class ProductRepository extends Repository {
    /**
     * Get ids of the most recent created products.
     * @returns Returns IDs of products.
     */
    public async getRecentProducts() {
        return await Product.find()
            .select({ id: 1 })
            .limit(12)
            .sort({ createdAt: -1 });
    }

    /**
     * Get ids of product with active discount.
     * @returns Returns IDs of products.
     */
    public async getDiscountedProducts() {
        return await Product.find({ on_sale: true })
            .select({ id: 1 })
            .sort({ updatedAt: -1 });
    }

    /**
     * Get the average score from a product with given id.
     * @param objectId - Product ObjectId.
     * @returns Returns product score.
     */
    public async getAverageScoreFromProduct(objectId: string) {
        this.validateObjectId(objectId);

        let score = await Review.aggregate([
            { $group: { _id: "$product", avg_score: { $avg: "$score" } } },
            { $match: { _id: new Types.ObjectId(objectId) } },
            { $limit: 1 },
        ]);
        return score.length === 0 ? {avg_score:0} : score[0];
    }

    /**
     * Get the score from a given product id and group by the stars.
     * @param objectId - Product ObjectId.
     * @returns Returns product score groups.
     */
    public async getRatingsMetrics(objectId: string) {
        this.validateObjectId(objectId);
        return await Review.aggregate([
            { $match: { product: new Types.ObjectId(objectId) } },
            {
                $group: {
                    _id: "$score",
                    quant: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ]);
    }

    /**
     * Get products with specified keyword.
     * @param keyword - String to search for an item.
     * @returns Returns IDs of products.
     */
    public async searchProductWithKeyword(keyword: string) {
        return await Product.find({
            name: { $regex: new RegExp(keyword, "i") },
        }).select({ id: 1 });
    }

    /**
     * Get product details.
     * @param objectId - Product ObjectId.
     * @returns Returns product details object.
     */
    public async getProductDetails(objectId: string) {
        this.validateObjectId(objectId);
        return await Product.findById(objectId);
    }

    /**
     * Create a product and its related image.
     * @param productData - Product data such as name, category and related user.
     * @param imageData - Image data such as buffer, related user and image type.
     * @returns - Product ID.
     */
    public async createProduct(productData: any, imageData: any) {
        let session = await startSession();
        let productID = "";

        await session.withTransaction(async () => {
            let product = await Product.create(productData);
            await ImageInstance.create({
                ...imageData,
                imageName: product.name,
                product: product.id,
                imageAlt: `Product ${product.name}`,
            });

            productID = product.id;

            await session.commitTransaction();
        });
        await session.endSession();
        return productID;
    }

    /**
     * Update product with given data and product id.
     * @param objectId - Product ObjectId.
     * @param updatedProductData - Product data.
     */
    public async updateProduct(objectId: string, updatedProductData: any) {
        this.validateObjectId(objectId);
        await Product.findByIdAndUpdate(objectId, updatedProductData);
    }

    /**
     * Delete a product and related items with given product id
     * @param objectId - Product ObjectId.
     */
    public async deleteProduct(objectId: string) {
        this.validateObjectId(objectId);

        const session = await startSession();
        await session.withTransaction(async () => {
            await Review.deleteMany({ product: objectId }, { session });
            await Product.findByIdAndDelete([objectId], { session });
            await session.commitTransaction();
        });

        session.endSession();
    }
}

export default new ProductRepository();
