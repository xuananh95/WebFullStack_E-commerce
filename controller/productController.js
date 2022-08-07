const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
    const userID = req.body.user;
    const userExists = await User.findOne({ _id: userID });
    if (userExists) {
        const newProduct = await Product.create(req.body);
        if (newProduct) {
            res.status(200).json(JSON.stringify(newProduct));
        }
    } else {
        res.status(400);
        throw new Error("User not exists in DB");
    }
});

module.exports = {
    addProduct,
};
