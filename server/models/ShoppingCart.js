const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
    ShoppingCartOwner: { type: Schema.Types.ObjectId, required: true},
    ShoppingCartProducts:[ {type: Schema.Types.ObjectId, ref: "Product"}]
})

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema)