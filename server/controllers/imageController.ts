import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ImageInstance from "../models/ImageInstance";
import User from "../models/User";

//get
export const getUserImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.params.id) {
            response.status(400);
            throw new Error("URL Inválida.");
        }

        let userImage = await ImageInstance.findOne({
            user: request.params.id,
        });
        if (!userImage) {
            response.status(404);
            throw new Error("Imagem não encontrada.");
        }

        response.status(200).json(userImage);
    }
);

////private
//post
export const createImage = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.file) {
            response.status(400);
            throw new Error("Imagem Inválida.");
        }
        let { buffer, originalname } = request.file;
        console.log(request.file);

        let savedImage = await ImageInstance.create({
            data: buffer,
            user: request.user,
            imageName: originalname,
        });

        response.status(200).json(savedImage);
    }
);

//patch
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

        let image = await ImageInstance.findOne({ user: user.id });
        if (!image) {
            response.status(404);
            throw new Error("Imagem não Encontrada.");
        }

        if (image.user !== user.id) {
            response.status(401);
            throw new Error("Não Autorizado");
        }

        let updatedImage = await ImageInstance.findByIdAndUpdate(image.id, {
            buffer,
            imageName: image.id,
        });

        response.status(200).json(updatedImage);
    }
);
