import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Category from "../models/Category";

interface ICategoryDTO {
    name: string;
}

//post
const createCategory = asyncHandler(
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

        let categoryCreated = await Category.create(request.body);
        response.status(201).json(categoryCreated);
    }
);

//get
const getCategories = asyncHandler(
    async (request: Request, response: Response) => {
        const categories = await Category.find();
        if (categories.length === 0) {
            response.status(404);
            throw new Error("Nenhuma categoria encontrada.");
        }
        response.status(200).json(categories);
    }
);

//get, need id
const getSingleCategory = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let { id } = request.params;
        if(typeof id !== "string"){
            response.status(400);
            throw new Error("URL Inválida")
        }

        let category = await Category.findById(id);
        if (!category) {
            response.status(404);
            throw new Error("Categoria não encontrada.");
        }

        response.status(200).json(category);
    }
);

module.exports = {
    createCategory,
    getSingleCategory,
    getCategories,
};
