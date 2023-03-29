import { Router } from "express";
import {createCategory, getCategories, getSingleCategory} from "../controllers/categoryController"
import { getProductFromCategory } from "../controllers/productController";

export const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id/products", getProductFromCategory);
categoryRouter.get("/:id", getSingleCategory);
