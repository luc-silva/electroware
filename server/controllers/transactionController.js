const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const connectDB = require("../middleware/db");

const ProductInstance = require("../models/ProductInstance");
const Product = require("../models/Product");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const createProductTransaction = asyncHandler(async (request, response) => {
    let { paymentMethod } = request.body;
    if(!paymentMethod){
        response.status(400)
        throw new Error("Insira dados válidos")
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404);
        throw new Error("Usuário não encontrado");
    }
    let products = await ProductInstance.find({ user: user.id });
    if (products.length === 0) {
        response.status(401);
        throw new Error("Não há produtos no carrinhos de compras");
    }

    function getTotal() {
        let total = 0;
        products.forEach(({ price, quantity }) => {
            total += price * quantity;
        });
        return total;
    }

    if (user.funds < getTotal()) {
        response.status(400);
        throw new Error("Fundos insuficientes");
    }

    try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            let data = {
                buyer: user.id,
                paymentMethod,
                products,
                totalPrice: getTotal(),
            };
            let transaction = await Transaction.create([data], { session });

            await User.findByIdAndUpdate(
                [user.id],
                { $inc: { funds: -getTotal() } },
                { session }
            );

            for (let productInstance of products) {
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
            response.json(transaction);
        });
        session.endSession();
    } catch (error) {
        throw new Error(`Algo deu errado: ${error}`);
    }
});

//protected
const getUserTransactions = asyncHandler(async (request, response) => {
    let user = await User.findById(request.user);
    if (!user) {
        response.status(404);
        throw new Error("Usuário não encontrado");
    }

    if (user.id !== request.params.id) {
        response.status(401);
        throw new Error("Não autorizado");
    }

    let transactions = await Transaction.find({ buyer: user._id });
    response.status(202).json(transactions);
});
module.exports = {
    createProductTransaction,
    getUserTransactions,
};
