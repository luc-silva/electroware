import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true, uniq: true },
});

export = model("Category", CategorySchema);
