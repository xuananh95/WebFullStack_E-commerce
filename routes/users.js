var express = require("express");
var router = express.Router();
const {
    registerUser,
    authLogin,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserByID,
    updateUserByID,
} = require("../controller/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// 1. register user
// @desc: register a new user
// @route: POST /api/users
// @access: Public - return token
router.post("/", registerUser);

// 2.
// @desc user log in
// @route: POST /api/login
// @access: Public - return token
router.post("/login", authLogin);

// 3.
// @desc get user profile
// @route: GET /api/profile
// @access: Private - require token
router.get("/profile", protect, getUserProfile);

// 4.
// @desc update user profile
// @route: PUT /api/profile
// @access: Private
router.put("/profile", protect, updateUserProfile);

// 5.
// @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get("/", protect, isAdmin, getAllUsers);

// 6.
// @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete("/:id", protect, isAdmin, deleteUser);

// 7.
// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private/admin
router.get("/:id", protect, isAdmin, getUserByID);

// 8.
// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private/admin
router.put("/:id", protect, isAdmin, updateUserByID);

module.exports = router;
