const Product = require("../models/productModel");
const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getProduct = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword } }
        : {};
    // trả về tổng số product để hiển thị số page
    const countProduct = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip((page - 1) * pageSize); // bỏ qua sản phẩm theo page size
    res.json({
        products,
        countProduct,
        page,
    });
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
            // trả về thông tin sản phẩm
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

const AddReviewToProduct = asyncHandler(async (req, res) => {
    // get product ID from URL params
    const productID = new mongoose.mongo.ObjectId(req.params.id);
    const productExist = Product.findById(productID);
    if (!productExist) {
        res.status(404);
        throw new Error("Product does not exist!");
    }
    // get user ID from token
    const token = req.headers.authorization.split(" ")[1];
    const userID = new mongoose.mongo.ObjectId(
        jwt.verify(token, "some_secret")
    );

    const { name, rating, comment } = req.body;
    const newReview = await Review.create({
        product: productID,
        name,
        rating,
        comment,
        user: userID,
    });
    if (newReview) {
        res.status(200).json({
            product: newReview.product,
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            user: newReview.user,
        });
    } else {
        res.status(400);
        throw new Error("Error creating new review");
    }
});

const getTopProducts = asyncHandler(async (req, res) => {
    const sortProduct = await Product.find({})
        .sort({ rating: "desc" })
        .limit(5);
    res.json(sortProduct);
});

module.exports = {
    getProduct,
    getProductByID,
    deleteProduct,
    addProduct,
    updateProduct,
    AddReviewToProduct,
    getTopProducts,
};
