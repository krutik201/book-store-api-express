const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart/cart.controller");
const authenticateToken = require("../utility/middle-ware");

router.get("/cart", authenticateToken, cartController.getCartByUserId);
router.post("/cart", authenticateToken, cartController.addToCart);
router.delete("/cart", authenticateToken, cartController.removeFromCart);

module.exports = router;
