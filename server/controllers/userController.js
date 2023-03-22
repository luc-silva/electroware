const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Product = require("../models/Product");
const Review = require("../models/Review");
const ProductInstance = require("../models/ProductInstance");
const Transaction = require("../models/Transaction");

function generateToken(id) {
    return jwt.sign({ id }, "123", {
        expiresIn: "7d",
    });
}
const loginUser = asyncHandler(async (request, response) => {
    let { email, password } = request.body;
    let user = await User.findOne({ email });

    if (!user) {
        response.status(404);
        throw new Error("Usuario não encontrado");
    }
    if (user && !(await bcrypt.compare(password, user.password))) {
        response.status(401);
        throw new Error("Senha invalida");
    }

    //gen token to use in a protected route
    let token = generateToken(user._id);

    response.json({
        email,
        id: user._id,
        username: user.username,
        funds: user.funds,
        token: token,
    });
});

const registerUser = asyncHandler(async (request, response) => {
    //validates inputs
    let { email, password, name, location } = request.body;
    if (
        !email ||
        !password ||
        !name.first ||
        !location.country ||
        !location.state
    ) {
        response.status(401);
        throw new Error("Por favor, insira credenciais validos");
    }

    //check if an email has already been used
    let userExist = await User.findOne({ email });
    if (userExist) {
        response.status(401);
        throw new Error(`Uma conta já foi criada com esse email`);
    }

    //hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = {
        ...request.body,
        password: hashedPassword,
    };

    let user = await User.create(newUser);

    response.status(202).json({ user });
});

const getProfileInfo = asyncHandler(async (request, response) => {
    let user = await User.findById(request.params.id).select({
        name: 1,
        id: 1,
        email: 1,
        createdAt: 1,
        location: 1,
    });
    if (!user) {
        response.status(404);
        throw new Error("Usuario não encontrado");
    }
    response.json(user);
});

const getUserProducts = asyncHandler(async (request, response) => {
    let { id } = request.params;
    let user = await User.findById(id);

    if (!user) {
        response.status(404);
        throw new Error("Usuario nao encontrado");
    }

    let userProducts = await Product.find({ owner: user._id });
    response.status(202).json(userProducts);
});

//private
const getUserPrivateInfo = asyncHandler(async (request, response) => {
    let user = await User.findById(request.user).select({
        id: 1,
        funds: 1,
        email: 1,
    });
    if (!user) {
        response.status(404);
        throw new Error("Usuário não encontrado ");
    }
    if (user.id !== request.params.id) {
        response.status(402);
        throw new Error("Não autorizado");
    }

    response
        .status(202)
        .json({ id: user.id, funds: user.funds, email: user.email });
});
const addFunds = asyncHandler(async (request, response) => {
    let amount = request.body.amount;
    if (!amount) {
        response.status(400);
        throw new Error("Insira os dados necessarios");
    }

    let userExist = await User.findById(request.user);
    if (!userExist) {
        response.status(404);
        throw new Error("Usuário não encontrado");
    }

    let user = await User.findByIdAndUpdate(request.user, {
        $inc: { funds: +amount },
    });
    response.status(202).json(user);
});

const deleteAccount = asyncHandler(async (request, response) => {
    if (request.user !== request.params.id) {
        response.status(401);
        throw new Error("Não autorizado");
    }
    const user = await User.findById(request.params.id);
    if (!user) {
        response.status(404);
        throw new Error("Usuário não existe");
    }

    let session = mongoose.startSession();
    await session.withTransaction(async () => {
        let deletedProducts = await Product.deleteMany([{ owner: user._id }], {
            session,
        });
        let deletedOwnReviews = await Review.deleteMany(
            [{ author: user._id }],
            {
                session,
            }
        );
        let deletedReceivedReviews = await Review.deleteMany(
            [{ productOwner: user._id }],
            { session }
        );
        // let deletedOwnWishlistItems = await WishlistItem.deleteMany(
        //     [{ user: user._id }],
        //     { session }
        // );

        let deletedOwnShoppingCart = await ProductInstance.deleteMany(
            [{ user: user._id }],
            { session }
        );
        let deletedRelatedCartItems = await ProductInstance.deleteMany(
            [{ seller: user._id }],
            { session }
        );

        let deletedUser = await User.findByIdAndDelete(user._id)
        await session.commitTransaction();
    });
    session.endSession();
    response.status(204).json({message: "Deletado"})
});
module.exports = {
    registerUser,
    loginUser,
    getProfileInfo,
    getUserProducts,
    addFunds,
    getUserPrivateInfo,
    deleteAccount
};
