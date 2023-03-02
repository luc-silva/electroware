const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userName: {
            first: { type: String, maxlength: 10 },
            last: { type: String, maxlength: 10 },
        },
        userEmail: { required: true, unique: true, type: String },
        userPassword: { required: true, type: String },
        userCredit: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
