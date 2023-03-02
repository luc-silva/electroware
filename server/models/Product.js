const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: "User", required:true},
        category: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, maxLength: 30, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        brand: { type: String, maxLength: 15 },
        description: { type: String, maxLength: 200 },
        buyers: [{type: Schema.Types.ObjectId, ref: "User"}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
