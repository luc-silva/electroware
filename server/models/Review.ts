import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        authorUsername: { type: String, required: true },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        productOwner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        score: { type: Number, min: 1, max: 5, required: true },
        text: { type: String, maxLength: 150 },
    },
    { timestamps: true }
);

export = model("Review", ReviewSchema);
