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
        price: { type: Number, required: true, max: 10000 },
        quantity: { type: Number, required: true, max: 300 },
        brand: { type: String, maxLength: 15, required: true },
        description: { type: String, maxLength: 200 },
        on_sale: { type: Boolean, default: false },
        discount: { type: Number, max: 100, min: 0 },
    },
    { timestamps: true }
);

export = model("Product", ProductSchema);
