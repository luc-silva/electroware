import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import CategoryRepository from "../repositories/CategoryRepository";

interface ICategoryDTO {
    name: string;
}

/**
 * POST - Create a category for products with given name.
 *
 * @param {Request} request - The HTTP request object containing category name.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if receives an invalid name or if a category has already been created.
 */
export const createCategory = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body) {
            response.status(400);
            throw new Error("Insira dados válidos");
        }

        let { name } = request.body;
        if (typeof name !== "string") {
            response.status(400);
            throw new Error("Insira dados válidos");
        }

        let categoryExists = await CategoryRepository.getCategoryByName(name);
        if (categoryExists) {
            response.status(400);
            throw new Error("Categoria já existente.");
        }

        await CategoryRepository.createCategory(request.body);
        response.status(201).json({ message: "Categoria Criada." });
    }
);

/**
 * Get - Get every products categories names.
 *
 * @param {Request} request - HTTP request doesn't requires any params or data.
 * @param {Response} response - The HTTP response object containing categories IDs or a conclusion message.
 * @throws throws error only with unexpected issues.
 */
export const getCategories = asyncHandler(
    async (request: Request, response: Response) => {
        const categories = await CategoryRepository.getCategoryNames();
        if (categories.length === 0) {
            response
                .status(404)
                .json({ message: "Nenhuma categoria encontrada." });
        }
        response.status(200).json(categories);
    }
);

/**
 * Get - Get details of a category with given valid ObjectId
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
        let category = await CategoryRepository.getSingleCategory(id);
        if (!category) {
            response.status(404);
            throw new Error("Categoria não encontrada.");
        }

        response.status(200).json(category);
    }
);
