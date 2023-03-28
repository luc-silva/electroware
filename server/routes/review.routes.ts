import { Router } from "express";

const {
    submitReview,
    deleteReview,
    updateReview,
} = require("../controllers/reviewsController");
const { protectedRoute } = require("../middleware/auth");

export const reviewRouter = Router();
reviewRouter.post("/", protectedRoute, submitReview);
reviewRouter.delete("/:id", protectedRoute, deleteReview);
reviewRouter.patch("/:id", protectedRoute, updateReview);

