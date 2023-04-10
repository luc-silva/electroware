import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4e6, //4 MB
    },
}).single("imageFile");

export const imageUploader = asyncHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        upload(request, response, (err) => {
            next();
        });
    }
);
