const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");
const Category = require("../models/Category");
const Wishlist = require("../models/Wishlist");

const getRecentProducts = asyncHandler(async (request, response) => {
    let products = await Product.find().limit(12).sort({ createdAt: -1 });
    if (products.length === 0) {
        throw new Error("Nenhum produto encontrado.");
    }
    response.status(200).json(products);
});

const searchProduct = asyncHandler(async (request, response) => {
    let name = request.params.keyword;
    let possibleProducts = await Product.find({ name: { $regex: name } });

    if (possibleProducts.length === 0) {
        response.status(404);
        throw new Error("Nenhum produto encontrado.");
    }

    response.status(200).json(possibleProducts);
});

const getProductDetails = asyncHandler(async (request, response) => {
    let { id } = request.params;
    let product = await Product.findById(id);
    if (!product) {
        response.status(404);
        throw new Error("Produto não encontrado.");
    }

    response.status(200).json(product);
});

//private
const createProduct = asyncHandler(async (request, response) => {
    let { name, price, category, quantity, description, brand } = request.body;
    if (!name || !price || !quantity || !category || !brand) {
        response.status(400);
        throw new Error("Insira dados válidos.");
    }

    let createdProduct = await Product.create({
        owner: request.user,
        name,
        category,
        brand,
        description,
        price,
        quantity,
    });

    response.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (request, response) => {
    let product = await Product.findById(request.params.id);
    if (!product) {
        response.status(404);
        throw new Error("Produto não encontrado.");
    }
    if (product.owner !== request.user) {
        response.status(401);
        throw new Error("Não autorizado.");
    }
    let updatedProduct = await Product.findByIdAndUpdate(
        request.params.id,
        request.params.body
    );

    response.status(201).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (request, response) => {
    let userId = request.user.id.toString();
    let product = await Product.findById(request.params.id);

    if (!product) {
        response.status(404);
        throw new Error("Produto não encontrado.");
    }

    if (userId !== product.owner.toString()) {
        response.status(401);
        throw new Error("Não autorizado.");
    }

    let deletedProduct = await Product.findByIdAndDelete(request.params.id);
    response.status(200).json(deletedProduct);
});

const getProductFromCategory = asyncHandler(async (request, response) => {
    let category = await Category.findById(request.params.id);
    if (!category) {
        response.status(404);
        throw new Error("Categoria não encontrada");
    }

    let products = await Product.find({ category: category.id });
    response.status(200).json(products);
});

const addProductToWishlist = asyncHandler(async (request, response) => {
    let { product } = request.body;
    if (!request.user) {
        response.status(401);
        throw new Error("Credênciais Inválidas.");
    }
    let user = await User.findById(request.user);

    let wishlist = await Wishlist.findOne({ user: user.id });
    if (!wishlist) {
        response.status(404);
        throw new Error("Lista de desejos não encontrada.");
    }
    let addedItem = Wishlist.findOneAndUpdate(
        { user: user.id },
        { $push: { products: product } }
    );
});

module.exports = {
    getRecentProducts,
    searchProduct,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductFromCategory,
};
