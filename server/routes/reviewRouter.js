const express = require("express");
const router = express.Router();

const {
    submitReview,
    deleteReview,
    updateReview,
} = require("../controllers/reviewsController");
const { protected } = require("../middleware/auth");

router.post("/", protected, submitReview);
router.delete("/:id", protected, deleteReview);
router.patch("/:id", protected, updateReview);

module.exports = router;
