const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        reviewAuthor: { type: Schema.Types.ObjectId, ref: "User" },
        reviewProduct: { type: Schema.Types.ObjectId, ref: "Product" },
        reviewText: { type: String, maxLength: 150 },
        reviewScore: { type: Number, min: 1, max: 5 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
