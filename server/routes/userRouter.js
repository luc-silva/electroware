const express = require("express");
const { getEveryUserReviews } = require("../controllers/reviewsController");
const {
    registerUser,
    loginUser,
    getProfile,
    getUserProducts,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/user/:id", getProfile);
router.get("/user/:id/products", getUserProducts);
router.get("/user/:id/reviews", getEveryUserReviews);

module.exports = router;
