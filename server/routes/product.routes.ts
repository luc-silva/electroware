import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import {
    getRecentProducts,
    getProductDetails,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductAvarageRating,
    getDiscountedProducts,
} from "../controllers/productController";
import { getProductReviews } from "../controllers/reviewsController";
import { imageUploader } from "../middleware/buffer";

export const productRouter = Router();

productRouter.get("/", getRecentProducts)
productRouter.get("/discount", getDiscountedProducts)
productRouter.get("/:id", getProductDetails); //get a specific product
productRouter.get("/:id/reviews", getProductReviews);
productRouter.get("/:id/reviews/score", getProductAvarageRating);

productRouter.put("/:id", protectedRoute, updateProduct);
productRouter.delete("/:id", protectedRoute, deleteProduct);

productRouter.post("/search/:keyword", searchProduct);
productRouter.post("/create", protectedRoute, imageUploader, createProduct);
