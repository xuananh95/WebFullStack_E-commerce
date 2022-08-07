var express = require("express");
var router = express.Router();
const { addProduct } = require("../controller/productController");

// register user
router.post("/", addProduct);

module.exports = router;
