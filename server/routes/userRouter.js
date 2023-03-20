const express = require("express");
const router = express.Router();

const { getEveryUserReviews } = require("../controllers/reviewsController");
const {
    registerUser,
    loginUser,
    getProfile,
    getUserProducts,
    addFunds,
} = require("../controllers/userController");
const { protected } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/user/:id", getProfile);
router.get("/user/:id/products", getUserProducts);
router.get("/user/:id/reviews", getEveryUserReviews);

//protected
router.post("/user/billings/add", protected, addFunds)

module.exports = router;
