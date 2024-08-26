const { Order, OrderItem, Cart, Book } = require("../../models");
const {
    NotFoundException,
    ConflictException,
} = require("../../utility/custom-error");
const cartService = require("../cart/cart.service");
const bookService = require("../book/book.service");
const authService = require("../auth/auth.service");

class OrderService {
    /**
     * [@Description: This function for placing order checking stock from the book repository]
     * @param { userId ,addToCartDto}- to add cart details
     * @author: Krutik Shukla
     **/
    async createOrder(createOrderDto, userId) {
        try {
            const { cartId } = createOrderDto;

            /* Authenticate user */
            await authService.findUserById(userId);

            /* Fetch the cart items */
            const cart = await cartService.findCartById(cartId, userId);

            let totalAmount = 0;

            /* Validate stock and calculate total amount */
            for (const item of cart.items) {
                const book = item.book;
                if (book.stock < item.quantity) {
                    throw new ConflictException("Out of stock");
                }
                /* updated Book Stock*/
                await bookService.updateBookStock(item.book.id, item.quantity);

                /* calculate total price  */
                totalAmount += item.quantity * book.price;
            }

            /* Create the order */
            const order = await Order.create({
                userId: userId,
                totalAmount: totalAmount,
                status: "pending",
            });

            /* Create order items */
            const orderItemsData = cart.items.map((item) => ({
                orderId: order.id,
                bookId: item.book.id,
                quantity: item.quantity,
                perItemPrice: item.book.price,
            }));

            await OrderItem.bulkCreate(orderItemsData);

            /* Mark the cart as ordered */
            await Cart.update({ isOrdered: true }, { where: { id: cartId } });

            return {
                message: "Order placed successfully",
                data: order,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for getting the order History]
     * @param { userId}- to add check order details
     * @author: Krutik Shukla
     **/
    async getOrderHistory(userId) {
        try {
            /* Authenticate user */
            await authService.findUserById(userId);

            const ordersList = await Order.findAll({
                where: { userId: userId },
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        include: [
                            {
                                model: Book,
                                as: "book", // Correct alias
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            if (!ordersList.length) {
                throw new NotFoundException("No orders found");
            }

            const formattedResponse = this.formatResponse(ordersList);

            return {
                message: "Order history retrieved successfully",
                data: formattedResponse,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for placing for getting orders details]
     * @param { userId, orderId}- to add order details
     * @author: Krutik Shukla
     **/
    async getOrderDetails(userId, orderId) {
        try {
            /* Authenticate user */
            await authService.findUserById(userId);

            const order = await Order.findOne({
                where: { id: orderId, userId: userId },
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        include: [
                            {
                                model: Book,
                                as: "book",
                            },
                        ],
                    },
                ],
            });

            if (!order) {
                throw new NotFoundException("Order not found");
            }

            const formattedResponse = this.formatResponse(order, true);

            return {
                message: "Order details retrieved successfully",
                data: formattedResponse,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for getting orders details by ID]
     * @param { userId, orderId}- to add order details
     * @author: Krutik Shukla
     **/
    async getCartById(cartId, userId) {
        try {
            /* Authenticate user */
            await authService.findUserById(userId);

            return await Cart.findOne({
                where: { id: cartId, userId: userId, isOrdered: false },
                include: [
                    {
                        model: OrderItem,
                        as: "items",
                        include: [
                            {
                                model: Book,
                                as: "book",
                            },
                        ],
                    },
                ],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    /* Separate function for formatting the response */
    formatResponse(response, isSingleOrder = false) {
        const formatOrder = (order) => ({
            id: order.id,
            totalAmount: order.totalAmount,
            status: order.status,
            orderDate: order.createdAt,
            items: order.items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                perItemPrice: item.price,
                bookId: item.book.id,
                title: item.book.title,
                author: item.book.author,
                price: item.book.price,
            })),
        });

        return isSingleOrder
            ? formatOrder(response)
            : response.map(formatOrder);
    }
}

module.exports = new OrderService();
