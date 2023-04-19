import { Request, Response } from "express";

import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import Product from "../models/Product";
import WishlistItem from "../models/WishlistItem";
import { IProduct, IUser } from "../interface";

/**
 * GET, AUTH REQUIRED - Get wishlist items of a user with given valid ObjectId.
 * 
 * @param {Request} request - The HTTP request object containing the ID of a user.
 * @param {Response} response - The HTTP response object containing every wishilist item found.
 * @throws throws error if receives a invalid ID or if a use has not been found.
 */
export const getWishlistItems = asyncHandler(
    async (request: Request, response: Response) => {
        if (
            !request.user ||
            !mongoose.Types.ObjectId.isValid(request.user.id)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let items = await WishlistItem.find({ user: user.id });

        response.status(200).json(items);
    }
);

/**
 * POST, AUTH REQUIRED - Create a wishilist instance with given valid product ObjectID.
 * 
 * @param {Request} request - The HTTP request object containing product info and user.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid id, invalid body data, or if a use has not been found.
 */
export const createWishlistItem = asyncHandler(
    async (request: Request, response: Response) => {
        if (
            !request.user ||
            !mongoose.Types.ObjectId.isValid(request.user.id)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        if (
            !request.body ||
            !mongoose.Types.ObjectId.isValid(request.body.product)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        let { product } = request.body;

        let user = (await User.findById(request.user)) as IUser;
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let productFound = (await Product.findById(product)) as IProduct;
        if (!productFound) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        if (productFound.owner === user.id) {
            response.status(400);
            throw new Error("Não é possivel adicionar o próprio produto.");
        }

        let alreadyWishlisted = await WishlistItem.findOne({
            user: user.id,
            product,
        });

        if (alreadyWishlisted) {
            await WishlistItem.findByIdAndRemove(alreadyWishlisted.id);
            response
                .status(201)
                .json({ message: "Produto removido da lista de desejos." });
        } else {
            await WishlistItem.create({
                user: user.id,
                product: productFound.id,
                group: "Favoritos",
            });
            response
                .status(201)
                .json({ message: "Adicionado à lista de desejos." });
        }
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a wishlist instance with given valid ObjectID.
 * 
 * @param {Request} request - The HTTP request object containing the id of the instance as a parameter.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid id, invalid body data, or if a use has not been found.
 */
export const removeWishlistItem = asyncHandler(
    async (request: Request, response: Response) => {
        if (
            !request.user ||
            !mongoose.Types.ObjectId.isValid(request.user.id)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        if (
            !request.params ||
            !mongoose.Types.ObjectId.isValid(request.params.id)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }
        let { id } = request.params;

        let wishlistItem = await WishlistItem.findById(id);
        if (!wishlistItem) {
            response.status(404);
            throw new Error("Produto não encontrado");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        if (user.id !== wishlistItem.user) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await WishlistItem.findByIdAndDelete(id);

        response.status(200).json({ message: "Feito." });
    }
);
