import axios from "axios";
import Service from "./Service";

interface WishlistBody {
    product: string;
}

class WishlistService extends Service {
    private baseUrl = "http://localhost:6060/api/wishlist/";

    constructor() {
        super();
    }

    public async getWishlistItems(token: string) {
        return axios
            .get(this.baseUrl, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async createWishlistInstance(data: WishlistBody, token: string) {
        return await axios
            .post(this.baseUrl, data, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }
}

export default new WishlistService();
