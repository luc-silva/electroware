import { Router } from "express";
import { getWishlistItems } from "../controllers/wishlistController";
import { protectedRoute } from "../middleware/auth";

export const wishlistRouter = Router();
wishlistRouter.get("/", protectedRoute, getWishlistItems);
