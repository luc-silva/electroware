const express = require("express")
const router = express.Router()

const {protected} = require("../middleware/auth")
const { getRecentProducts,getProductDetails, searchProduct, createProduct } = require("../controllers/productController")

router.get("/products", getRecentProducts)
router.get("/search", searchProduct)
router.get("/:id", getProductDetails)

router.post("/create", protected, createProduct)

module.exports = router