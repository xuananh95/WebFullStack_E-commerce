// kiểm tra có gửi token lên và Token có hợp lệ không
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    // Token format: Bearer adkflja41234.sadfwqdrqwersdf.adsfqwerqwerasdf
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const userVerify = jwt.verify(token, "some_secret");
            req.user = await User.findById(userVerify.id).select("-password");
            next();
        } catch (e) {
            res.status(401);
            throw new Error("Invalid token");
        }
    } else {
        res.status(401);
        throw new Error("No token or token invalid");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("No permission");
    }
});

module.exports = {
    protect,
    isAdmin,
};
