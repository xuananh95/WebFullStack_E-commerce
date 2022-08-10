const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateJWT");
const bcryptjs = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    // save to DB
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    } else {
        const newUser = await User.create({ name, email, password, isAdmin });
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

const authLogin = asyncHandler(async (req, res) => {
    // handle login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcryptjs.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid login credentials");
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (user) {
        user.delete();
        res.json({
            message: `Successfully deleted user ${user.name}`,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

const getUserByID = asyncHandler(async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserByID = asyncHandler(async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = {
    registerUser,
    authLogin,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserByID,
    updateUserByID,
};
