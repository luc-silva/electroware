import asyncHandler from "express-async-handler";

import Review from "../models/Review";
import User from "../models/User";
import Product from "../models/Product";
import { IReview, IUser } from "../interface";
import { Request, Response } from "express";
import ReviewValidator from "../validators/ReviewValidator";
import { Types } from "mongoose";

/**
 * GET - Get a review with given review id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the review ID.
 * @param {Response} response - The HTTP response object containing the review info.
 * @throws throws error if review id isn't valid or if the review has not been found.
 */
export const getSingleReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let review = await Review.findById(id).populate("author", { name: 1 });
        if (!review) {
            response.status(404);
            throw new Error("Avaliação não encontrada.");
        }

        response.status(200).json(review);
    }
);

/**
 * GET - Get product reviews with given product id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the product ID.
 * @param {Response} response - The HTTP response object containing the review ids or a message.
 * @throws throws error if product id isn't valid or if the product has not been found.
 */
export const getProductReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let product = await Product.findById(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        let reviews = await Review.find({ product: product.id })
            .select({ id: 1 })
            .sort({
                createdAt: -1,
            });
        if (!reviews) {
            response
                .status(404)
                .json({ message: "Esse produto ainda não possui avaliações." });
        }

        response.status(200).json(reviews);
    }
);

/**
 * GET - Get every user reviews made with given user id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing the review ids or a message.
 * @throws throws error if user id isn't valid or if the user has not been found.
 */
export const getEveryUserReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let reviews = await Review.find({ author: user.id }).select({ id: 1 });
        if (reviews.length === 0) {
            response.status(200).json({ message: "Sem análises disponíveis." });
        }

        response.status(200).json(reviews);
    }
);

/**
 * GET - Get reviews from a product where the user is the owner with given user id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing the review ids or a message.
 * @throws throws error if user id isn't valid or if the user has not been found.
 */
export const getEveryUserProductsReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }
        let reviews = await Review.find({ productOwner: user.id }).select({
            score: 1,
        });
        if (reviews.length === 0) {
            response.status(404).json({ message: "Sem análises disponíveis." });
        }

        response.status(200).json(reviews);
    }
);

/**
 * POST, AUTH REQUIRED - Create a review instance with given data.
 *
 * @param {Request} request - The HTTP request object containing the user ID, text, score, productOwner id and product id.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if body isn't valid or if review author has not been found.
 */
export const submitReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        ReviewValidator.validate(response, request.body);
        let { product, text, score, productOwner } = request.body;

        let reviewer = await User.findById(request.user).select({
            password: -1,
        });
        if (!reviewer) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        await Review.create({
            author: reviewer.id,
            product,
            text,
            score,
            productOwner,
        });
        response.status(201).json({ message: "Análise Publicada." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a review instance with given review id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user and review ID.
 * @param {Response} response - The HTTP response object containing s conclusion message.
 * @throws throws error if review author, review author is different from request user or if the review has not been found.
 */
export const deleteReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let review = await Review.findById(id);
        if (!review) {
            response.status(404);
            throw new Error("Análise não encontrada.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (user.id !== review.author.toString()) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await Review.findByIdAndDelete(review.id);
        response.status(200).json({ message: "Análise Excluida." });
    }
);

/**
 * PATCH, AUTH REQUIRED - Update a review instance with given review id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user and review ID, score and text.
 * @param {Response} response - The HTTP response object containing s conclusion message.
 * @throws throws error if review author, review author is different from request user or if the review has not been found.
 */
export const updateReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        ReviewValidator.validateUpdate(response, request.body);
        let { text, score } = request.body;

        let { id } = request.params;
        let review = await Review.findById(id);
        if (!review) {
            response.status(404);
            throw new Error("Análise não encontrada.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        if (user.id !== review.author.toString()) {
            response.status(401);
            throw new Error("Não autorizado.");
        }

        await Review.findByIdAndUpdate(review.id, {
            text: text,
            score: score,
        });
        response.status(200).json({ message: "Análise Atualizada." });
    }
);
