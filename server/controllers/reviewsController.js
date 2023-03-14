const Review = require("../models/Review");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

//private
const submitReview = asyncHandler(async (request, response) => {
    let reviewer = await User.findById(request.user);
    let { product, text, score, productOwner } = request.body;
    if (!reviewer || !(product, score, productOwner)) {
        response.status(401);
        throw new Error("Insira credenciais validos");
    }

    let review = await Review.create({
        author: reviewer.id,
        authorUsername: reviewer.username,
        product,
        text,
        score,
        productOwner,
    });
    response.status(202).json(review);
});

const deleteReview = asyncHandler(async (request, response) => {
    let review = await Review.findById(request.params.id);
    if (!review) {
        response.status(404);
        throw new Error("Review não encontrada");
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404);
        throw new Error("Usuario não encontrado");
    }
    if (user.id !== review.author.toString()) {
        response.status(401);
        throw new Error("Não autorizado");
    }

    let deletedReview = await Review.findByIdAndDelete(review.id);
    response.status(202).json(deletedReview);
});

const updateReview = asyncHandler(async (request, response) => {
    let review = await Review.findById(request.params.id);
    if (!review) {
        response.status(404);
        throw new Error("Review não encontrada");
    }

    let user = await User.findById(request.user);
    if (user.id !== review.author.toString()) {
        response.status(401);
        throw new Error("Não autorizado");
    }

    let { text, score } = request.body;
    let updatedReview = await Review.findByIdAndUpdate(review.id, {
        text: text,
        score: score,
    });
    response.status(202).json(updatedReview);
});

//public
const getProductReviews = asyncHandler(async (request, response) => {
    //move this one to product controller later
    let product = await Product.findById(request.params.id);
    if (!product) {
        response.status(404);
        throw new Error("Produto não encontrado");
    }

    let reviews = await Review.find({ product: product.id }).sort({
        createdAt: -1,
    });
    if (!reviews) {
        response
            .status(404)
            .json({ message: "Sem reviews encontradas para esse produto" });
    }

    response.status(202).json(reviews);
});

const getEveryUserReviews = asyncHandler(async (request, response) => {
    let user = await User.findById(request.params.id);
    if (!user) {
        response.status(404);
        throw new Error("Usuario não encontrado");
    }

    let reviews = await Review.find({ author: user.id });
    if (reviews.length === 0) {
        response
            .status(404)
            .json({ message: "Sem reviews por parte desse usuario" });
    }

    response.status(202).json(reviews);
});

module.exports = {
    deleteReview,
    updateReview,
    submitReview,
    getProductReviews,
    getEveryUserReviews,
};
