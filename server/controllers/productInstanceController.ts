import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose, { Types } from "mongoose";
import { IProductInstance } from "../interface";
import ImageInstance from "../models/ImageInstance";
import Product from "../models/Product";
import ProductInstance from "../models/ProductInstance";
import User from "../models/User";
import ProductInstanceValidator from "../validators/ProductInstanceValidator";

/**
 * POST, AUTH REQUIRED - Create a shoppingcart instance for checkout.
 *
 * @param {Request} request - The HTTP request object containing user, product, price and quantity.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid data, if user tries to buy its own product, if a product is not available and if user has not been found.
 */
export const createInstance = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        ProductInstanceValidator.validate(response, request.body);
        let { user, product, price, quantity }: IProductInstance = request.body;

        let instanceOwner = await User.findById(request.user);
        if (!instanceOwner) {
            response.status(404);
            throw new Error("Usuario não encontrado.");
        }

        let instanceProduct = await Product.findById(product);
        if (!instanceProduct) {
            response.status(400);
            throw new Error("Produto indisponível.");
        }
        if (instanceProduct.quantity === 0) {
            response.status(400);
            throw new Error("Produto indisponível.");
        }
        if (instanceProduct.owner === instanceOwner.id) {
            response.status(400);
            throw new Error("Você não pode comprar o seu próprio produto.");
        }

        let productImage = await ImageInstance.findOne({
            product: instanceProduct.id,
        });
        if (!productImage) {
            response.status(400);
            throw new Error("O Produto não possui imagem.");
        }

        let instanceAlreadyExist = await ProductInstance.findOne({
            product: instanceProduct.id,
            user: instanceOwner.id,
        });
        if (instanceAlreadyExist) {
            response.status(400);
            throw new Error("Instância já existente.");
        }

        await ProductInstance.create({
            user,
            product,
            price,
            quantity,
            seller: instanceProduct.owner,
            productImage: productImage.id,
        });

        response
            .status(201)
            .json({ message: "Adicionado ao Carrinhos de Compras." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a shoppingcart instance with a given id. It should be a valid ObjectId
 *
 * @param {Request} request - The HTTP request object containing user and instance id.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid id, if the instance owner id is different from request user id, and if user or instance has not been found.
 */
export const removeInstance = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let instance = await ProductInstance.findById(id);
        if (!instance) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (instance.user.toString() !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await ProductInstance.findByIdAndDelete(instance.id);
        response.status(200).json({ message: "Produto(s) Removido(s)." });
    }
);

/**
 * GET, AUTH REQUIRED - Get shoppingcart instances from a user with a given user id. It should be a valid ObjectId
 *
 * @param {Request} request - The HTTP request object containing user.
 * @param {Response} response - The HTTP response object containing every instance ids.
 * @throws throws error if receives a invalid data and if user has not been found.
 */
export const getInstances = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(402);
            throw new Error("Usuario não encontrado.");
        }
        let cartInstances = await ProductInstance.find({ user: user.id });
        response.status(200).json(cartInstances);
    }
);

/**
 * GET, AUTH REQUIRED - Get a single shopping instance with a given instance id. It should be a valid ObjectId
 *
 * @param {Request} request - The HTTP request object containing user and instance id.
 * @param {Response} response - The HTTP response object containing every instance and populated product details.
 * @throws throws error if receives a invalid data and if user has not been found.
 */
export const getSingleInstance = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let user = await User.findById(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        let { id } = request.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let instance = await ProductInstance.findById(id)
            .select({ product: 1, price: 1, quantity: 1 })
            .populate("seller", { name: 1 })
            .populate("product", { id: 1, category: 1, name: 1, owner: 1 })
            .populate("productImage", { data: 1 });
        if (!instance) {
            response.status(400);
            throw new Error("Item Não Encontrado.");
        }

        response.status(200).json(instance);
    }
);
