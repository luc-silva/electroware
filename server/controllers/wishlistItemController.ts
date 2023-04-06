import { Request, Response } from "express";

import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import Product from "../models/Product";
import WishlistItem from "../models/WishlistItem";
import { IProduct, IUser } from "../interface";

////private

//get
export const getWishlistItems = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !mongoose.Types.ObjectId.isValid(request.user.id)) {
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

//post
export const createWishlistItem = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !mongoose.Types.ObjectId.isValid(request.user.id)) {
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

        let alreadyWishlisted = await WishlistItem.find({user: user.id, product})
        if(alreadyWishlisted){
            response.status(400)
            throw new Error("Esse item já foi adicionado na lista de desejos.")
        }

        await WishlistItem.create({
            user: user.id,
            product: productFound.id,
            group: "Favoritos",
        });

        response.status(201).json({ message: "Feito." });
    }
);

//delete, need params
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
