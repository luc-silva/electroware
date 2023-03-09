const Review = require("../models/Review");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

//private
const submitReview = asyncHandler(async (request, response) => {
    let reviewer = request.user;
    let { product, text, score, productOwner } = request.body;
    if (!reviewer || !(product, score, productOwner)) {
        response.status(402).json({ message: "Insira credenciais validos" });
    }
    let review = await Review.create({
        author: reviewer,
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
        response.status(404).json({ message: "Review nao encontrada" });
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404).json({ message: "Usuario nao encontrado" });
    }
    if (user.id !== review.author.toString()) {
        response.status(404).json({ message: "Voce nao tem autorizacao" });
    }

    let deletedReview = await Review.findByIdAndDelete(review.id);
    response.status(202).json(deletedReview);
});

const updateReview = asyncHandler(async (request, response) => {
    let review = await Review.findById(request.params.id);
    if (!review) {
        response.status(404).json({ message: "Review nao encontrada" });
    }

    let user = await User.findById(request.user);
    if (user.id !== review.author.toString()) {
        response.status(402).json({ message: "Nao autorizado" });
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
        response.status(404).json({ message: "Produto nao encontrado" });
    }

    let reviews = await Review.find({ product: product.id });
    if (!reviews) {
        response.status(404).json({ message: "Sem reviews para esse produto" });
    }

    response.status(202).json(reviews);
});

const getEveryUserReviews = asyncHandler(async (request, response) => {
    let user = await User.findById(request.params.id)
    if(!user){
        response.status(404).json({message: "Usuario nao encontrado"})
    }

    let reviews = await Review.find({author: user.id})
    if(reviews.length === 0){
        response.status(404).json({message: "esse usuario ainda nao avaliou algum produto"})
    }

    response.status(202).json(reviews)
})

module.exports = {
    deleteReview,
    updateReview,
    submitReview,
    getProductReviews,
    getEveryUserReviews
};
