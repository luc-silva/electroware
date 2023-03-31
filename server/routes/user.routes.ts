import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getUserTransactions } from "../controllers/transactionController";

import {
    getEveryUserReviews,
    getEveryUserProductsReviews,
} from "../controllers/reviewsController";
import {
    registerUser,
    loginUser,
    getUserProducts,
    addFunds,
    getProfileInfo,
    getUserPrivateInfo,
    deleteAccount,
} from "../controllers/userController";

export const userRouter = Router();
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

userRouter.get("/user/:id", getProfileInfo);
userRouter.get("/user/:id/products", getUserProducts);
userRouter.get("/user/:id/reviews", getEveryUserReviews);
userRouter.get("/user/:id/products/reviews", getEveryUserProductsReviews);

//protected
userRouter.post("/user/billings/add", protectedRoute, addFunds);
userRouter.get("/user/private/:id", protectedRoute, getUserPrivateInfo);
userRouter.get("/user/:id/transactions", protectedRoute, getUserTransactions);
userRouter.delete("/user/:id", protectedRoute, deleteAccount);
