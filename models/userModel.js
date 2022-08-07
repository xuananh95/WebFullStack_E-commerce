const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    // if password is not modified => creating new user => next()
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        return next();
    } catch (e) {
        return next(e);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
