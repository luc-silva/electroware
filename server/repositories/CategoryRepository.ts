import Category from "../models/Category";
import { Repository } from "./Repository";

class CategoryRepository extends Repository {
    /**
     * Get category by given name.
     *
     * @param categoryName - Category name.
     */
    public async getCategoryByName(categoryName: string) {
        return await Category.findOne({ name: categoryName });
    }

    /**
     * Get every category names.
     */
    public async getCategoryNames() {
        return await Category.find().select({ name: 1 });
    }

    /**
     * Create a category with given name.
     *
     * @param categoryData - Category data such as name.
     */
    public async createCategory(categoryData: { name: string }) {
        await Category.create(categoryData);
    }

    /**
     * Get a single category details
     *
     * @param ObjectId - Category id.
     */
    public async getSingleCategory(ObjectId: string) {
        this.validateObjectId(ObjectId);
        return await Category.findById(ObjectId);
    }
}

export default new CategoryRepository();
