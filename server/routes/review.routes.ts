import { Router } from "express";

import {
    submitReview,
    deleteReview,
    updateReview,
    getSingleReview,
} from "../controllers/reviewsController";
import { protectedRoute } from "../middleware/auth";

export const reviewRouter = Router();
reviewRouter.get("/:id", getSingleReview)
reviewRouter.post("/", protectedRoute, submitReview);
reviewRouter.delete("/:id", protectedRoute, deleteReview);
reviewRouter.patch("/:id", protectedRoute, updateReview);
