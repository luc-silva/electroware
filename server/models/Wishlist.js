const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true},
    products: [{type: Schema.Types.ObjectId, ref: "Product"}]
}, {timestamps: true})

module.exports = mongoose.model("Wishlist", WishlistSchema)