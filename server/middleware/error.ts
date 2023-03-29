import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.status(response.statusCode);
    response.json({
        errorStatus: response.statusCode,
        message: err.message,
    });
};
