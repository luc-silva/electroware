const asyncHandler = require("express-async-handler");
const ProductInstance = require("../models/ProductInstance");
const productInstance = require("../models/ProductInstance");
const ShoppingCart = require("../models/ShoppingCart");
const User = require("../models/User");

//private
const createInstance = asyncHandler(async (request, response) => {
    let instance = request.body;
    if (
        (!instance.owner,
        !instance.product,
        !instance.price,
        !instance.quantity)
    ) {
        response.status(400);
        throw new Error("Algo deu errado");
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404).json({ message: "Usuario não encontrado" });
    }

    let shoppingCart = await ShoppingCart.findOne({ cartOwner: user.id });
    if (!shoppingCart) {
        response
            .status(404)
            .json({ message: "Usuario não possui carrinho de compras" });
    }

    if (shoppingCart.cartOwner.toString() !== user.id) {
        response.status(404);
        throw new Error("Não autorizado");
    }

    let createdInstance = await ProductInstance.create({
        ...instance,
        shoppingCart: shoppingCart.id,
    });

    response.status(202).json(createdInstance);
});

const removeInstance = asyncHandler(async (request, response) => {
    let instance = await ProductInstance.findById(request.params.id);
    if (!instance) {
        response.status(404);
        throw new Error("Produto não encontrado ou solicitado");
    }
    let user = await User.findById(request.user);
    if (instance.owner.toString() !== user.id) {
        response.status(401);
        throw new Error("Não autorizado");
    }

    let deletedInstance = await ProductInstance.findByIdAndDelete(instance.id);
    response.status(202).json(deletedInstance);
});

const getInstances = asyncHandler(async (request, response) => {
    let user = await User.findById(request.user);
    if (!user) {
        response.status(202);
        throw new Error("Usuario não encontrado");
    }
    let cartInstances = await ProductInstance.find({ owner: user.id });
    response.status(202).json(cartInstances);
});

module.exports = {
    getInstances,
    createInstance,
    removeInstance,
};
