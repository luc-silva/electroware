import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        name: { type: String, maxLength: 30, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        brand: { type: String, maxLength: 15, required: true },
        description: { type: String, maxLength: 200 },
    },
    { timestamps: true }
);

export = model("Product", ProductSchema);
