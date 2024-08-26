const authService = require("./auth.service");

class AuthController {
    /**
     * Handle user registration
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<void>}
     */
    async register(req, res, next) {
        try {
            const user = await authService.registerUser(req.body); // Call the service to register the user
            res.status(201).json({
                message: "User successfully registered",
                data: user,
            });
        } catch (error) {
            /* Pass the error to the global error handler */
            next(error);
        }
    }

    /**
     * Handle user login
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<void>}
     */
    async login(req, res, next) {
        try {
            const { user, token } = await authService.login(
                req.body
            ); /* Call the service to log in the user */
            res.status(200).json({
                message: "Login successful",
                data: { user, token },
            });
        } catch (error) {
            next(error); /* Pass the error to the global error handler */
        }
    }
}

module.exports = new AuthController();
