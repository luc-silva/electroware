const express = require("express");
const router = express.Router();

const { protected } = require("../middleware/auth");
const {
    getRecentProducts,
    getProductDetails,
    searchProduct,
    createProduct,
    updateProduct, deleteProduct
} = require("../controllers/productController");

//localhost:6060/products/

// router.get("/:id", getProductDetails); //get a specific product
router.put("/:id", protected, updateProduct);
router.delete("/:id", protected, deleteProduct);

router.get("/search", searchProduct);
router.get("/products", getRecentProducts); //change later
router.post("/create", protected, createProduct);

module.exports = router;
