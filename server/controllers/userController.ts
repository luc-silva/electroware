import mongoose from "mongoose";
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

//post
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

        //gen token to use in a protected route
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

//post
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

        //make transaction later
        let session = await mongoose.startSession();
        await session.withTransaction(async () => {
            let user = await User.create(newUser);

            await session.commitTransaction();
        });

        session.endSession();
        response.status(202).json({ message: "Usuário Criado." });
    }
);

//get, need params
export const getProfileInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
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

        let image = ImageInstance.findOne({user:user.id, imageType: "userImage"})
        
        response.json(user);
    }
);

//get, need params
export const getUserProducts = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        let user = await User.findById(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuario nao encontrado");
        }

        let userProducts = await Product.find({ owner: user.id });
        response.status(202).json(userProducts);
    }
);

//private

//get, need params
export const getUserPrivateInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
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
            .status(202)
            .json({ id: user.id, funds: user.funds, email: user.email });
    }
);

//post
export const addFunds = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.body || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { amount } = request.body;

        let userExist = await User.findById(request.user);
        if (!userExist) {
            response.status(404);
            throw new Error("Usuário não encontrado");
        }

        let user = await User.findByIdAndUpdate(request.user, {
            $inc: { funds: +amount },
        });
        response.status(202).json(user);
    }
);

//delete, needs params
export const deleteAccount = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }
        let { id } = request.params;

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

//put, need param
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
