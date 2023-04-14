import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { IProductInstance } from "../interface";
import ImageInstance from "../models/ImageInstance";
import Product from "../models/Product";
import ProductInstance from "../models/ProductInstance";
import User from "../models/User";
import ProductInstanceValidator from "../validators/ProductInstanceValidator";

////private

//post
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

        let createdInstance = await ProductInstance.create({
            user,
            product,
            price,
            quantity,
            seller: instanceProduct.owner,
            productImage: productImage.id,
        });

        response.status(201).json(createdInstance);
    }
);

//delete, need params
export const removeInstance = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let { id } = request.params;
        if (typeof id !== "string") {
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

        if (instance.user !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        let deletedInstance = await ProductInstance.findByIdAndDelete(
            instance.id
        );
        response.status(200).json(deletedInstance);
    }
);

//get
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
