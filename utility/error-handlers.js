// middlewares/errorHandler.js
const {
    ConflictException,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
} = require("../utility/custom-error");

function errorHandler(err, req, res, next) {
    console.error(err); // Log the error details for debugging

    if (err instanceof ConflictException) {
        return res
            .status(err.statusCode)
            .json({ message: err.message || "Not Acceptable." });
    } else if (err instanceof NotFoundException) {
        return res
            .status(err.statusCode)
            .json({ message: err.message || "Data not found." });
    } else if (err instanceof UnauthorizedException) {
        return res
            .status(err.statusCode)
            .json({ message: err.message || "Unauthorized." });
    } else if (err instanceof InternalServerErrorException) {
        return res
            .status(err.statusCode)
            .json({ message: err.message || "Internal Server Error." });
    }

    // Handle other errors
    res.status(500).json({
        message: err.message || "An unexpected error occurred.",
    });
}

module.exports = errorHandler;
