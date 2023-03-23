const express = require("express");
const router = express.Router();

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
    deleteAccount
} = require("../controllers/userController");
const { protected } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/user/:id", getProfileInfo);
router.get("/user/:id/products", getUserProducts);
router.get("/user/:id/reviews", getEveryUserReviews);
router.get("/user/:id/products/reviews", getEveryUserProductsReviews);

//protected
router.post("/user/billings/add", protected, addFunds);
router.get("/user/private/:id", protected, getUserPrivateInfo);
router.get("/user/:id/transactions", protected, getUserTransactions);
router.delete("/user/:id", protected, deleteAccount);

module.exports = router;
