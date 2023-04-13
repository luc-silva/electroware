import axios from "axios";
import Service from "./Service";

class ProductService extends Service {
    private baseUrl = "http://localhost:6060/api/product/";
    constructor() {
        super();
    }

    public async createProduct(data: FormData, token: string) {
        return await axios
            .post(this.baseUrl + "create", data, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async getRecentProducts() {
        return await axios.get(this.baseUrl).then(({ data }) => {
            return data;
        });
    }

    public async getProductDetails(productId: string) {
        return await axios
            .get(this.baseUrl + `${productId}`)
            .then(({ data }) => {
                return data;
            });
    }

    public async getProductReviews(productId: string) {
        return await axios
            .get(this.baseUrl + `${productId}/reviews`)
            .then(({ data }) => {
                return data;
            });
    }

    public async searchProduct(keyword: string) {
        return axios
            .post(this.baseUrl + `/search/${keyword}`)
            .then(({ data }) => {
                return data;
            });
    }

    public async removeProduct(productId: string, token: string) {
        return axios.delete(this.baseUrl + productId, this.createHeader(token));
    }
}

export default new ProductService();
