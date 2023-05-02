import WishlistItem from "../models/WishlistItem";
import { Repository } from "./Repository";

class WishlistItemRepository extends Repository {
    /**
     * Get wishlist item with given id.
     * @param objectId - Wishlist item ObjectId.
     * @returns Return wishlist item details object.
     */
    public async getWishlistItem(objectId: string) {
        this.validateObjectId(objectId);
        return WishlistItem.findById(objectId);
    }

    /**
     * Get wishlist items with given user id.
     * @param objectId - User ObjectId.
     * @returns Returns wishlist item details object.
     */
    public async getWishlistItemsByUser(objectId: string) {
        this.validateObjectId(objectId);
        return await WishlistItem.find({ user: objectId });
    }

    /**
     * Get wishlist items with given collection id.
     * @param objectId - Collection ObjectId.
     * @returns Returns wishlist item details object.
     */
    public async getWishlistItemsByCollection(objectId: string) {
        this.validateObjectId(objectId);
        return await WishlistItem.find({ group: objectId });
    }

    /**
     * Get wishlist item with given collection, product and user ids.
     * @param userId - User ObjectId.
     * @param productId - Product ObjectId.
     * @param collectionId - Product ObjectId.
     * @returns Returns wishlist item details object.
     */
    public async getWishlistItemByUserProductAndCollection(
        userId: string,
        productId: string,
        collectionId: string
    ) {
        this.validateObjectId(userId);
        this.validateObjectId(collectionId);
        return await WishlistItem.findOne({
            user: userId,
            product: productId,
            group: collectionId,
        });
    }

    /**
     * Delete wishlist item with given id.
     * @param objectId Wishlist item ObjectId
     */
    public async deleteWishlistItem(objectId: string) {
        this.validateObjectId(objectId);
        await WishlistItem.findByIdAndDelete(objectId);
    }

    /**
     * Create wishlist item with given user id and data.
     * @param userId - User ObjectId.
     * @param itemData - Item data such as product id and group.
     */
    public async createWishlistItem(userId: string, itemData: any) {
        this.validateObjectId(userId);
        await WishlistItem.create({ ...itemData, user: userId });
    }
}

export default new WishlistItemRepository();
