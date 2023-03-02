const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getRecentProducts = asyncHandler(async (request, response) => {
    let products = await Product.find().limit(20).sort({ createdAt: 1 });
    response.status(202);
    if (products.length === 0) {
        response.json({ message: "Sem produtos para exibir" });
    }
    response.json(products);
});

const searchProduct = asyncHandler(async (request, response) => {
    let { name } = request.body;
    let possibleProducts = await Product.find({ name: name });

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
    let { id } = request.body;
    let product = await Product.findById(id);
    if (!product) {
        response.status(404);
        response.json({ message: "Product not found" });
    }

    response.json(product);
});

//private
const createProduct = asyncHandler(async (request, response) => {
    let { _id } = request.user;
    let { name, price, category, quantity, brand, description } = request.body;
    if ((!name, !price, !category, !quantity)) {
        response.status(400);
        response.json({ message: "Por favor, insira os dados necessariso" });
    }

    let createdProduct = await Product.create({
        owner: _id,
        category,
        name,
        price,
        quantity,
        brand,
        buyers,
        description,
    });

    response.status(202)
    response.json(createProduct)
});
const updateProduct = asyncHandler(async (request, response) => {});
const deleteProduct = asyncHandler(async (request, response) => {});

module.exports = {
    getRecentProducts,
    searchProduct,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct
};
