import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import ImageInstance from "../models/ImageInstance";
import User from "../models/User";

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
        if (!Types.ObjectId.isValid(id)) {
            response.status(400);
            throw new Error("Dados Inválidos");
        }

        //check for image
        let userImage = await ImageInstance.findOne({
            user: request.params.id,
            imageType: "userImage",
        });
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
        let { buffer, originalname } = request.file;

        let savedImage = await ImageInstance.create({
            data: buffer,
            user: request.user,
            imageName: originalname,
        });

        response.status(200).json(savedImage);
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
        if (!request.file) {
            response.status(400);
            throw new Error("Imagem Inválida.");
        }
        let { buffer } = request.file;

        if (!request.user) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        let user = await User.findById(request.user);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não Encontrado.");
        }

        let imageAlreadyExist = await ImageInstance.findOne({
            user: user.id,
            imageType: "userImage",
        });
        if (imageAlreadyExist) {
            if (imageAlreadyExist.user !== user.id) {
                response.status(401);
                throw new Error("Não Autorizado");
            }
            await ImageInstance.findByIdAndUpdate(imageAlreadyExist.id, {
                data: buffer,
                imageName: `pic-${user.id}`,
                imageType: "userImage",
                imageAlt: "User Profile Picture",
            });
        } else {
            await ImageInstance.create({
                user: user.id,
                data: buffer,
                imageName: `pic-${user.id}`,
                imageType: "userImage",
                imageAlt: "User Profile Picture",
            });
        }

        response.status(200).json({ message: "Foto Atualizada." });
    }
);
