import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { IProductInstance } from "../interface";
import CartItemRepository from "../repositories/CartItemRepository";
import ImageRepository from "../repositories/ImageRepository";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";
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

        let cartItemData = request.body;

        ProductInstanceValidator.validate(response, cartItemData);
        let { product }: IProductInstance = cartItemData;

        let instanceOwner = await UserRepository.getUser(request.user.id);
        if (!instanceOwner) {
            response.status(404);
            throw new Error("Usuario não encontrado.");
        }

        let instanceProduct = await ProductRepository.getProductDetails(
            product
        );
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

        let productImage = await ImageRepository.getProductImage(
            instanceProduct.id
        );
        if (!productImage) {
            response.status(400);
            throw new Error("O Produto não possui imagem.");
        }

        let instanceAlreadyExist =
            await CartItemRepository.getCartItemByIdAndUser(
                instanceProduct.id,
                instanceOwner.id
            );
        if (instanceAlreadyExist) {
            response.status(400);
            throw new Error("Item já adicionado ao carrinho de compras.");
        }

        await CartItemRepository.createCartItem({
            ...cartItemData,
            seller: instanceProduct.owner,
            productImage: productImage.id,
        });

        response
            .status(201)
            .json({ message: "Adicionado ao Carrinhos de Compras." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a shoppingcart instance with a given valid ObjectId.
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
        let cartItem = await CartItemRepository.getCartItem(id);
        if (!cartItem) {
            response.status(404);
            throw new Error("Item não encontrado.");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (cartItem.user.toString() !== user.id) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await CartItemRepository.deleteCartItem(cartItem.id);
        response.status(200).json({ message: "Produto(s) Removido(s)." });
    }
);

/**
 * GET, AUTH REQUIRED - Get shoppingcart instances from a user with a given valid user ObjectId.
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

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(402);
            throw new Error("Usuario não encontrado.");
        }
        let cartInstances = await CartItemRepository.getCartItemsByUser(
            user.id
        );
        response.status(200).json(cartInstances);
    }
);

/**
 * GET, AUTH REQUIRED - Get a single shopping instance with a given valid instance ObjectId
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

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        let { id } = request.params;
        let cartItem = await CartItemRepository.getCartItemAndPopulate(id);
        if (!cartItem) {
            response.status(400);
            throw new Error("Item Não Encontrado.");
        }

        response.status(200).json(cartItem);
    }
);
