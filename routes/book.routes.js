const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book/book.controller");

/* Route to get a paginated list of books */
router.get("/list", (req, res, next) =>
    bookController.getBookList(req, res, next)
);

/* Route to get details of a specific book by ID */
router.get("/:bookId", (req, res, next) =>
    bookController.getBookById(req, res, next)
);

module.exports = router;
