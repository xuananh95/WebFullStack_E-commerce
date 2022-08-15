const Review = require("../models/reviewModel");

const calculateAverage = async function (productID) {
    console.log(Review);
    const stats = await Review.aggregate([
        {
            $match: { product: productID },
        },
        {
            $group: {
                _id: "$product",
                numReview: { $sum: 1 },
                rating: { $avg: "$rating" },
            },
        },
    ]);
    console.log(stats);
};

module.exports = calculateAverage;
