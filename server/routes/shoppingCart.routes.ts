import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import {
    removeInstance,
    createInstance,
    getInstances,
} from "../controllers/productInstanceController";

export const shoppingCartRouter = Router();
//router.get("/", protected, getShoppingCartDetails);
shoppingCartRouter.get("/", protectedRoute, getInstances);
shoppingCartRouter.post("/", protectedRoute, createInstance);
shoppingCartRouter.delete("/:id", protectedRoute, removeInstance);
