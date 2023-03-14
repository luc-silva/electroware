const express = require("express");
const router = express.Router();

const { getEveryUserReviews } = require("../controllers/reviewsController");
const {
    getShoppingCartDetails,
} = require("../controllers/shoppingCartController");
const {
    registerUser,
    loginUser,
    getProfile,
    getUserProducts,
} = require("../controllers/userController");
const { protected } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/user/:id", getProfile);
router.get("/user/:id/products", getUserProducts);
router.get("/user/:id/reviews", getEveryUserReviews);

module.exports = router;
