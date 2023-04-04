import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(response.statusCode < 400 ? 400 : response.statusCode);
    response.json(err.message);
};
