const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order/order.controller"); // Adjust the path as necessary
const authenticateToken = require("../utility/middle-ware"); // Adjust the path as necessary

/* Route to place an order */
router.post("/add", authenticateToken, orderController.placeOrder);

/* Route to get order history */
router.get("", authenticateToken, orderController.getOrderHistory);

/* Route to get order details by orderId */
router.get("/:orderId", authenticateToken, orderController.getOrderDetails);

module.exports = router;
