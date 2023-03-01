const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    purchaseMethod: {type: String, required: true},
    status: {type: String, required: true},
    product: {type: Schema.Types.ObjectId, required: true},
    seller: {type: Schema.Types.ObjectId, required: true},
    buyer: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})

module.exports = mongoose.model("Order", OrderSchema)