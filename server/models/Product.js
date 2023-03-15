const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: "User", required:true},
        category: { type: Schema.Types.ObjectId, ref:"Category", required: true },
        name: { type: String, maxLength: 30, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        brand: { type: String, maxLength: 15, required: true },
        description: { type: String, maxLength: 200 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
