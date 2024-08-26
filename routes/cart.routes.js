const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart/cart.controller");
const authenticateToken = require("../utility/middle-ware");
const { validateAddToCart } = require("../validation/cart.validation");

router.get("/list", authenticateToken, cartController.getCartByUserId);

router.post(
    "/add",
    authenticateToken,
    validateAddToCart,
    cartController.addToCart
);
router.delete("/remove", authenticateToken, cartController.removeFromCart);

module.exports = router;
