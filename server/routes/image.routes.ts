import { Router } from "express";
import { createImage, getUserImage, updateImage } from "../controllers/imageController";
import { protectedRoute } from "../middleware/auth";
import { imageUploader } from "../middleware/buffer";

export const imageRouter = Router();

imageRouter.post("/upload", imageUploader, protectedRoute, updateImage);
imageRouter.get("/:id", getUserImage);
