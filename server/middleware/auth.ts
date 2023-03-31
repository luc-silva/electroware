import { Response, Request, NextFunction, response } from "express";

import * as jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { IDecodedUserToken, IUser } from "../interface";

export const protectedRoute = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        res.status(401);
        throw new Error("Não autorizado");
    }

    let token = req.headers.authorization.split(" ")[1];
    //decode the token to get the user id

    let decoded = jwt.verify(token, "123") as IDecodedUserToken;

    //set the user in the response and send to the next middleware
    let user = (await User.findById(decoded?.id)) as IUser;
    if (user && decoded?.id) {
        req.user = user;
    }
    next();
});
