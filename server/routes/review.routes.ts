import { Router } from "express";

import {
    submitReview,
    deleteReview,
    updateReview,
} from "../controllers/reviewsController";
import { protectedRoute } from "../middleware/auth";

export const reviewRouter = Router();
reviewRouter.post("/", protectedRoute, submitReview);
reviewRouter.delete("/:id", protectedRoute, deleteReview);
reviewRouter.patch("/:id", protectedRoute, updateReview);
