const express = require("express");
var router = express.Router();
const { isAdmin, protect } = require("../middleware/authMiddleware");
const {
    getAllOrders,
    createOrder,
    getMyOrders,
    getOrdersByID,
    updateOrder,
} = require("../controller/orderController");

// 1. Get all orders
// @desc: Get all orders
// @route: GET /api/orders
// @access: Private/admin
router.get("/", getAllOrders);

// 2. Get my orders
// @desc: Get my orders
// @route: GET /api/orders/myorders
// @access: Private
router.get("/myorders", protect, getMyOrders);

// 3. Get order by id
// @desc: Get order by id
// @route: GET /api/orders/:id
// @access: Private
router.get("/:id", protect, getOrdersByID);

// 4. Create new order
// @desc: Create new order
// @route: POST /api/orders
// @access: Private
router.post("/", protect, createOrder);

// 5. Update Order To Paid (cập nhật order từ chưa thanh toán -> đã thanh toán)
// @desc: Update Order To Paid
// @route: PUT /api/orders/:id/pay
// @access: Private/admin (cân nhắc chỉ Private đối với tích hợp thanh toán online)
router.put("/:id/pay", protect, isAdmin, updateOrder);

module.exports = router;
