const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.resolve(__dirname, "../../config/development.env"),
});

const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid

        /* Attach user information to the request object */
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;
