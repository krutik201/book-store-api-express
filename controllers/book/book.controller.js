const bookService = require("./book.service"); // Import the book service

class BookController {
    /**
     * [@Description: Retrieves a paginated list of books from the database based on the provided filters.]
     * @param {Request} req - The request object containing pagination, sorting, and search filters.
     * @param {Response} res - The response object used to send the response.
     * @param {Function} next - The next middleware function.
     **/
    async getBookList(req, res, next) {
        try {
            const dbBooks = await bookService.getBookList(req.query); // Call the service to get the list of books
            res.status(200).json({
                message: "Books retrieved successfully",
                data: dbBooks,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    /**
     * [@Description: Retrieves the details of a specific book by its ID.]
     * @param {Request} req - The request object containing the book ID in the parameters.
     * @param {Response} res - The response object used to send the response.
     * @param {Function} next - The next middleware function.
     **/
    async getBookById(req, res, next) {
        try {
            const book = await bookService.getBookById(req.params.bookId); // Call the service to get the book by ID
            res.status(200).json({
                message: "Book retrieved successfully",
                data: book,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }
}

module.exports = new BookController();
