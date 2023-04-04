import axios from "axios";

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

class UserService {
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
            .get(this.baseUrl + `private/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => {
                return data;
            });
    }

    public async getUserTransactions(userId: string, token: string) {
        return await axios
            .get(this.baseUrl + `${userId}/transactions/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(({ data }) => {
                return data;
            });
    }

    public async addFunds(amount: number, token: string) {
        return await axios
            .post(
                this.baseUrl + "/billings/add",
                { amount },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(({ data }) => {
                return data;
            });
    }

    public async deleteAccount(userId: string, token: string) {
        return axios.delete(this.baseUrl + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new UserService();
