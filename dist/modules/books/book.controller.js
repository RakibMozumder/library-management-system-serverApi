"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.getBooks = void 0;
const book_model_1 = require("./book.model");
const getBooks = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search
        ? { title: { $regex: search, $options: "i" } }
        : {};
    const books = await book_model_1.Book.find(query)
        .skip((+page - 1) * +limit)
        .limit(+limit);
    const total = await book_model_1.Book.countDocuments(query);
    res.json({ data: books, total, page: +page, limit: +limit });
};
exports.getBooks = getBooks;
const getBook = async (req, res) => {
    const book = await book_model_1.Book.findById(req.params.id);
    if (!book)
        throw { statusCode: 404, message: "Book not found" };
    res.json(book);
};
exports.getBook = getBook;
const createBook = async (req, res) => {
    const book = await book_model_1.Book.create(req.body);
    res.status(201).json(book);
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    const book = await book_model_1.Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!book)
        throw { statusCode: 404, message: "Book not found" };
    res.json(book);
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    const book = await book_model_1.Book.findByIdAndDelete(req.params.id);
    if (!book)
        throw { statusCode: 404, message: "Book not found" };
    res.status(204).send();
};
exports.deleteBook = deleteBook;
