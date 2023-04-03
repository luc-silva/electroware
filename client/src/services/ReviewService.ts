import axios from "axios";

interface ReviewBody {
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    text: string;
    score: number;
}

class ReviewService {
    private baseUrl = "http://localhost:6060/api/review";

    public async getReview(reviewId: string) {
        axios.get(this.baseUrl + reviewId);
    }

    public async submitReview(data: ReviewBody, token: string) {
        axios.post(this.baseUrl, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    public async deleteReview(reviewId: string, token: string){
        axios.delete(reviewId, {
            headers: { Authorization: `Bearer ${token}` },
        })
    }
}

export default new ReviewService();
