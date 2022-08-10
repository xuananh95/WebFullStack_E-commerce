const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        console.log(id);
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product does not exist!");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        product.delete();
        res.json({
            message: `Successfully deleted product ${product.name}`,
        });
    } else {
        res.status(404);
        throw new Error("Product does not exist!");
    }
});

const addProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);
    if (newProduct) {
        res.json({
            message: `Successfully added ${newProduct.name}`,
        });
    } else {
        res.status(401);
        throw new Error("Error creating new product");
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        const updateProduct = await product.save();
        res.json({
            message: `Successfully updated ${updateProduct.name}`,
        });
    } else {
        res.status(404);
        throw new Error("Product doesn't exist!");
    }
});

module.exports = {
    getProduct,
    getProductByID,
    deleteProduct,
    addProduct,
    updateProduct,
};
