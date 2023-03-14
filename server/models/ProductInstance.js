const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    shoppingCart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ShoppingCart",
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
ProductInstanceSchema.virtual("totalValue").get(() => {
    return quantity * price;
});

module.exports = mongoose.model("ProductInstance", ProductInstanceSchema);
