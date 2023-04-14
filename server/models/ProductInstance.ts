import { Schema, model } from "mongoose";

const ProductInstanceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    seller: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    productImage: { type: Schema.Types.ObjectId, required: true, ref: "Image" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

export = model("ProductInstance", ProductInstanceSchema);
