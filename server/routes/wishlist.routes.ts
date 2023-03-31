import { Router } from "express";
import {
    createWishlistItem,
    getWishlistItems,
    removeWishlistItem,
} from "../controllers/wishlistItemController";
import { protectedRoute } from "../middleware/auth";

export const wishlistRouter = Router();
wishlistRouter.get("/", protectedRoute, getWishlistItems);
wishlistRouter.post("/", protectedRoute, createWishlistItem);
wishlistRouter.delete("/:id", protectedRoute, removeWishlistItem);
