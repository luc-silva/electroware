import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import {
    removeInstance,
    createInstance,
    getInstances,
    getSingleInstance,
} from "../controllers/productInstanceController";

export const shoppingCartRouter = Router();
//router.get("/", protected, getShoppingCartDetails);
shoppingCartRouter.get("/", protectedRoute, getInstances);
shoppingCartRouter.get("/:id", protectedRoute, getSingleInstance);
shoppingCartRouter.post("/", protectedRoute, createInstance);
shoppingCartRouter.delete("/:id", protectedRoute, removeInstance);
