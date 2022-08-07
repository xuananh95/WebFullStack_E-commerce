const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateJWT");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // save to DB
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    } else {
        const newUser = await User.create({ name, email, password });
        if (newUser) {
            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }
});

module.exports = {
    registerUser,
};
