import { Schema, model, Types } from "mongoose";

const ImageInstanceSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", required: true },
        product: { type: Types.ObjectId, ref: "Product" },
        data: { type: Buffer, required: true },
        imageName: { type: String, required: true },
        imageAlt: { type: String, default: "" },
    },
    { timestamps: true }
);

export = model("Image", ImageInstanceSchema);
