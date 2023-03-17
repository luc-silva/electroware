const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, required: true, ref: "ProductInstance" }],
    paymentMethod: {type: String, required: true},
    totalPrice: {type: Number, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Transaction", TransactionSchema);
