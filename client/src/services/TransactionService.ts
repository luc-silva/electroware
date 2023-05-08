import axios from "axios";
import Service from "./Service";

interface TransactionBody {
    paymentMethod: string;
}

class TransactioService extends Service {
    private baseUrl = "http://localhost:6060/api/transaction";

    public async createTransaction(body: TransactionBody, token: string) {
        return axios.post(this.baseUrl, body, this.createHeader(token));
    }

    public async getTransactions() {}
}

export default new TransactioService();
