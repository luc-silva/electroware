const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        productName: { type: String, maxLength: 30, required: true },
        productPrice: { type: Number, required: true },
        productQuantity: { type: Number, required: true },
        productBrand: { type: String, maxLength: 15 },
        productDescription: { type: String, maxLength: 200 },
        productOwner: { type: Schema.Types.ObjectId, ref: "User" },
        productCategory: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
