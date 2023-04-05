import asyncHandler from "express-async-handler";

import Review from "../models/Review";
import User from "../models/User";
import Product from "../models/Product";
import { IReview, IUser } from "../interface";
import { Request, Response } from "express";
import ReviewValidator from "../validators/ReviewValidator";

////public
//get, need params
export const getProductReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        let product = await Product.findById(id);
        if (!product) {
            response.status(404);
            throw new Error("Produto não encontrado.");
        }

        let reviews = await Review.find({ product: product.id }).sort({
            createdAt: -1,
        });
        if (!reviews) {
            response.status(404);
            throw new Error("Sem reviews disponíveis.");
        }

        response.status(200).json(reviews);
    }
);

//get, need params
export const getEveryUserReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let reviews = await Review.find({ author: user.id });
        if (reviews.length === 0) {
            response.status(404);
            throw new Error("Sem análises disponíveis.");
        }

        response.status(200).json(reviews);
    }
);

//get, need params
export const getEveryUserProductsReviews = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;

        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }
        let reviews = await Review.find({ productOwner: user.id }).select({
            score: 1,
        });
        if (reviews.length === 0) {
            response.status(404);
            throw new Error("Sem análises disponíveis.");
        }

        response.status(200).json(reviews);
    }
);

////private

//post
export const submitReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        ReviewValidator.validate(response, request.body)
        let { product, text, score, productOwner } = request.body;

        let reviewer = (await User.findById(request.user).select({
            password: -1,
        })) as IUser;
        if (!reviewer) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let review = await Review.create({
            author: reviewer.id,
            product,
            text,
            score,
            productOwner,
        });
        response.status(201).json(review);
    }
);

//delete
export const deleteReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let { id } = request.params;
        let review = await Review.findById(request.params.id);
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

        let deletedReview = await Review.findByIdAndDelete(review.id);
        response.status(200).json(deletedReview);
    }
);

//patch, need params
export const updateReview = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        ReviewValidator.validateUpdate(response, request.body)
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

        let updatedReview = await Review.findByIdAndUpdate(review.id, {
            text: text,
            score: score,
        });
        response.status(200).json(updatedReview);
    }
);
