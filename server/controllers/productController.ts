import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { IProduct } from "../interface";
import mongoose from "mongoose";
import Product from "../models/Product";
import User from "../models/User";
import Category from "../models/Category";
import Review from "../models/Review";
import ProductValidator from "../validators/ProductValidator";
import ImageInstance from "../models/ImageInstance";

/**
 * GET - Get twenty most recent products.
 * @param {Request} request - HTTP request doesn't need any parameters.
 * @param {Response} response - The HTTP response object containing products IDs.
 * @throws throws error if any product has been found.
 */
export const getRecentProducts = asyncHandler(
    async (request: Request, response: Response) => {
        let products = await Product.find()
            .select({ id: 1 })
            .limit(12)
            .sort({ createdAt: -1 });
        if (products.length === 0) {
            throw new Error("Nenhum produto encontrado.");
        }
        response.status(200).json(products);
    }
);

/**
 * GET - Get product score with given valid ObjectId.
 * @param {Request} request - The HTTP request containing the product id.
 * @param {Response} response - The HTTP response object containing product score.
 * @throws throws error if any product has been found.
 */
export const getProductAvarageRating = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            throw new Error("Produto Inválido");
        }
        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let average = await Review.aggregate([
            { $group: { _id: "$product", averageScore: { $avg: "$score" } } },
            { $match: { _id: new Types.ObjectId(id) } },
            { $limit: 1 },
        ]);
        response.json(average);
    }
);

/**
 * POST - Search for a product with given valid keyword.
 * @param {Request} request - The HTTP request containing product keyword.
 * @param {Response} response - The HTTP response object containing the IDs of every product found.
 * @throws throws error if receives invalid data.
 */
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
            name: { $regex: new RegExp(keyword, "i") },
        });

        if (possibleProducts.length === 0) {
            response
                .status(404)
                .json({ message: "Nenhum Produto foi encontrado." });
        }

        response.status(200).json(possibleProducts.map((item) => item.id));
    }
);

/**
 * GET - Get product details with given valid ObjectId.
 * @param {Request} request - The HTTP request containing product id.
 * @param {Response} response - The HTTP response object containing the product information.
 * @throws throws error if receives invalid data, if a product has not been found or if a product image has not been found.
 */
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

        let image = await ImageInstance.findOne({ product: product.id });
        if (!image) {
            response.status(400);
            throw new Error("Imagem do produto não encontrada.");
        }

        response.status(200).json({ product, image: image.data });
    }
);

/**
 * GET - Get products from a specific category with given valid ObjectId.
 * @param {Request} request - The HTTP request containing category id.
 * @param {Response} response - The HTTP response object containing the IDs of the products from the category.
 * @throws throws error if receives invalid data or if a category has not been found.
 */
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

        let products = await Product.find({ category: category.id }).select({
            id: 1,
        });
        response.status(200).json(products);
    }
);

/**
 * POST, AUTH REQUIRED - Create a product with given data.
 *
 * @param {Request} request - The HTTP request object containing user, name, price, category, quantity, description and brand.
 * @param {Response} response - The HTTP response object containing a conclusion message and product id.
 * @throws throws error if receives a invalid data or if a user has not been found.
 */
export const createProduct = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user || !request.file) {
            response.status(400);
            throw new Error("Insira os dados restantes.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let requestBody = JSON.parse(request.body.product);
        ProductValidator.validate(response, requestBody);

        let { name, price, category, quantity, description, brand }: IProduct =
            requestBody;

        let convertedQuantity: number = Number(quantity);
        let convertedPrice: number = Number(price);

        let { buffer } = request.file;

        let productID = "";

        let session = await mongoose.startSession();
        await session.withTransaction(async () => {
            let product = await Product.create({
                owner: request.user,
                name,
                category,
                brand,
                description,
                price: convertedPrice,
                quantity: convertedQuantity,
            });
            await ImageInstance.create({
                user: request.user,
                product: product.id,
                data: buffer,
                imageType: "productImage",
                imageName: product.name,
                imageAlt: `Product ${product.name}`,
            });
            productID = product.id;
        });

        response.status(201).json({ message: "Anúncio Criado.", productID });
    }
);

/**
 * PUT, AUTH REQUIRED - Update a product with given data.
 *
 * @param {Request} request - The HTTP request object containing user, name, price, category, quantity, description and brand.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid data or if a user has not been found.
 */
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

        ProductValidator.validate(response, request.body);
        let { name, price, category, quantity, description, brand }: IProduct =
            request.body;

        let convertedQuantity: number = Number(quantity);
        let convertedPrice: number = Number(price);

        await Product.findByIdAndUpdate(request.params.id, {
            name,
            category,
            brand,
            description,
            price: convertedPrice,
            quantity: convertedQuantity,
        });

        response.status(201).json({ message: "Produto Atualizado." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete product with given valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing product id.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid data, if the product owner is different from request user, or if a user has not been found.
 */
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
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

        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await Review.deleteMany({ product: product?.id }, { session });
            await Product.findByIdAndDelete([product?.id], { session });
            await session.commitTransaction();
        });

        session.endSession();
        response.status(201).json({ message: "Produto excluido" });
    }
);
