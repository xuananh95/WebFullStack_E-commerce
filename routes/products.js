var express = require("express");
var router = express.Router();
const { isAdmin, protect } = require("../middleware/authMiddleware");

const {
    getProduct,
    getProductByID,
    deleteProduct,
    addProduct,
    updateProduct,
    AddReviewToProduct,
} = require("../controller/productController");

// 1
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get("/", getProduct);

// 2
// @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public
router.get("/:id", getProductByID);

// 3
// @desc: Delete product by ID
// @route: DELETE /api/products/:id
// @access: Private/admin
router.delete("/:id", protect, isAdmin, deleteProduct);

// 4. Create product
// @desc: Create product
// @route: POST /api/products
// @access: Private/admin
router.post("/", protect, isAdmin, addProduct);

// 5. Update a product
// @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private/admin
router.put("/:id", protect, isAdmin, updateProduct);

// 6. Create new review for product
// @desc: Create new review for product
// @route: POST /api/products/:id/reviews
// @access: Private
router.post("/:id/reviews", protect, AddReviewToProduct);

module.exports = router;
