import axios from "axios";
import Service from "./Service";

class CategoryService extends Service {
    private baseUrl = "http://localhost:6060/api/category/";

    public async getCategory(categoryId: string) {
        return await axios.get(this.baseUrl + categoryId).then(({ data }) => {
            return data;
        });
    }

    public async getCategories() {
        return await axios.get(this.baseUrl).then(({ data }) => {
            return data;
        });
    }
    public async getCategoryProducts(categoryId: string) {
        return await axios
            .get(this.baseUrl + `${categoryId}/products`)
            .then(({ data }) => {
                return data;
            });
    }
}

export default new CategoryService();
