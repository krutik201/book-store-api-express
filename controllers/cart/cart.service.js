const { Cart, CartItem, Book } = require("../../models");
const { NotFoundException } = require("../../utility/custom-error");
const authService = require("../auth/auth.service");

class CartService {
    /**
     * [@Description: This function for find cart items]
     * @param { userId }- to add cart details
     * @author: Krutik Shukla
     **/
    async getCartByUserId(userId) {
        try {
            /* Authenticate user */
            await authService.findUserById(userId);

            const dbCart = await Cart.findOne({
                where: { userId: userId, isOrdered: false },
                include: [
                    {
                        model: CartItem,
                        as: "items",
                        include: [
                            {
                                model: Book,
                                as: "book",
                                attributes: [
                                    "id",
                                    "title",
                                    "author",
                                    "price",
                                    "stock",
                                    "genre",
                                    "language",
                                ],
                            },
                        ],
                        attributes: [
                            "id",
                            "quantity",
                            "createdAt",
                            "updatedAt",
                        ],
                    },
                ],
                attributes: [
                    "id",
                    "isOrdered",
                    "isDeleted",
                    "userId",
                    "createdAt",
                    "updatedAt",
                ],
            });

            if (!dbCart) {
                throw new NotFoundException("Cart not found");
            }

            return this.formatCartResponse(dbCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function used for find or create cart]
     * @param userId - UserId to check cart details
     * @author: Krutik Shukla
     **/
    async findOrCreateCart(userId) {
        try {
            let cart = await Cart.findOne({
                where: { userId, isOrdered: false, isDeleted: false },
            });

            if (!cart) {
                cart = await Cart.create({ userId });
            }

            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for add cart items]
     * @param { userId ,addToCartDto}- to add cart details
     * @author: Krutik Shukla
     **/
    async addCartItem(cartId, bookId, quantity) {
        try {
            let cartItem = await CartItem.findOne({
                where: { cartId, bookId },
            });

            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                cartItem = await CartItem.create({ cartId, bookId, quantity });
            }

            return cartItem;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for remove cart details]
     * @param { userId ,bookId}- to add cart details
     * @author: Krutik Shukla
     **/
    async removeCartItem(cartId, bookId) {
        try {
            const cartItem = await CartItem.findOne({
                where: { cartId, bookId },
            });

            if (cartItem) {
                await CartItem.destroy({
                    where: { cartId, bookId },
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for find cart items]
     * @param {cartId, userId }- to add cart details
     * @author: Krutik Shukla
     **/
    async findCartById(cartId, userId) {
        try {
            /* Authenticate user */
            await authService.findUserById(userId);

            const dbCart = await Cart.findOne({
                where: { id: cartId, userId: userId, isOrdered: false },
                include: [
                    {
                        model: CartItem,
                        as: "items",
                        include: [
                            {
                                model: Book,
                                as: "book",
                                attributes: [
                                    "id",
                                    "title",
                                    "author",
                                    "price",
                                    "stock",
                                    "genre",
                                    "language",
                                ],
                            },
                        ],
                        attributes: [
                            "id",
                            "quantity",
                            "createdAt",
                            "updatedAt",
                        ],
                    },
                ],
                attributes: [
                    "id",
                    "isOrdered",
                    "isDeleted",
                    "userId",
                    "createdAt",
                    "updatedAt",
                ],
            });

            if (!dbCart) {
                throw new NotFoundException("Cart not found");
            }

            return dbCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * [@Description: This function for formatting response data]
     * @param {cartId, userId }- to add cart details
     * @author: Krutik Shukla
     **/
    formatCartResponse(cart) {
        return {
            id: cart.id,
            isOrdered: cart.isOrdered,
            isDeleted: cart.isDeleted,
            createdAt: cart.createdAt ? cart.createdAt.toISOString() : null,
            updatedAt: cart.updatedAt ? cart.updatedAt.toISOString() : null,
            items: cart.items
                ? cart.items.map((item) => ({
                      id: item.id,
                      quantity: item.quantity,
                      book: item.book
                          ? {
                                id: item.book.id,
                                title: item.book.title,
                                author: item.book.author,
                                price: item.book.price,
                            }
                          : null,
                  }))
                : [], // Return an empty array if no items are present
        };
    }
}

module.exports = new CartService();
