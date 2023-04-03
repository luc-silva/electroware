import axios, { AxiosResponse } from "axios";

class ProductService {
    private baseUrl = "http://localhost:6060/api/product/";

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

    public async removeProduct(productId: string, token: string) {
        axios.delete(this.baseUrl + productId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new ProductService();
