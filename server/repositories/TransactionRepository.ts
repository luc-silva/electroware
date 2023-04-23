import { Types, startSession } from "mongoose";
import { Repository } from "./Repository";

import Product from "../models/Product";
import ProductInstance from "../models/ProductInstance";
import Transaction from "../models/Transaction";
import User from "../models/User";

interface TransactioItemData {
    paymentMethod: string;
    totalPrice: number;
    products: any[];
}

class TransactionRepository extends Repository {
    /**
     * Create transaction item with given data.
     * @param userId - User ObjectId.
     * @param trasactionItemData Transaction data containing products, total value and payment method.
     */
    public async createTransactionItem(
        userId: string,
        trasactionItemData: TransactioItemData
    ) {
        const session = await startSession();
        await session.withTransaction(async () => {
            let data = {
                ...trasactionItemData,
                buyer: userId,
            };
            await Transaction.create([data], { session });

            await User.findByIdAndUpdate(
                [userId],
                { $inc: { funds: -trasactionItemData.totalPrice } },
                { session }
            );

            for (let productInstance of trasactionItemData.products) {
                await User.findByIdAndUpdate(
                    [productInstance.seller],
                    {
                        $inc: {
                            funds: +(
                                productInstance.price * productInstance.quantity
                            ),
                        },
                    },
                    { session }
                );
                await Product.findByIdAndUpdate(
                    [productInstance.product],
                    {
                        $inc: { quantity: -productInstance.quantity },
                    },
                    { session }
                );

                await ProductInstance.findByIdAndDelete(productInstance.id, {
                    session,
                });
            }

            await session.commitTransaction();
        });
        session.endSession();
    }

    /**
     * Get transaction items with given buyer id.
     * @param objectId User ObjectId.
     * @returns Returns detailed transaction items.
     */
    public async getTrasactionItemsByBuyer(objectId: string) {
        this.validateObjectId(objectId);
        return await Transaction.find({ buyer: objectId });
    }
}

export default new TransactionRepository();
