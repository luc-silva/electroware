const asyncHandler = require("express-async-handler");
const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");
const User = require("../models/User");

//private
const getShoppingCartDetails = asyncHandler(async (request, response) => {
    let user = await User.findById(request.user);
    if (!user) {
        response.status(404);
        throw new Error("Usuario não encontrado");
    }

    let shoppingCart = await ShoppingCart.findOne({ cartOwner: user.id });
    response.status(202).json(shoppingCart);
});

module.exports = {
    getShoppingCartDetails,
};
