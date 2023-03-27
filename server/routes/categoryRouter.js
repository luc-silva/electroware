const express = require("express");
const {
    createCategory,
    getCategories,
    getSingleCategory,
} = require("../controllers/categoryController");
const { getProductFromCategory } = require("../controllers/productController");

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id/products", getProductFromCategory);
router.get("/:id", getSingleCategory);

module.exports = router;
