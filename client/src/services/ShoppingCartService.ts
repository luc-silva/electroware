import axios from "axios";
import Service from "./Service";

interface CartInstanceBody {
    user: string;
    product: string;
    price: number;
    quantity: number;
}

class ShoppingCartService extends Service {
    private baseUrl = "http://localhost:6060/api/shoppingcart";

    public async getCartInstances(token: string) {
        return await axios
            .get(this.baseUrl, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async getSingleInstance(instanceId: string, token: string) {
        return await axios
            .get(this.baseUrl + `/${instanceId}`, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async createCartInstance(body: CartInstanceBody, token: string) {
        return await axios
            .post(this.baseUrl, body, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async deleteCartInstance(instanceId: string, token: string) {
        return axios
            .delete(this.baseUrl + `/${instanceId}`, this.createHeader(token))
            .then((data) => {
                return data;
            });
    }
}

export default new ShoppingCartService();
