import Category from "../models/Category";
import Product from "../models/Product";
import { Repository } from "./Repository";

class CategoryRepository extends Repository {
    /**
     * Get category with given name.
     * @param categoryName - Category name.
     * @returns Returns category details object.
     */
    public async getCategoryByName(categoryName: string) {
        return await Category.findOne({ name: categoryName });
    }

    /**
     * Get every category names.
     * @return Returns array of string containing categories names.
     */
    public async getCategoryNames() {
        return await Category.find().select({ name: 1 });
    }

    /**
     * Create a category with given name.
     * @param categoryData - Category data such as name.
     */
    public async createCategory(categoryData: { name: string }) {
        await Category.create(categoryData);
    }

    /**
     * Get a single category details
     * @param ObjectId - Category id.
     * @returns Returns category details object.
     */
    public async getSingleCategory(ObjectId: string) {
        this.validateObjectId(ObjectId);
        return await Category.findById(ObjectId);
    }

    /**
     * Get products related to a category.
     * @param objectId - Category ObjectId.
     * @returns Returns IDs of products.
     */
    public async getCategoryProducts(objectId: string) {
        return await Product.find({ category: objectId }).select({
            id: 1,
        });
    }
}

export default new CategoryRepository();
