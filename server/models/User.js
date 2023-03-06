const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            first: { type: String, maxlength: 10 },
            last: { type: String, maxlength: 10 },
        },
        email: { required: true, unique: true, type: String },
        password: { required: true, type: String },
        credit: { type: Number, default: 0},
    },
    { timestamps: true }
);

UserSchema.virtual("username").get(function () {
    return this.name.last ? `${this.name.first} ${this.name.last}` : this.name.first;
});

module.exports = mongoose.model("User", UserSchema);
