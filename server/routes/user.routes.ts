import { Router } from "express";
const { addProductToWishlist } = require("../controllers/productController");

const {
    getEveryUserReviews,
    getEveryUserProductsReviews,
} = require("../controllers/reviewsController");
const { getUserTransactions } = require("../controllers/transactionController");
const {
    registerUser,
    loginUser,
    getUserProducts,
    addFunds,
    getProfileInfo,
    getUserPrivateInfo,
    deleteAccount,
} = require("../controllers/userController");
const { protectedRoute } = require("../middleware/auth");

export const userRouter = Router();
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

userRouter.get("/user/:id", getProfileInfo);
userRouter.get("/user/:id/products", getUserProducts);
userRouter.get("/user/:id/reviews", getEveryUserReviews);
userRouter.get("/user/:id/products/reviews", getEveryUserProductsReviews);

//protected
userRouter.post("/user/wishlist", protectedRoute, addProductToWishlist);
userRouter.post("/user/billings/add", protectedRoute, addFunds);
userRouter.get("/user/private/:id", protectedRoute, getUserPrivateInfo);
userRouter.get("/user/:id/transactions", protectedRoute, getUserTransactions);
userRouter.delete("/user/:id", protectedRoute, deleteAccount);

