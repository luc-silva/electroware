import mongoose, { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import User from "../models/User";
import Product from "../models/Product";
import Review from "../models/Review";
import ProductInstance from "../models/ProductInstance";
import { IUser } from "../interface";
import { Request, Response } from "express";
import WishlistItem from "../models/WishlistItem";
import UserValidator from "../validators/UserValidator";
import ImageInstance from "../models/ImageInstance";

interface IUserDTO extends IUser {
    password: string;
}

function generateToken(id: string) {
    return sign({ id }, "123", {
        expiresIn: "7d",
    });
}

/**
 * POST - Log in user if given email and password.
 *
 * @param {Request} request - The HTTP request object containing the email and password.
 * @param {Response} response - The HTTP response object containing user info.
 * @throws throws error if there's no user with given email or wrong credentials
 */
export const loginUser = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let { email, password } = request.body;
        let user = (await User.findOne({ email })) as IUserDTO;
        if (!user) {
            response.status(404);
            throw new Error("Usuario não encontrado");
        }

        if (user && !(await bcrypt.compare(password, user.password))) {
            response.status(401);
            throw new Error("Senha invalida");
        }

        //generate token to use in a protected route
        let token = generateToken(user.id);

        response.json({
            email,
            id: user.id,
            username:
                (user.name.last && `${user.name.first} ${user.name.last}`) ||
                user.name.first,
            funds: user.funds,
            token: token,
        });
    }
);

/**
 * POST - Register user with given data.
 *
 * @param {Request} request - The HTTP request object containing the email, password, name and location objects.
 * @param {Response} response - The HTTP response object containing conclusion message.
 * @throws throws error if there's already a user with given email or with the data isn't valid.
 */
export const registerUser = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { email, password, name, location } = request.body;
        if (
            !email ||
            !password ||
            !name.first ||
            !location.country ||
            !location.state
        ) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let userExist = (await User.findOne({ email })) as IUser;
        if (userExist) {
            response.status(400);
            throw new Error(`Uma conta já foi criada com esse email.`);
        }

        //hash password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let newUser = {
            email,
            name,
            location,
            password: hashedPassword,
        };

        await User.create(newUser);
        response.status(202).json({ message: "Usuário Criado." });
    }
);

/**
 * GET - Get user profile information with given user id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing user info.
 * @throws throws error if no user has been found or if the user id isn't valid.
 */
export const getProfileInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(id).select({
            name: 1,
            id: 1,
            email: 1,
            createdAt: 1,
            location: 1,
            description: 1,
        });
        if (!user) {
            response.status(404);
            throw new Error("Usuario não encontrado");
        }

        response.json(user);
    }
);

/**
 * GET - Get user products IDs with given user id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user id.
 * @param {Response} response - The HTTP response object containing user products IDs.
 * @throws throws error if no user has been found or if the user id isn't valid.
 */
export const getUserProducts = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuario nao encontrado");
        }

        let userProducts = await Product.find({ owner: user.id }).select({
            id: 1,
        });
        response.status(202).json(userProducts);
    }
);

/**
 * GET, AUTH REQUIRED - Get user profile private information with given user id. It should be a valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing user info.
 * @throws throws error if no user has been found, if the private info ins't from the request user or if the user id isn't valid.
 */
export const getUserPrivateInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        let user = await User.findById(request.user).select({
            id: 1,
            funds: 1,
            email: 1,
        });
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }
        if (user.id !== id) {
            response.status(402);
            throw new Error("Não autorizado.");
        }

        response
            .status(200)
            .json({ id: user.id, funds: user.funds, email: user.email });
    }
);

/**
 * POST, AUTH REQUIRED - Increase the user balance with given amount.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing conclusion message.
 * @throws throws error if no user has been found, or if the amount isn't valid.
 */
export const addFunds = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { amount } = request.body;
        if(amount < 0){
            response.status(400)
            throw new Error("Valor Inválido.")
        }

        let userExist = await User.findById(request.user);
        if (!userExist) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        await User.findByIdAndUpdate(request.user, {
            $inc: { funds: +amount },
        });
        response.status(202).json({message:"Valor Adicionado."});
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete user account and associated info with given user id. It should be a valid ObjectId
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if no user has been found, if the request user id is different from the user id or if the user id isn't valid.
 */
export const deleteAccount = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        let { id } = request.params;
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        const user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não existe");
        }
        if (user.id !== id) {
            response.status(401);
            throw new Error("Não autorizado");
        }

        let session = await mongoose.startSession();
        await session.withTransaction(async () => {
            await Product.deleteMany(
                { owner: user.id },
                {
                    session,
                }
            );
            await Review.deleteMany(
                { author: user.id },
                {
                    session,
                }
            );
            await Review.deleteMany({ productOwner: user.id }, { session });
            await WishlistItem.deleteMany({ user: user.id }, { session });

            await ProductInstance.deleteMany({ user: user.id }, { session });
            await ProductInstance.deleteMany({ seller: user.id }, { session });

            await User.findByIdAndDelete(user.id);
            await session.commitTransaction();
        });
        session.endSession();
        response.status(200).json({ message: "Conta Excluida." });
    }
);

/**
 * PUT, AUTH REQUIRED - Update user account details with given data and user id. It should be a valid ObjectId
 *
 * @param {Request} request - The HTTP request object containing the user ID and data.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if any field expect from the body isn't valid, if not user has been found or if the request user id is different from user id
 */
export const updateUserInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        UserValidator.validate(response, request.body);
        let { name, location, description } = request.body;
        let { id } = request.params;

        let userExist = await User.findById(id);
        if (!userExist) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        if (userExist.id !== id) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        await User.findByIdAndUpdate(id, {
            name,
            location,
            description,
        });

        response.status(201).json({ message: "Feito." });
    }
);
