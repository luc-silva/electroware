const Wishlist = require("../models/Wishlist");
const express = require("express");
const router = express.Router();
const { getWishlistItems } = require("../controllers/wishlistController");
const { protected } = require("../middleware/auth");

router.get("/", protected, getWishlistItems)


module.exports = router;
