const express = require("express")
const router = express.Router()

const { createProductTransaction, getUserTransactions } = require("../controllers/transactionController")
const {protected} = require("../middleware/auth")

router.post("/", protected, createProductTransaction)

module.exports = router