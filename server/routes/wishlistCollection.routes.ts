import { Router } from "express";
import {
    createCollection,
    updateCollection,
} from "../controllers/wishlistCollectionController";
import { protectedRoute } from "../middleware/auth";

export const wishlistCollectionRouter = Router();

wishlistCollectionRouter.post("", protectedRoute, createCollection);
wishlistCollectionRouter.put(":id", protectedRoute, updateCollection);
wishlistCollectionRouter.delete(":id", protectedRoute, updateCollection);
