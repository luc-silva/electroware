import { Router } from "express";
import { getRecentProducts } from "../controllers/productController";

export const productsRouter = Router();

productsRouter.get("/", getRecentProducts);
