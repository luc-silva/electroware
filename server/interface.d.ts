import { Request, Response } from "express";

interface IDecodedUserToken {
    id: string;
}
interface IUser {
    id: string;
    name: {
        first: string;
        last: string | null;
    };
    location: {
        state: string;
        country: string;
    };
    email: string;
    funds: number;
    description: string;
}
export interface IProduct {
    id: string;
    owner: string;
    category: string;
    name: string;
    price: number;
    quantity: number;
    brand?: string;
    description: string;
    on_sale: boolean;
    discount: number;
}
interface IProductInstance {
    user: string;
    seller: string;
    product: string;
    price: number;
    quantity: number;
}
interface IReview {
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    score: number;
    text: string;
}

interface IRequestError {
    message: string;
}

interface Validator {
    public validate(response: Response, requestBody: any): void;
}

declare global {
    namespace Express {
        interface Request {
            user: IUser;
            body: {
                name: string;
            };
        }
    }
}
