const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller');

// Define your routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
