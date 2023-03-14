const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
    cartOwner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
