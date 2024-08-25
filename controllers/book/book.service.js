const { Op } = require("sequelize");
const { NotFoundException } = require("../../utility/custom-error");
const { Book } = require("../../models");

class BookService {
    /**
     * Retrieves a paginated list of books based on filters.
     * @param {Object} filterDto - Contains pagination, sorting, and search filters.
     * @returns {Object} - The list of books and pagination info.
     */
    async getBookList(filterDto) {
        try {
            const {
                offset = 0 /* temp for testing made to the offset to 0 */,
                limit = 10 /* limit made 10 as of now*/,
                orderBy = "createdAt",
                orderDir = "DESC",
                search = "",
            } = filterDto;

            const where = search
                ? {
                      [Op.or]: [
                          { title: { [Op.iLike]: `%${search}%` } },
                          { author: { [Op.iLike]: `%${search}%` } },
                          { description: { [Op.iLike]: `%${search}%` } },
                      ],
                  }
                : {};

            const dbBooks = await Book.findAndCountAll({
                where,
                order: [[orderBy, orderDir]],
                offset: parseInt(offset) * parseInt(limit),
                limit: parseInt(limit),
            });

            return {
                bookData: dbBooks.rows,
                count: dbBooks.count,
                page: filterDto,
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a specific book by its ID.
     * @param {number} id - The ID of the book to be retrieved.
     * @returns {Object} - The book object.
     * @throws {NotFoundException} - If the book is not found.
     */
    async getBookById(id) {
        try {
            const book = await Book.findOne({
                where: { id: id, isActive: true, isDeleted: false },
            });

            if (!book) {
                throw new NotFoundException("ERR_BOOK_NOT_FOUND");
            }

            return book;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new book entry.
     * @param {Object} createBookDto - Data for creating the book.
     * @returns {Object} - The created book object.
     */
    async createBook(createBookDto) {
        try {
            return await Book.create(createBookDto);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates an existing book by its ID.
     * @param {number} id - The ID of the book to be updated.
     * @param {Object} updateBookDto - Data to update the book.
     * @returns {Object} - The updated book object.
     * @throws {NotFoundException} - If the book is not found.
     */
    async updateBook(id, updateBookDto) {
        try {
            const book = await this.getBookById(id);
            return await Book.update(updateBookDto);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Soft deletes a book by marking it as deleted.
     * @param {number} id - The ID of the book to be deleted.
     * @returns {Object} - The updated book object.
     * @throws {NotFoundException} - If the book is not found.
     */
    async deleteBook(id) {
        try {
            await this.getBookById(id);
            return await Book.update({ isDeleted: true });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the stock of a book.
     * @param {number} bookId - The ID of the book to update.
     * @param {number} quantity - The quantity to subtract from stock.
     * @returns {Object} - The updated book object.
     * @throws {NotFoundException} - If the book is not found.
     */
    async updateBookStock(bookId, quantity) {
        try {
            const book = await this.getBookById(bookId);
            book.stock -= quantity;
            return await book.save();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BookService();
