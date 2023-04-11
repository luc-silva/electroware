import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getUserTransactions } from "../controllers/transactionController";

import {
    getEveryUserReviews,
    getEveryUserProductsReviews,
} from "../controllers/reviewsController";
import {
    updateUserInfo,
    registerUser,
    loginUser,
    getUserProducts,
    addFunds,
    getProfileInfo,
    getUserPrivateInfo,
    deleteAccount,
} from "../controllers/userController";
import { imageUploader } from "../middleware/buffer";

export const userRouter = Router();
userRouter.post("/user/login", loginUser);
userRouter.post("/user/register", registerUser);

userRouter.get("/user/:id", getProfileInfo);
userRouter.get("/user/:id/products", getUserProducts);
userRouter.get("/user/:id/reviews", getEveryUserReviews);
userRouter.get("/user/:id/products/reviews", getEveryUserProductsReviews);

//protected
userRouter.post("/user/billings/add", protectedRoute, addFunds);
userRouter.get("/user/private/:id", protectedRoute, getUserPrivateInfo);
userRouter.get("/user/:id/transactions", protectedRoute, getUserTransactions);
userRouter.delete("/user/:id", protectedRoute, deleteAccount);
userRouter.put("/user/:id", imageUploader, protectedRoute, deleteAccount);
