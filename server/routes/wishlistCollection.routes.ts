import { Router } from "express";
import {
    createCollection,
    getWishlistItensFromCollection,
    updateCollection,
} from "../controllers/wishlistCollectionController";
import { protectedRoute } from "../middleware/auth";

export const wishlistCollectionRouter = Router();

wishlistCollectionRouter.get("/:id/products", getWishlistItensFromCollection);
wishlistCollectionRouter.post("", protectedRoute, createCollection);
wishlistCollectionRouter.put("/:id", protectedRoute, updateCollection);
wishlistCollectionRouter.delete("/:id", protectedRoute, updateCollection);
