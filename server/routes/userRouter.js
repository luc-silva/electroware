const express = require("express");
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

module.exports = router;
