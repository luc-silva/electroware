import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

import Product from "../models/Product";
import User from "../models/User";
import Category from "../models/Category";
import Wishlist from "../models/WishlistItem";
import { IProduct } from "../interface";
import mongoose from "mongoose";

//get
export const getRecentProducts = asyncHandler(
    async (request: Request, response: Response) => {
        let products = await Product.find().select({id: 1}).limit(12).sort({ createdAt: -1 });
        if (products.length === 0) {
            throw new Error("Nenhum produto encontrado.");
        }
        response.status(200).json(products);
    }
);

//post
export const searchProduct = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Critérios de busca inválidos.");
        }

        let { keyword } = request.params;
        if (typeof keyword !== "string") {
            response.status(400);
            throw new Error("Critérios de busca inválidos.");
        }

        let possibleProducts = await Product.find({
            name: { $regex: keyword },
        });

        if (possibleProducts.length === 0) {
            response.status(404);
            throw new Error("Nenhum produto encontrado.");
        }

        response.status(200).json(possibleProducts);
    }
);

//get, need params
export const getProductDetails = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let product = await Product.findById(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        response.status(200).json(product);
    }
);

//get, need params
export const getProductFromCategory = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        let { id } = request.params;
        if (typeof id !== "string") {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let category = await Category.findById(id);
        if (!category) {
            response.status(404);
            throw new Error("Categoria não encontrada");
        }

        let products = await Product.find({ category: category.id });
        response.status(200).json(products);
    }
);

////private

//post
export const createProduct = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user) {
            response.status(400);
            throw new Error("Insira os dados restantes.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let { name, price, category, quantity, description, brand }: IProduct =
            request.body;
        if (
            typeof name !== "string" ||
            typeof category !== "string" ||
            typeof brand !== "string" ||
            typeof price !== "number" ||
            !Number.isInteger(quantity)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let createdProduct = await Product.create({
            owner: user.id,
            name,
            category,
            brand,
            description,
            price,
            quantity,
        });

        response.status(201).json(createdProduct);
    }
);

//put, need params
export const updateProduct = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.body || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let { id } = request.params;
        if (typeof id !== "string") {
            response.status(404);
            throw new Error("Dados Inválidos");
        }

        let { name, price, category, quantity, description, brand }: IProduct =
            request.body;
        if (
            typeof name !== "string" ||
            typeof category !== "string" ||
            typeof brand !== "string" ||
            typeof price !== "number" ||
            !Number.isInteger(quantity)
        ) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let product = await Product.findById(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }
        if (product.owner.toString() !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        let updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            { name, category, brand, description, price, quantity }
        );

        response.status(201).json(updatedProduct);
    }
);

//delete, need params
export const deleteProduct = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let { id } = request.params;
        if (typeof id !== "string") {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let product = await Product.findById(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        if (product.owner.toString() !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        let deletedProduct = await Product.findByIdAndDelete(product.id);
        response.status(200).json(deletedProduct);
    }
);
