import { Router } from "express";

import  {protectedRoute} from "../middleware/auth"
const {
    getRecentProducts,
    getProductDetails,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { getProductReviews } = require("../controllers/reviewsController");

export const productRouter = Router();

productRouter.get("/:id", getProductDetails); //get a specific product
productRouter.get("/:id/reviews", getProductReviews);

productRouter.put("/:id", protectedRoute, updateProduct);
productRouter.delete("/:id", protectedRoute, deleteProduct);

productRouter.get("/search/:keyword", searchProduct);
productRouter.post("/create", protectedRoute, createProduct);
