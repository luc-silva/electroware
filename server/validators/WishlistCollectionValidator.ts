import { Response } from "express";
import { ICollectionData, Validator } from "../interface";
import { Types } from "mongoose";

class WishlistCollectionValidator implements Validator {
    public validate(response: Response, requestBody: ICollectionData): void {
        let { name, user, privated } = requestBody;
        if (typeof name !== "string") {
            response.status(400);
            throw new Error("Campo nome inválido.");
        }

        if (!Types.ObjectId.isValid(user)) {
            response.status(400);
            throw new Error("Usuário Inválido.");
        }

        if (typeof privated !== "boolean") {
            response.status(400);
            throw new Error("Campo visibilidade Inválido.");
        }
    }
}
export default new WishlistCollectionValidator();
