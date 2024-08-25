// controllers/orderController.js

const orderService = require("./order.service");

class OrderController {
    async placeOrder(req, res) {
        try {
            const userId = req.user.id;
            const createOrderDto = req.body;

            const result = await orderService.createOrder(
                createOrderDto,
                userId
            );

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getOrderHistory(req, res) {
        try {
            const userId = req.user.id;
            const result = await orderService.getOrderHistory(userId);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getOrderDetails(req, res) {
        try {
            const userId = req.user.id;
            const orderId = req.params.orderId;
            const result = await orderService.getOrderDetails(userId, orderId);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            if (error.message === "Order not found") {
                res.status(404).json({ message: "Order not found" });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }
}

module.exports = new OrderController();
