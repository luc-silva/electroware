import { SessionOption, Types } from "mongoose";
import { ICollectionData } from "../interface";
import WishlistCollection from "../models/WishlistCollection";
import { Repository } from "./Repository";

class WishlistCollectionRepository extends Repository {
    /**
     * Create a wishlist collection with given data.
     * @param collectionData Data containing name, user and privated status.
     */
    public async createCollection(collectionData: ICollectionData) {
        await WishlistCollection.create(collectionData);
    }

    /**
     * Update a collection with given collection id.
     * @param collectionId Valid collection ObjectId.
     * @param collectionData Object containing the data to be updated.
     */
    public async updateCollectionDetails(
        collectionId: string,
        collectionData: ICollectionData
    ) {
        this.validateObjectId(collectionId);
        await WishlistCollection.findByIdAndUpdate(
            collectionId,
            collectionData
        );
    }

    /**
     * Delete a collection with given collection id.
     * @param collectionId Valid collection ObjectId.
     */
    public async deleteCollection(
        collectionId: string,
        session?: SessionOption
    ) {
        this.validateObjectId(collectionId);
        await WishlistCollection.findByIdAndDelete(
            collectionId,
            session ? session : undefined
        );
    }

    /**
     * Get a collection with given collection id.
     * @param collectionId Valid collection ObjectId.
     * @returns Returns an object containing collection details.
     */
    public async getCollection(collectionId: string) {
        this.validateObjectId(collectionId);
        return await WishlistCollection.findById(collectionId);
    }

    /**
     * Get every collection from a user, including privated.
     * @param userId Valid user ObjectId.
     * @returns Returns an array of wishlist collections id.
     */
    public async getCollectionsFromUser(userId: string) {
        this.validateObjectId(userId);

        return await WishlistCollection.find({
            user: new Types.ObjectId(userId),
        });
    }

    /**
     * Get public collections from a user.
     * @param userId Valid user ObjectId.
     * @returns Returns an array of wishlist collections id.
     */
    public async getPublicCollectionsFromUser(userId: string) {
        this.validateObjectId(userId);

        return await WishlistCollection.find({
            user: new Types.ObjectId(userId),
            privated: false,
        });
    }
    /**
     * Get collection by given name from a user.
     * @param userId Valid user ObjectId.
     * @param name Collection name.
     * @returns Returns an object of the found collection.
     */
    public async getCollectionByNameFromUser(userId: string, name: string) {
        this.validateObjectId(userId);

        return await WishlistCollection.findOne({
            user: new Types.ObjectId(userId),
            name,
        });
    }
}
export default new WishlistCollectionRepository();
