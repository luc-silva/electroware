const express = require("express")
const { getRecentProducts } = require("../controllers/productController")

const router = express.Router()

router.get("/", getRecentProducts)

module.exports = router