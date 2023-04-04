import axios from "axios";

class WishlistService {
    private baseUrl = "http://localhost:6060/api/wishlist/";

    public async getWishlistItems(token:string) {
        return axios.get(this.baseUrl, {
            headers: { Authorization: `Bearer ${token}` },
        }).then(({ data }) => {
            return data;
        });
    }
}

export default new WishlistService();
