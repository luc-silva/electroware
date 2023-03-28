import { Router } from "express";
const { getRecentProducts } = require("../controllers/productController")

export const productsRouter = Router()

productsRouter.get("/", getRecentProducts)