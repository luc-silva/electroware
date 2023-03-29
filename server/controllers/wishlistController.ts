import { Request, Response } from "express";

const mongose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Wishlist = require("../models/Wishlist");
const Products = require("../models/Product");

//private
const getWishlistItems = asyncHandler(async (request: Request, response:Response) => {
    if (!request.user) {
        response.status(401);
        throw new Error("Credênciais Inválidas.");
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404);
        throw new Error("Usuário não encontrado.");
    }

    let wishlist = await Wishlist.findOne({ user: user.id });

    response.status(200).json(wishlist);
});

module.exports = {
    getWishlistItems,
};
