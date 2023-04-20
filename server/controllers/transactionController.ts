import asyncHandler from "express-async-handler";

import { Request, Response } from "express";
import { IUser } from "../interface";
import TransactionValidator from "../validators/TransactionValidator";
import UserRepository from "../repositories/UserRepository";
import CartItemRepository from "../repositories/CartItemRepository";
import TransactionRepository from "../repositories/TransactionRepository";

/**
 * POST, AUTH REQUIRED - Create a transaction instance with given data.
 *
 * @param {Request} request - The HTTP request object containing the user ID and payment method.
 * @param {Response} response - The HTTP response object containing conclusion message.
 * @throws throws error if user id isn't valid, if user has not been found or if user doesn't have required credit amount.
 */
export const createProductTransaction = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        TransactionValidator.validate(response, request.body);
        let { paymentMethod } = request.body;

        let productsBought = await CartItemRepository.getCartItemsByUser(
            user.id
        );
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

        let data = {
            paymentMethod,
            products: productsBought,
            totalPrice: getTotal(),
        };

        await TransactionRepository.createTransactionItem(user.id, data);
        response.status(201).json({ message: "Compra Concluida." });
    }
);

/**
 * GET, AUTH REQUIRED - Get every user transactions with given valid user id.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing every user transactions.
 * @throws throws error if user id isn't valid, if user has not been found or if the request user ID is different from user id
 */
export const getUserTransactions = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (user.id !== request.params.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        let transactions 
            await TransactionRepository.getTrasactionItemsByBuyer(user.id);
        response.status(200).json(transactions);
    }
);
