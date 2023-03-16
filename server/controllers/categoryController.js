const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const createCategory = asyncHandler(async (request, response) => {
    if (!request.body.name) {
        response.status(400);
        throw new Error("Por favor, insira os dados requeridos");
    }
    let categoryExists = await Category.find({ name: request.body.name });
    if (categoryExists) {
        response.status(400);
        throw new Error("Categoria ja existente");
    }
    
    let category = await Category.create(request.body);
    response.json(category);
});

const getCategories = asyncHandler(async (request, response) => {
    const categories = await Category.find();
    if (categories.length === 0) {
        response.status(404);
        response.json({ message: "nenhuma categoria foi encontrada" });
    }
    response.status(200);
    response.json(categories);
});

module.exports = {
    createCategory,
    getCategories,
};
