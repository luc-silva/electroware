import axios from "axios";

interface CartInstanceBody {
    user: string;
    product: string;
    price: number;
    quantity: number;
}

class ShoppingCartService {
    private baseUrl = "http://localhost:6060/api/shoppingcart";

    public async createCartInstance(body: CartInstanceBody, token: string) {
        return await axios
            .post(this.baseUrl, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(({ data }) => {
                return data;
            });
    }
}

export default new ShoppingCartService();
