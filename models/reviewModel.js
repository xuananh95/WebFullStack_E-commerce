const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    // USER REF
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

reviewSchema.post("save", async function () {
    await this.constructor.calculateAverage(this.product);
});

reviewSchema.static("calculateAverage", async function (productID) {
    const stats = await Review.aggregate([
        {
            $match: { product: productID },
        },
        {
            $group: {
                _id: "$product",
                numReviews: { $sum: 1 },
                rating: { $avg: "$rating" },
            },
        },
    ]);
    await Product.findByIdAndUpdate(productID, {
        rating: stats.length > 0 ? stats[0]["rating"] : 0,
        numReviews: stats.length > 0 ? stats[0]["numReviews"] : 0,
    });
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
