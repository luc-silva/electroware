const express = require("express");
const router = express.Router();

const { protected } = require("../middleware/auth");
const {
    getRecentProducts,
    getProductDetails,
    searchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { getProductReviews } = require("../controllers/reviewsController");

//localhost:6060/products/

router.get("/:id", getProductDetails); //get a specific product
router.get("/:id/reviews", getProductReviews);

router.put("/:id", protected, updateProduct);
router.delete("/:id", protected, deleteProduct);

router.post("/search/:keyword", searchProduct);
router.post("/create", protected, createProduct);

module.exports = router;
