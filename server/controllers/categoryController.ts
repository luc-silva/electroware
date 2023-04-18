import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import Category from "../models/Category";

interface ICategoryDTO {
    name: string;
}

/**
 * POST - Create a category for products.
 *
 * @param {Request} request - The HTTP request object containing category name.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives a invalid data and if a category has already been created.
 */
export const createCategory = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body) {
            response.status(400);
            throw new Error("Insira dados válidos");
        }

        let { name }: ICategoryDTO = request.body;
        if(typeof name !== "string"){
            response.status(400)
            throw new Error("Insira dados válidos");
        }

        let categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            response.status(400);
            throw new Error("Categoria já existente.");
        }

        await Category.create(request.body);
        response.status(201).json({message: "Categoria Criada."});
    }
);

/**
 * Get - Get every products categories.
 *
 * @param {Request} request - HTTP request doesn't requires any params or data.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error only with unexpected issues.
 */
export const getCategories = asyncHandler(
    async (request: Request, response: Response) => {
        const categories = await Category.find();
        if (categories.length === 0) {
            response.status(404).json({message: "Nenhuma categoria encontrada."});
        }
        response.status(200).json(categories);
    }
);

/**
 * Get - Get a single category with given id. It should be a valid ObejctId
 *
 * @param {Request} request - The HTTP request object containing category id.
 * @param {Response} response - The HTTP response object containing category info.
 * @throws throws error if receives a invalid data and if a category has not been found.
 */
export const getSingleCategory = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let category = await Category.findById(id);
        if (!category) {
            response.status(404);
            throw new Error("Categoria não encontrada.");
        }

        response.status(200).json(category);
    }
);
