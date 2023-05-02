import { Router } from "express";
import {
    createWishlistItem,
    removeWishlistItem,
} from "../controllers/wishlistItemController";
import { protectedRoute } from "../middleware/auth";

export const wishlistRouter = Router();
wishlistRouter.post("/", protectedRoute, createWishlistItem);
wishlistRouter.delete("/:id", protectedRoute, removeWishlistItem);
