const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const createCategory = asyncHandler(async (request, response) => {
    if (!request.body.name) {
        response.status(400);
        throw new Error("Dados Inválidos.");
    }
    let categoryExists = await Category.findOne({ name: request.body.name });
    if (categoryExists) {
        response.status(400);
        throw new Error("Categoria já existente.");
    }

    let category = await Category.create(request.body);
    response.status(201).json(category);
});

const getCategories = asyncHandler(async (request, response) => {
    const categories = await Category.find();
    if (categories.length === 0) {
        response.status(404);
        throw new Error("Nenhuma categoria encontrada.");
    }
    response.status(200).json(categories);
});

const getSingleCategory = asyncHandler(async (request, response) => {
    const category = await Category.findById(request.params.id);
    if (!category) {
        response.status(404);
        throw new Error("Categoria nao encontrada.");
    }

    response.status(200).json(category);
});

module.exports = {
    createCategory,
    getSingleCategory,
    getCategories,
};
