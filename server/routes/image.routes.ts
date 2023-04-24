import { Router } from "express";
import { createImage, getProductImage, getUserImage, updateImage } from "../controllers/imageController";
import { protectedRoute } from "../middleware/auth";
import { imageUploader } from "../middleware/buffer";

export const imageRouter = Router();

imageRouter.post("/upload", imageUploader, protectedRoute, updateImage);
imageRouter.get("/user/:id", getUserImage);
imageRouter.get("/product/:id", getProductImage);
