import axios from "axios";
import Service from "./Service";

class ImageService extends Service {
    private baseUrl = "http://localhost:6060/api/image/";

    constructor() {
        super();
    }

    public async uploadImage(body: any, token: string) {
        return await axios.post(
            this.baseUrl + "upload",
            body,
            this.createHeader(token)
        );
    }
    public async getUserImage(userId: string) {
        return axios.get(this.baseUrl + userId).then(({ data }) => {
            return data.data;
        });
    }
}

export default new ImageService();
