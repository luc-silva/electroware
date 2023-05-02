import asyncHandler from "express-async-handler";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { IUser } from "../interface";
import { Request, Response } from "express";
import UserValidator from "../validators/UserValidator";
import UserRepository from "../repositories/UserRepository";
import WishlistCollectionRepository from "../repositories/WishlistCollectionRepository";

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
        let user = await UserRepository.getUserInfoWithEmail(email);
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
            username: user.get("username"),
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

        let userData = request.body;
        UserValidator.validateRegistration(response, userData);

        let userExist = await UserRepository.getUserInfoWithEmail(
            userData.email
        );
        if (userExist) {
            response.status(400);
            throw new Error(`Uma conta já foi criada com esse email.`);
        }

        //hash password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(userData.password, salt);

        let newUser = {
            ...userData,
            password: hashedPassword,
        };

        await UserRepository.createUser(newUser);
        response.status(202).json({ message: "Usuário Criado." });
    }
);

/**
 * PATCH, AUTH REQUIRED - Updates the user password with given password.
 * @param {Request} request - The HTTP request object containing the passwords.
 * @param {Response} response - The HTTP response object containing conclusion message.
 * @throws throws error if no user has been found or if the given password isn't valid.
 */
export const updateUserPassword = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let user = await UserRepository.getUserPrivateDetails(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let { password, new_password } = request.body;
        UserValidator.validatePasswordChange(response, request.body);

        if (!(await bcrypt.compare(password, user.password))) {
            response.status(401);
            throw new Error("Senha Inválida.");
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(new_password, salt);

        await UserRepository.findUserAndUpdateDetails(user.id, {
            password: hashedPassword,
        });
        response.status(200).json({ message: "Senha Atualizada." });
    }
);

/**
 * PATCH, AUTH REQUIRED - Updates the user email with given data.
 * @param {Request} request - The HTTP request object containing the email.
 * @param {Response} response - The HTTP response object containing conclusion message.
 * @throws throws error if no user has been found or if the given email isn't valid.
 */
export const updateUserEmail = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let user = await UserRepository.getUserPrivateDetails(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let { email } = request.body;
        UserValidator.validateEmailChange(response, request.body);

        await UserRepository.findUserAndUpdateDetails(user.id, {
            email,
        });
        response.status(200).json({ message: "Email Atualizado." });
    }
);

/**
 * GET - Get user profile information with given valid ObjectId.
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
        let user = await UserRepository.getUser(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuario não encontrado");
        }

        response.json(user);
    }
);

/**
 * GET - Get user products IDs with given valid ObjectId.
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
        let user = await UserRepository.getUser(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuario nao encontrado");
        }

        let userProducts = await UserRepository.getUserProducts(user.id);
        response.status(202).json(userProducts);
    }
);

/**
 * GET, AUTH REQUIRED - Get user profile private information with given valid ObjectId.
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
        let user = await UserRepository.getUserEmailAndFunds(id);
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
        if (amount < 0) {
            response.status(400);
            throw new Error("Valor Inválido.");
        }

        let userExist = await UserRepository.getUser(request.user.id);
        if (!userExist) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        await UserRepository.addUserFunds(userExist.id, amount);
        response.status(202).json({ message: "Valor Adicionado." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete user account and associated info with given valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if no user has been found, if the request user ID is different from the user ID or if the user ID isn't valid.
 */
export const deleteAccount = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params || !request.user) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        const user = await UserRepository.getUser(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não existe");
        }

        if (user.id !== id) {
            response.status(401);
            throw new Error("Não autorizado");
        }

        await UserRepository.deleteUserAccount(id);
        response.status(200).json({ message: "Conta Excluida." });
    }
);

/**
 * PUT, AUTH REQUIRED - Update user account details with given data and valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the user ID and data.
 * @param {Response} response - The HTTP response object containing a conclusion message.
 * @throws throws error if any field expect from the body isn't valid, if not user has been found or if the request user id is different from user ID.
 */
export const updateUserInfo = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body || !request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let updatedUserData = request.body;
        UserValidator.validate(response, updatedUserData);

        let { id } = request.params;
        let userExist = await UserRepository.getUser(id);
        if (!userExist) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        await UserRepository.findUserAndUpdateDetails(id, updatedUserData);

        response.status(200).json({ message: "Feito." });
    }
);

/**
 * GET, AUTH REQUIRED - Get every collection from a user.
 * @param  {Request} request The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing collection ids.
 * @throws throws error if the user has not been found.
 */
export const getEveryUserCollectionOwned = asyncHandler(
    async (request: Request, response: Response) => {
        let { id } = request.params;

        let user = await UserRepository.getUser(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        let collections =
            await WishlistCollectionRepository.getCollectionsFromUser(user.id);

        response.status(200).json(collections);
    }
);

/**
 * GET - Get every public collection from a user.
 * @param  {Request} request The HTTP request object containing the user ID.
 * @param {Response} response - The HTTP response object containing collection ids.
 * @throws throws error if the user has not been found.
 */
export const getUserPublicCollections = asyncHandler(
    async (request: Request, response: Response) => {
        let { id } = request.params;

        let user = await UserRepository.getUser(id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário Não Encontrado.");
        }

        let collections =
            await WishlistCollectionRepository.getPublicCollectionsFromUser(
                user.id
            );

        response.status(200).json(collections);
    }
);
