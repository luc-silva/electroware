import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import WishlistCollectionValidator from "../validators/WishlistCollectionValidator";
import WishlistCollectionRepository from "../repositories/WishlistCollectionRepository";
import { ICollectionData } from "../interface";
import UserRepository from "../repositories/UserRepository";

/**
 * POST, AUTH REQUIRED - Create a collection with given data.
 * @param  {Request} request The HTTP request object containing the data.
 * @param {Response} response - The HTTP response object containing an conclusion message.
 * @throws throws error if the data is not valid or if a collection with given name already exist.
 */
export const createCollection = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body) {
            response.status(400);
            throw new Error("Dados inválidos.");
        }

        let collectionData: ICollectionData = request.body;
        WishlistCollectionValidator.validate(response, collectionData);

        if (collectionData.user !== request.user.id) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        let user = await UserRepository.getUser(request.user.id);
        if (!user) {
            response.status(404);
            throw new Error("Usuário não encontrado.");
        }

        let collectionAlreadyExists =
            await WishlistCollectionRepository.getCollectionByNameFromUser(
                user.id,
                collectionData.name
            );

        if (collectionAlreadyExists) {
            response.status(400);
            throw new Error("Já existe uma coleção com esse nome.");
        }

        await WishlistCollectionRepository.createCollection(collectionData);
        response.status(200).json({ message: "Coleção Criada." });
    }
);

/**
 * PUT, AUTH REQUIRED - Update a collection with given data and collection id.
 * @param  {Request} request The HTTP request object containing the data and id.
 * @param {Response} response - The HTTP response object containing an conclusion message.
 * @throws throws error if the data is not valid, if a collection has not been found or if the collection owner is different from request user.
 */
export const updateCollection = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || !request.body || !request.params) {
            response.status(400);
            throw new Error("Dados inválidos.");
        }
        let { id } = request.params;

        let collectionToBeUpdated =
            await WishlistCollectionRepository.getCollection(id);
        if (!collectionToBeUpdated) {
            response.status(404);
            throw new Error("Coleção Não Encontrada.");
        }

        let collectionData: ICollectionData = request.body;
        WishlistCollectionValidator.validate(response, collectionData);

        if (
            collectionData.user !== request.user.id ||
            collectionData.user !== collectionToBeUpdated.user.toString()
        ) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        await WishlistCollectionRepository.updateCollectionDetails(
            id,
            collectionData
        );

        response.status(200).json({ message: "Coleção Atualizada." });
    }
);

/**
 * DELETE, AUTH REQUIRED - Delete a collection with given collection id.
 * @param  {Request} request - The HTTP request object containing the id.
 * @param {Response} response - The HTTP response object containing an conclusion message.
 * @throws throws error if the data is not valid.
 */
export const deleteCollection = asyncHandler(
    async (request: Request, response: Response) => {
        if (!request.user || request.params) {
            response.status(400);
            throw new Error("Dados Inválidos.");
        }

        let { id } = request.params;
        let collection = await WishlistCollectionRepository.getCollection(id);
        if (!collection) {
            response.status(404);
            throw new Error("Coleção não encontrada.");
        }

        if (collection.user.toString() !== request.user.id) {
            response.status(401);
            throw new Error("Não Autorizado.");
        }

        await WishlistCollectionRepository.deleteCollection(id);

        response.status(200).json({ message: "Coleção Excluida." });
    }
);
