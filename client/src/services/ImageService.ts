import axios from "axios";
import Service from "./Service";

class ImageService extends Service {
    private baseUrl = "http://localhost:6060/api/image/";

    public async uploadImage(body: any, token: string) {
        return await axios.post(
            this.baseUrl + "upload",
            body,
            this.createHeader(token)
        );
    }
    public async getUserImage(userId: string) {
        return axios
            .get(this.baseUrl + `user/${userId}`)
            .then(({ data }) => {
                return data.data;
            })
    }
    public async getProductImage(productId: string) {
        return axios
            .get(this.baseUrl + `product/${productId}`)
            .then(({ data }) => {
                return data.data;
            });
    }
}

export default new ImageService();
