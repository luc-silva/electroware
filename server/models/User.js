const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            first: { type: String, maxlength: 10, required: true },
            last: { type: String, maxlength: 10 },
        },
        location: {
            state: { type: String, required: true },
            country: { type: String, required: true },
        },
        profilePic: {type: String, default: "" },
        email: { required: true, unique: true, type: String },
        password: { required: true, type: String },
        funds: { type: Number, default: 0 },
        description: { type: String },
    },
    { timestamps: true }
);

UserSchema.virtual("username").get(function () {
    return this.name.last
        ? `${this.name.first} ${this.name.last}`
        : this.name.first;
});

module.exports = mongoose.model("User", UserSchema);
