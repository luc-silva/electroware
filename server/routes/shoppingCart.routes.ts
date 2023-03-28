import { Router } from "express";
const { protectedRoute } = require("../middleware/auth");
const {
    removeInstance,
    createInstance,
    getInstances,
} = require("../controllers/productInstanceController");

export const shoppingCartRouter = Router();
//router.get("/", protected, getShoppingCartDetails);
shoppingCartRouter.get("/", protectedRoute, getInstances)
shoppingCartRouter.post("/", protectedRoute, createInstance);
shoppingCartRouter.delete("/:id", protectedRoute, removeInstance);
