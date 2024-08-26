const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/auth.controller");
const {
    validateUserRegistration,
    validateLogin,
} = require("../validation/auth.validation");

/* Define your routes */
router.post("/register", validateUserRegistration, authController.register);
router.post("/login", validateLogin, authController.login);

module.exports = router;
