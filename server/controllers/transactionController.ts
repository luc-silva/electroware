import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { connectDB } from "../middleware/db";

import ProductInstance from "../models/ProductInstance";
import Product from "../models/Product";
import User from "../models/User";
import Transaction from "../models/Transaction";
import { Request, Response } from "express";
import { IUser } from "../interface";
import TransactionValidator from "../validators/TransactionValidator";

//post
export const createProductTransaction = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = (await User.findById(request.user)) as IUser;
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        TransactionValidator.validate(response, request.body);
        let { paymentMethod } = request.body;

        let productsBought = await ProductInstance.find({ user: user.id });
        if (productsBought.length === 0) {
            response.status(404);
            throw new Error("Não há produtos no carrinhos de compras.");
        }

        function getTotal() {
            let total = 0;
            productsBought.forEach(({ price, quantity }) => {
                total += price * quantity;
            });
            return total;
        }

        if (user.funds < getTotal()) {
            response.status(400);
            throw new Error("Fundos insuficientes.");
        }

        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            let data = {
                buyer: user.id,
                paymentMethod,
                products: productsBought,
                totalPrice: getTotal(),
            };
            let transaction = await Transaction.create([data], { session });

            await User.findByIdAndUpdate(
                [user.id],
                { $inc: { funds: -getTotal() } },
                { session }
            );

            for (let productInstance of productsBought) {
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
                await Product.findByIdAndUpdate([productInstance.product], {
                    $inc: { quantity: -productInstance.quantity },
                });

                await ProductInstance.findByIdAndDelete(productInstance.id);
            }

            await session.commitTransaction();
            response.status(201).json(transaction);
        });
        session.endSession();
    }
);

////private

//get, need params
export const getUserTransactions = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (user.id !== request.params.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        let transactions = await Transaction.find({ buyer: user._id });
        response.status(200).json(transactions);
    }
);
