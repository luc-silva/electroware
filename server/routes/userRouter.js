const express = require("express")
const { registerUser, loginUser, getProfile } = require("../controllers/userController")

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", registerUser)

router.get("/user/:id", getProfile)

module.exports = router