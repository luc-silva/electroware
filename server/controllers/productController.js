const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");

const getRecentProducts = asyncHandler(async (request, response) => {
    let products = await Product.find().limit(12).sort({ createdAt: -1 });
    response.status(202);
    if (products.length === 0) {
        response.json({ message: "Sem produtos para exibir" });
    }
    response.json(products);
});

const searchProduct = asyncHandler(async (request, response) => {
    let { name } = request.body;
    let possibleProducts = await Product.find({ name: { $regex: name } });

    if (possibleProducts.length === 0) {
        //it may be a truly value (array)
        response.status(404);
        response.json({
            message: "Nao ha nenhum produto com palavra chaves similares",
        });
    }

    response.json(possibleProducts);
});

const getProductDetails = asyncHandler(async (request, response) => {
    let { id } = request.params;
    let product = await Product.findById(id);
    if (!product) {
        response.status(404);
        response.json({ message: "Product not found" });
    }

    response.status(202).json(product);
});

//private
const createProduct = asyncHandler(async (request, response) => {
    let { name, price, category, quantity, brand, description, buyers } =
        request.body;
    if ((!name, !price, !category, !quantity)) {
        response.status(400);
        response.json({ message: "Por favor, insira os dados necessarios" });
    }

    let createdProduct = await Product.create({
        owner: request.user,
        category,
        name,
        description,
        price,
        quantity,
    });

    response.status(202);
    response.json(createdProduct);
});

const updateProduct = asyncHandler(async (request, response) => {
    let product = await Product.findById(request.params.id);
    if (!product) {
        throw new Error("Produto nao encontrado");
    }
    if (product.owner !== request.user) {
        throw new Error("Nao autorizado");
    }
    let updatedProduct = await Product.findByIdAndUpdate(
        request.params.id,
        request.params.body
    );

    response.status(202).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (request, response) => {
    let userId = request.user.id.toString()
    let product = await Product.findById(request.params.id);

    if (!product) {
        response.status(404);
        throw new Error("Produto nao encontrado");
    }

    if (userId !== product.owner.toString()) {
        response.status(401);
        throw new Error("Nao autorizado");
    }

    let deletedProduct = await Product.findByIdAndDelete(request.params.id);
    response.status(402).json(deletedProduct);
});

module.exports = {
    getRecentProducts,
    searchProduct,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
};
