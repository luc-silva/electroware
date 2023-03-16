const express = require("express");
const router = express.Router();
const { protected } = require("../middleware/auth");
const {
    removeInstance,
    createInstance,
    getInstances,
} = require("../controllers/productInstanceController");

//router.get("/", protected, getShoppingCartDetails);
router.get("/", protected, getInstances)
router.post("/", protected, createInstance);
router.delete("/:id", protected, removeInstance);
module.exports = router;
