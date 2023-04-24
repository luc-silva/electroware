import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import ImageInstance from "../models/ImageInstance";
import User from "../models/User";
import ImageRepository from "../repositories/ImageRepository";
import UserRepository from "../repositories/UserRepository";

/**
 * GET - Get the image from a user with given valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the id of a user as a parameter.
 * @param {Response} response - The HTTP response object containing an image data.
 * @throws throws error if no image has been found or receives a invalid id.
 */
export const getUserImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params.id) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let { id } = request.params;
        let userImage = await ImageRepository.getUserImage(id);
        if (!userImage) {
            response.status(404);
            throw new Error("Imagem não encontrada.");
        }

        response.status(200).json(userImage);
    }
);

/**
 * GET - Get the image from a product with given valid ObjectId.
 *
 * @param {Request} request - The HTTP request object containing the id of product as a parameter.
 * @param {Response} response - The HTTP response object containing an image data.
 * @throws throws error if no image has been found or receives a invalid id.
 */
export const getProductImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params.id) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let { id } = request.params;
        let userImage = await ImageRepository.getProductImage(id);
        if (!userImage) {
            response.status(404);
            throw new Error("Imagem não encontrada.");
        }

        response.status(200).json(userImage);
    }
);

/**
 * POST, AUTH REQUIRED - Create image instance with given data. Requires a middleware to handle the file.
 *
 * @param {Request} request - The HTTP request object containing the file and user id.
 * @param {Response} response - The HTTP response object containing an image data.
 * @throws throws error if no file has been received.
 */
export const createImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.file) {
            response.status(400);
            throw new Error("Imagem Inválida.");
        }
        let { buffer } = request.file;

        await ImageRepository.createImage(request.user.id, {
            buffer,
            imageType: "userImage",
        });

        response.status(200).json({ message: "Imagem Criada." });
    }
);

/**
 * PATCH, AUTH REQUIRED - Update user image with given data. Requires a middleware to handle the file.
 *
 * @param {Request} request - The HTTP request object containing the file and user id.
 * @param {Response} response - The HTTP response object containing an image data.
 * @throws throws error if no file has been received, if the image owner has not been found or if the request user is different from the original image owner.
 */
export const updateImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.file || !request.body) {
            response.status(400);
            throw new Error("Imagem Inválida.");
        }

        let { buffer } = request.file;
        let {imageType} = request.body
        if(imageType !== "userImage" ||  imageType !== "productImage"){
            response.status(400)
            throw new Error("Dados Inválidos.")
        }

        if (!request.user) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não Encontrado.");
        }

        let imageAlreadyExist = await ImageRepository.getUserImage(user.id);
        if (imageAlreadyExist) {
            if (imageAlreadyExist.user !== user.id) {
                response.status(401);
                throw new Error("Não Autorizado");
            }

            await ImageRepository.updateImage(imageAlreadyExist.id, {
                buffer,
                imageType,
            });
        } else {
            await ImageRepository.createImage(user.id, {
                buffer,
                imageType,
            });
        }

        response.status(200).json({ message: "Foto Atualizada." });
    }
);
