const express = require("express");
const router = express.Router();

const {
    getEveryUserReviews,
    getEveryUserProductsReviews,
} = require("../controllers/reviewsController");
const {
    registerUser,
    loginUser,
    getUserProducts,
    addFunds,
    getProfileInfo,
    getUserPrivateInfo,
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

module.exports = router;
