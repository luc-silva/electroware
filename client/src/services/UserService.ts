import axios from "axios";
import Service from "./Service";

interface RegistrationBody {
    state: string;
    country: string;
    email: string;
    password: string;
    name: { first: string; last: string };
    location: { state: string; country: string };
}

interface LogInBody {
    email: string;
    password: string;
}

class UserService extends Service {
    private baseUrl = "http://localhost:6060/api/user/";

    public async registerUser(data: RegistrationBody) {
        return await axios.post(this.baseUrl + "register", data);
    }

    public async logInUser(data: LogInBody) {
        return await axios
            .post(this.baseUrl + "login", data)
            .then(({ data }) => {
                return data;
            });
    }

    public async getUserInfo(userId: string) {
        return await axios.get(this.baseUrl + `${userId}`).then(({ data }) => {
            return data;
        });
        //.then(({ data }) => {return data;});
    }

    public async getUserProducts(userId: string) {
        return await axios
            .get(this.baseUrl + `${userId}/products`)
            .then(({ data }) => {
                return data;
            });
    }

    public async getUserProductsReviews(userId: string) {
        return await axios
            .get(this.baseUrl + `${userId}/products/reviews`)
            .then(({ data }) => {
                return data;
            });
    }

    public async getUserPrivateInfo(userId: string, token: string) {
        return await axios
            .get(this.baseUrl + `private/${userId}`, this.createHeader(token))
            .then(({ data }) => {
                return data;
            });
    }

    public async getUserTransactions(userId: string, token: string) {
        return await axios
            .get(
                this.baseUrl + `${userId}/transactions/`,
                this.createHeader(token)
            )
            .then(({ data }) => {
                return data;
            });
    }

    public async addFunds(amount: number, token: string) {
        return await axios
            .post(
                this.baseUrl + "billings/add",
                { amount },
                this.createHeader(token)
            )
            .then(({ data }) => {
                return data;
            });
    }

    public async deleteAccount(userId: string, token: string) {
        return axios.delete(this.baseUrl + userId,this.createHeader(token));
    }
}

export default new UserService();
