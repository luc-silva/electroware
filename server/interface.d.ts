import { Request } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { Schema } from "mongoose";

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
    profilePic: string;
    email: string;
    funds: number;
    description: string;
}
interface IProduct {
    id: string;
    owner: string;
    category: string;
    name: string;
    price: number;
    quantity: number;
    brand?: string;
    description: string;
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
