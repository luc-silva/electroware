const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Product = require("../models/Product");

function generateToken(id) {
    return jwt.sign({ id }, "123", {
        expiresIn: "7d",
    });
}
const loginUser = asyncHandler(async (request, response) => {
    let { email, password } = request.body;
    let user = await User.findOne({ email });

    if (!user) {
        response.status(400);
        throw new Error("Usuario nao encontrado");
    }
    if (user && !(await bcrypt.compare(password, user.password))) {
        response.status(400);
        throw new Error("senha invalida");
    }

    //gen token to use in a protected route
    let token = generateToken(user._id);

    response.json({
        id: user._id,
        username: user.username,
        saldo: user.credit,
        token: token,
    });
});

const registerUser = asyncHandler(async (request, response) => {
    //validates inputs
    let { email, password, name } = request.body;
    if (!email || !password || !name.first) {
        response.status(400);
        throw new Error("Por favor, insira credenciais validos");
    }

    //check if an email has already been used
    let userExist = await User.findOne({ email });
    if (userExist) {
        response.status(400);
        throw new Error(`Uma conta ja foi criada com esse email: ${userExist}`);
    }

    //hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = {
        ...request.body,
        password: hashedPassword,
    };

    let user = await User.create(newUser);
    response.json(user);
    response.redirect("https://localhost:3000/");
});

const getProfile = asyncHandler(async (request, response) => {
    let user = await User.findById(request.params.id).select({ password: 0 });
    if (!user) {
        response.status(404).json({ message: "User not found" });
    }
    response.json(user);
});

const getUserProducts = asyncHandler(async (request, response) => {
    let { id } = request.params;
    let user = await User.findById(id);

    if (!user) {
        response
            .status(404)
            .json({ message: "Usuario nao encontrado", id: id });
    }

    let userProducts = await Product.find({ owner: user._id });
    response.status(202).json(userProducts);
});

//private
const getMyOrders = (request, response) => {};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getUserProducts,
};
