"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowSummary = exports.borrowBook = void 0;
const book_model_1 = require("../books/book.model");
const borrow_model_1 = require("./borrow.model");
const borrowBook = async (req, res) => {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await book_model_1.Book.findById(bookId);
    if (!book)
        throw { statusCode: 404, message: "Book not found" };
    if (quantity > book.copies)
        throw { statusCode: 400, message: "Not enough copies available" };
    book.copies -= quantity;
    await book.save();
    const borrow = await borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json(borrow);
};
exports.borrowBook = borrowBook;
const borrowSummary = async (_, res) => {
    const summary = await borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo",
            },
        },
        { $unwind: "$bookInfo" },
        {
            $project: {
                _id: 0,
                title: "$bookInfo.title",
                isbn: "$bookInfo.isbn",
                totalQuantity: 1,
            },
        },
    ]);
    res.json(summary);
};
exports.borrowSummary = borrowSummary;
