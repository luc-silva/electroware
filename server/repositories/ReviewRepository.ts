import Review from "../models/Review";
import { Repository } from "./Repository";

class ReviewRepository extends Repository {
    /**
     * Get review with given id.
     * @param objectId Review ObjectId.
     * @returns Returns review details
     */
    public async getReview(objectId: string) {
        this.validateObjectId(objectId);
        return Review.findById(objectId);
    }

    /**
     * Get a review with given id and populate author field.
     * @param objectId - Review ObjectId.
     * @returns Review details and author name and id.
     */
    public async getReviewAndPopulate(objectId: string) {
        this.validateObjectId(objectId);
        return await Review.findById(objectId).populate("author", { name: 1 });
    }

    /**
     * Get reviews IDs from a product with given id and sort by the most recent.
     * @param objectId - Product ObjectId.
     */
    public async getProductReviews(objectId: string) {
        this.validateObjectId(objectId);
        return await Review.find({ product: objectId }).select({ id: 1 }).sort({
            createdAt: -1,
        });
    }

    /**
     * Get reviews ids made by user with given id.
     * @param objectId
     * @returns
     */
    public async getReviewsMadeByUser(objectId: string) {
        this.validateObjectId(objectId);
        return await Review.find({ author: objectId }).select({ id: 1 });
    }

    public async getEveryReviewFromUserProducts() {}

    /**
     *Create a new review with given author id and data.
     * @param authorId User ObjectId.
     * @param reviewData Review data such as score, text and product.
     */
    public async createReview(authorId: string, reviewData: any) {
        this.validateObjectId(authorId);
        await Review.create({ author: authorId, ...reviewData });
    }

    /**
     * Delete review with given id.
     * @param objectId Review ObjectId.
     */
    public async deleteReview(objectId: string) {
        this.validateObjectId(objectId);
        await Review.findByIdAndDelete(objectId);
    }

    /**
     * Update review with given id and data.
     * @param objectId Review ObjectId.
     * @param updatedReviewData Updated data such as text and score.
     */
    public async updateReview(
        objectId: string,
        updatedReviewData: { text: string; score: number }
    ) {
        this.validateObjectId(objectId);
        await Review.findByIdAndUpdate(objectId, updatedReviewData);
    }
}

export default new ReviewRepository();
