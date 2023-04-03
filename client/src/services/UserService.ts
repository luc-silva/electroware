import axios from "axios";

class UserService {
    private baseUrl = "http://localhost:6060/api/user";

    public async getUserInfo(id: string) {
        return await axios.get(this.baseUrl + `/${id}`).then(({ data }) => {
            return data;
        });
    }

    public async getUserPrivateInfo(id: string, token: string) {
        return await axios
            .get(this.baseUrl + `/private/${id}`, {
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
