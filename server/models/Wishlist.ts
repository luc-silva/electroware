import { Schema, model } from "mongoose";

const WishlistSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

export = model("Wishlist", WishlistSchema);
