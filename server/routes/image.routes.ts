import { Router } from "express";
import { createImage, getUserImage } from "../controllers/imageController";
import { protectedRoute } from "../middleware/auth";
import { imageUploader } from "../middleware/buffer";

export const imageRouter = Router();

imageRouter.post("/upload", imageUploader, protectedRoute, createImage);
imageRouter.get("/:id", getUserImage);
