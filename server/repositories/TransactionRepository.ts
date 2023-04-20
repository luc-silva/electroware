import { startSession } from "mongoose";
import { IProduct, IProductInstance } from "../interface";
import Product from "../models/Product";
import ProductInstance from "../models/ProductInstance";
import Transaction from "../models/Transaction";
import User from "../models/User";
import { Repository } from "./Repository";

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
                buyer: userId,
                trasactionItemData,
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

    public async findTrasactionItemByBuyer(objectId: string) {
        this.validateObjectId(objectId);
        await Transaction.find({ buyer: objectId });
    }
}

export default new TransactionRepository();
