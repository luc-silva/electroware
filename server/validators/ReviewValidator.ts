import { Response } from "express";
import { Validator } from "../interface";

interface ReviewBody {
    author: string;
    product: string;
    productOwner: string;
    score: number;
    text: string;
}

class ReviewValidator implements Validator {
    public validate(response: Response, requestBody: ReviewBody): void {
        let { author, product, productOwner, score, text } = requestBody;

        if (!author && typeof author !== "string") {
            response.status(400);
            throw new Error('Campo "autor" Inválido.');
        }
        if (!product && typeof product !== "string") {
            response.status(400);
            throw new Error('Campo "produto" Inválido.');
        }
        if (!productOwner && typeof productOwner !== "string") {
            response.status(400);
            throw new Error('Campo "vendedor" Inválido.');
        }
        if ((!text && typeof text !== "string") || text.length < 150) {
            response.status(400);
            throw new Error('Campo "texto" Inválido.');
        }
        if ((!score && isNaN(score)) || score < 0 || score > 5) {
            response.status(400);
            throw new Error('Campo "nota" Inválido.');
        }
    }

    public validateUpdate(
        response: Response,
        requestBody: { score: number; text: string }
    ): void {
        let { score, text } = requestBody;

        if ((!text && typeof text !== "string") || text.length > 150) {
            response.status(400);
            throw new Error('Campo "texto" Inválido.');
        }
        if ((!score && isNaN(score)) || score < 0 || score > 5) {
            response.status(400);
            throw new Error('Campo "nota" Inválido.');
        }
    }
}
export default new ReviewValidator();
