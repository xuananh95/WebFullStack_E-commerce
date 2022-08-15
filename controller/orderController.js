const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    const myOrders = await Order.find({ user: userID });
    res.json(myOrders);
});

const getOrdersByID = asyncHandler(async (req, res) => {
    const orders = await Order.findById(req.params.id);
    res.json(orders);
});

const createOrder = asyncHandler(async (req, res) => {
    const userID = req.user._id;
    // calculate total price based on each item and shipping price
    let totalPrice = 0;
    let orderItems = req.body.orderItems;
    for (let i = 0; i < orderItems.length; i++) {
        let itemQty = orderItems[i]["qty"];
        let itemPrice = await Product.findById(orderItems[i]["product"]).select(
            "price"
        );
        totalPrice += Number(itemQty) * Number(itemPrice.price);
    }

    totalPrice += Number(req.body.shippingPrice);
    const newOrder = await Order.create({
        user: userID,
        totalPrice: totalPrice,
        ...req.body,
    });
    if (newOrder) {
        res.json({
            message: "Successfully added new order!",
            orderID: newOrder._id,
            totalPrice: newOrder.totalPrice,
        });
    } else {
        res.status(401);
        throw new Error("Error creating new order");
    }
});

const updateOrder = asyncHandler(async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        paymentResult: { status: req.body.status },
    });
    if (updatedOrder) {
        res.json({
            message: "Successfully update order status",
            id: updatedOrder._id,
            status: updatedOrder.paymentResult.status,
        });
    } else {
        res.status(401);
        throw new Error("Error updating order");
    }
});

module.exports = {
    getAllOrders,
    getMyOrders,
    getOrdersByID,
    createOrder,
    updateOrder,
};
