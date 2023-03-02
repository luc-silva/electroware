const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    wishlistOwner: { type: Schema.Types.ObjectId, required: true},
    wishlistProducts: [{type: Schema.Types.ObjectId, ref: "Product"}]
}, {timestamps: true})

module.exports = mongoose.model("Wishlist", WishlistSchema)