import { startSession, Types } from "mongoose";
import ImageInstance from "../models/ImageInstance";
import Product from "../models/Product";
import Review from "../models/Review";
import { Repository } from "./Repository";

class ProductRepository extends Repository {
    /**
     * Get id of the most recent created products
     *
     */
    public async getRecentProducts() {
        return await Product.find()
            .select({ id: 1 })
            .limit(12)
            .sort({ createdAt: -1 });
    }

    /**
     * Get the average score from a product with given id.
     *
     * @params objectId - Product ObjectId.
     */
    public async getAverageScoreFromProduct(objectId: string) {
        this.validateObjectId(objectId);

        return await Review.aggregate([
            { $group: { _id: "$product", averageScore: { $avg: "$score" } } },
            { $match: { _id: new Types.ObjectId(objectId) } },
            { $limit: 1 },
        ]);
    }

    /**
     * Get products with specified keyword.
     *
     * @param keyword - String to search for an item.
     */
    public async searchProductWithKeyword(keyword: string) {
        return await Product.find({
            name: { $regex: new RegExp(keyword, "i") },
        });
    }

    /**
     * Get product details.
     *
     * @param objectId - Product ObjectId.
     */
    public async getProductDetails(objectId: string) {
        this.validateObjectId(objectId);
        return await Product.findById(objectId);
    }

    /**
     * Create a product and its related image.
     *
     * @param productData - Product data such as name, category and related user.
     * @param imageData - Image data such as buffer, related user and image type.
     */
    public async createProduct(productData: any, imageData: any) {
        let session = await startSession();
        await session.withTransaction(async () => {
            let product = await Product.create(productData);
            await ImageInstance.create({
                ...imageData,
                imageName: product.name,
                product: product.id,
                imageAlt: `Product ${product.name}`,
            });

            await session.commitTransaction();
        });
        await session.endSession();
    }

    /**
     * Update product with given data and product id.
     *
     * @param objectId - Product ObjectId.
     * @param updatedProductData - Product data.
     */
    public async updateProduct(objectId: string, updatedProductData: any) {
        this.validateObjectId(objectId);
        await Product.findByIdAndUpdate(objectId, updatedProductData);
    }

    /**
     * Delete a product and related items with given product id
     *
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
