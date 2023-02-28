const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryName: String,
    categoryProducts: {type: Schema.Types.ObjectId, ref: "Product"}
})

module.exports = mongoose.model("Category", CategorySchema)