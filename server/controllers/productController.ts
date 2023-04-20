import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { Types } from "mongoose";

import { IProduct } from "../interface";
import mongoose from "mongoose";
import ProductValidator from "../validators/ProductValidator";
import ImageInstance from "../models/ImageInstance";
import ProductRepository from "../repositories/ProductRepository";
import ImageRepository from "../repositories/ImageRepository";
import CategoryRepository from "../repositories/CategoryRepository";
import UserRepository from "../repositories/UserRepository";

/**
 * GET - Get twenty most recent products.
 * @param {Request} request - HTTP request doesn't need any parameters.
 * @param {Response} response - The HTTP response object containing products IDs.
 * @throws throws error if any product has been found.
 */
export const getRecentProducts = asyncHandler(
    async (request: Request, response: Response) => {
        let products = await ProductRepository.getRecentProducts();
        if (products.length === 0) {
            response.status(400);
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

        let average = await ProductRepository.getAverageScoreFromProduct(id);
        response.status(200).json(average);
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

        let possibleProducts = await ProductRepository.searchProductWithKeyword(
            keyword
        );

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

        let product = await ProductRepository.getProductDetails(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        let image = await ImageRepository.getProductImage(product.id);
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
        let category = await CategoryRepository.getSingleCategory(id);
        if (!category) {
            response.status(404);
            throw new Error("Categoria não encontrada");
        }

        let products = await CategoryRepository.getCategoryProducts(
            category.id
        );
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

        let user = await UserRepository.getUser(request.user.id);
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
        let productData = {
            owner: request.user,
            name,
            category,
            brand,
            description,
            price: convertedPrice,
            quantity: convertedQuantity,
        };
        let imageData = {
            user: request.user.id,
            data: buffer,
            imageType: "productImage",
        };

        await ProductRepository.createProduct(productData, imageData);

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

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let productDataBody = request.body;
        ProductValidator.validate(response, productDataBody);

        let { price, quantity }: IProduct = productDataBody;

        let updatedProductData = {
            ...productDataBody,
            price: Number(price),
            quantity: Number(quantity),
        };

        let { id } = request.params;
        await ProductRepository.updateProduct(id, updatedProductData);

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

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let { id } = request.params;

        let product = await ProductRepository.getProductDetails(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }
        if (product.owner.toString() !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await ProductRepository.deleteProduct(id);
        response.status(201).json({ message: "Produto excluido" });
    }
);
