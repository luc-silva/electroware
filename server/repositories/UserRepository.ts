import User from "../models/User";
import { Repository } from "./Repository";
import { startSession } from "mongoose";
import Product from "../models/Product";
import Review from "../models/Review";
import WishlistItem from "../models/WishlistItem";
import ProductInstance from "../models/ProductInstance";

interface UpdatedUserData {
    name?: { first: string; last: string };
    location?: { state: string; country: string };
    description?: string;
    email?: string;
    password?: string;
}

class UserRepository extends Repository {
    /**
     * Get user details without password and funds with given valid ObjectId.
     * @param objectId - User ObjectId.
     * @returns Returns user details object.
     */
    public async getUser(objectId: string) {
        this.validateObjectId(objectId);
        return await User.findById(objectId).select({ password: 0, funds: 0 });
    }

    /**
     * Get user password and email.
     * @param objectId - User ObjectId.
     * @returns Returns user details object.
     */
    public async getUserPrivateDetails(objectId: string) {
        this.validateObjectId(objectId);
        return await User.findById(objectId).select({ password: 1, email: 1 });
    }

    /**
     * Get user email and funds with given valid ObjectId.
     * @param objectId - User ObjectId.
     * @returns Returns user details object.
     */
    public async getUserEmailAndFunds(objectId: string) {
        this.validateObjectId(objectId);
        return await User.findById(objectId).select({ email: 1, funds: 1 });
    }

    /**
     * Get user information with given email.
     * @param email - Email used to log in.
     * @returns Returns user details object.
     */
    public async getUserInfoWithEmail(email: string) {
        return await User.findOne({ email }).select({
            location: 0,
            description: 0,
        });
    }

    /**
     * Get user products with given product id.
     * @param objectId - User id.
     * @returns Returns user products IDs.
     */
    public async getUserProducts(objectId: string) {
        return await Product.find({ owner: objectId }).select({
            id: 1,
        });
    }

    /**
     * Create User with given data.
     * @param newUserData - User data such as name, location, email and hashed password.
     */
    public async createUser(newUserdata: any) {
        await User.create(newUserdata);
    }

    /**
     * update user details with given id.
     * @param objectId - User ObjectId.
     * @param updatedUserData - Data containg updated info such as location, name and description.
     */
    public async findUserAndUpdateDetails(
        objectId: string,
        updatedUserData: UpdatedUserData
    ) {
        this.validateObjectId(objectId);

        await User.findByIdAndUpdate(objectId, updatedUserData);
    }

    /**
     * Delete user account and related items with given valid ObjectId.
     * @param objectId - User ObjectId.
     */
    public async deleteUserAccount(objectId: string) {
        this.validateObjectId(objectId);

        let session = await startSession();
        await session.withTransaction(async () => {
            let user = await this.getUser(objectId);
            if (user) {
                await Product.deleteMany(
                    { owner: user.id },
                    {
                        session,
                    }
                );
                await Review.deleteMany(
                    { author: user.id },
                    {
                        session,
                    }
                );
                await Review.deleteMany({ productOwner: user.id }, { session });
                await WishlistItem.deleteMany({ user: user.id }, { session });

                await ProductInstance.deleteMany(
                    { user: user.id },
                    { session }
                );
                await ProductInstance.deleteMany(
                    { seller: user.id },
                    { session }
                );

                await User.deleteOne({ id: user.id }, { session });
            }
            await session.commitTransaction();
        });
        session.endSession();
    }

    /**
     * Delete user account and related items with given id.
     * @param objectId - User ObjectId.
     */
    public async addUserFunds(objectId: string, amount: number) {
        await User.findByIdAndUpdate(objectId, {
            $inc: { funds: +amount },
        });
    }
}

export default new UserRepository();
