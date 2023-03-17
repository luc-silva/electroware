const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const ProductInstance = require("../models/ProductInstance");
const User = require("../models/User");

//private
const createInstance = asyncHandler(async (request, response) => {
    let instance = request.body;
    if (
        (!instance.user, !instance.product, !instance.price, !instance.quantity)
    ) {
        response.status(400);
        throw new Error("Algo deu errado");
    }

    let user = await User.findById(request.user);
    if (!user) {
        response.status(404).json({ message: "Usuario não encontrado" });
    }

    if (instance.user != user.id.toString()) {
        response.status(404);
        throw new Errorr("Não autorizado");
    }

    let product = await Product.findById(instance.product);
    if (!product) {
        response.status(404);
        throw new Error("O produto não esta mais disponível");
    }

    let instaceAlreadyExist = await ProductInstance.findOne({
        product: instance.product,
    });

    if (instaceAlreadyExist) {
        response.status(400);
        throw new Error("Instancia ja existe");
    }

    let createdInstance = await ProductInstance.create({
        ...instance,
        seller: product.owner,
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
    if (instance.user.toString() !== user.id) {
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
    let cartInstances = await ProductInstance.find({ user: user.id });
    response.status(202).json(cartInstances);
});

module.exports = {
    getInstances,
    createInstance,
    removeInstance,
};
