import { Schema, model } from "mongoose";

const WishlistCollection = new Schema(
    {
        name: {
            type: String,
            maxLenght: 20,
            minLenght: 8,
            required: true,
            unique: true,
        },
        privated: { type: Boolean, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export = model("WishlistCollection", WishlistCollection);
