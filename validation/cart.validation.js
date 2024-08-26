// middleware/cart.validation.js
const { check, validationResult } = require("express-validator");

const validateAddToCart = [
    check("bookId")
        .isInt({ min: 1 })
        .withMessage("Please provide a valid book ID."),
    check("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateAddToCart };
