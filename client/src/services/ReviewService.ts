import axios from "axios";
import Service from "./Service";

interface ReviewBody {
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    text: string;
    score: number;
}

class ReviewService extends Service {
    private baseUrl = "http://localhost:6060/api/review";

    public async getReview(reviewId: string) {
        axios.get(this.baseUrl + reviewId);
    }

    public async submitReview(data: ReviewBody, token: string) {
        axios.post(this.baseUrl, data, this.createHeader(token));
    }

    public async deleteReview(reviewId: string, token: string) {
        axios.delete(reviewId, this.createHeader(token));
    }
}

export default new ReviewService();
