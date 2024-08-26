const { check, validationResult } = require("express-validator");

/* User registration validation */
const validateUserRegistration = [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("phoneNumber")
        .optional()
        .isMobilePhone()
        .withMessage("Please enter a valid phone number"),
    check("address")
        .optional()
        .isString()
        .withMessage("Address must be a string"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/* User login validation */
const validateLogin = [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
        .isString()
        .isLength({ min: 6, max: 20 })
        .withMessage("Password must be between 6 and 20 characters long"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUserRegistration, validateLogin };
