const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName: {
        first: {type: String, maxlength:10},
        last: {type: String, maxlength: 10}
    },
    userEmail: {required: true, unique: true, type:String},
    userPassword: {required: true, type: String},
    userWishlist: [{type: Schema.Types.ObjectId ,ref:"Wishlist"}],
    userShoppingCart: [{type: Schema.Types.ObjectId ,ref:"ShoppingCart"}],
    userProducts:[{type: Schema.Types.ObjectId ,ref:"Product"}],
    userReviews: [{type: Schema.Types.ObjectId ,ref:"Review"}],
    userCredit: {type: Number}
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)