import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";
import WishlistItemRepository from "../repositories/WishlistItemRepository";
import WishlistCollectionRepository from "../repositories/WishlistCollectionRepository";

/**
 * GET, AUTH REQUIRED - Get wishlist items of a user with given valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the ID of a user.
 * @param {Response} response - The HTTP response object containing every wishilist item found.
 * @throws throws error if receives a invalid ID or if a use has not been found.
 */
export const getWishlistItems = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let items = await WishlistItemRepository.getWishlistItemsByUser(
            user.id
        );

        response.status(200).json(items);
    }
);

/**
 * POST, AUTH REQUIRED - Create a wishilist instance with given valid product ObjectID.
 *
 * @param {Request} request - The HTTP request object containing product info and user.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid id, invalid body data, or if a user or collection has not been found.
 */
export const createWishlistItem = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        let { product, group } = request.body;
        //add validator

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let productFound = await ProductRepository.getProductDetails(product);
        if (!productFound) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        if (productFound.owner === user.id) {
            response.status(400);
            throw new Error("Não é possivel adicionar o próprio produto.");
        }

        let collection = await WishlistCollectionRepository.getCollection(
            group
        );
        if (!collection) {
            response.status(404);
            throw new Error("Coleção não encontrada.");
        }

        let alreadyAddedToCollection =
            await WishlistItemRepository.getWishlistItemByUserProductAndCollection(
                user.id,
                product,
                collection.id
            );
        if (alreadyAddedToCollection) {
            response.status(400);
            throw new Error("Produto já adicionado à coleção selecionada.");
        }

        await WishlistItemRepository.createWishlistItem(user.id, {
            product: productFound.id,
            group: collection.id,
        });

        response.status(201).json({ message: "Adicionado à lista." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a wishlist instance with given valid ObjectID.
 * @param {Request} request - The HTTP request object containing the id of the instance as a parameter.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid id, invalid body data, or if a use has not been found.
 */
export const removeWishlistItem = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }
        let { id } = request.params;

        let wishlistItem = await WishlistItemRepository.getWishlistItem(id);
        if (!wishlistItem) {
            response.status(404);
            throw new Error("Produto não encontrado");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        if (user.id !== wishlistItem.user) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await WishlistItemRepository.deleteWishlistItem(id);

        response.status(200).json({ message: "Feito." });
    }
);
