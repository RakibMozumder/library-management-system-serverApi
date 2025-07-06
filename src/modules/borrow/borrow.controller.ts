import { Request, Response } from "express";
import { Book } from "../books/book.model";
import { Borrow } from "./borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;

  const book = await Book.findById(bookId);
  if (!book) throw { statusCode: 404, message: "Book not found" };
  if (quantity > book.copies)
    throw { statusCode: 400, message: "Not enough copies available" };

  book.copies -= quantity;
  await book.save();

  const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
  res.status(201).json(borrow);
};

export const borrowSummary = async (_: Request, res: Response) => {
  const summary = await Borrow.aggregate([
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
