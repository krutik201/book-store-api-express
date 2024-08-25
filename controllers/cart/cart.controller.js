const cartService = require("./cart.service"); // Adjust the path as necessary

class CartController {
    async getCartByUserId(req, res) {
        try {
            const userId = req.user.id;
            const cart = await cartService.getCartByUserId(userId);

            res.json({ message: "Cart fetched successfully", data: cart });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addToCart(req, res) {
        try {
            const userId = req.user.id;
            const { bookId, quantity } = req.body;

            let cart = await cartService.findOrCreateCart(userId);
            const cartItem = await cartService.addCartItem(
                cart.id,
                bookId,
                quantity
            );

            res.json({
                message: "Item added to cart successfully",
                data: cartItem,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async removeFromCart(req, res) {
        try {
            const userId = req.user.id;
            const { bookId } = req.body;

            const cart = await cartService.getCartByUserId(userId);
            await cartService.removeCartItem(2, bookId);

            res.json({ message: "Item removed from cart successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new CartController();
