const express = require("express")
const router = express.Router()

const { createProductTransaction } = require("../controllers/transactionController")
const {protected} = require("../middleware/auth")

router.get("/", protected, createProductTransaction)

module.exports = router