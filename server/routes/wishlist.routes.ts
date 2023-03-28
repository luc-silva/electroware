import { Router } from "express";

const Wishlist = require("../models/Wishlist");

const { getWishlistItems } = require("../controllers/wishlistController");
const { protectedRoute } = require("../middleware/auth");

export const wishlistRouter = Router();
wishlistRouter.get("/", protectedRoute, getWishlistItems)
