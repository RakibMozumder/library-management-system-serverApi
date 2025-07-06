import { Request, Response } from "express";
import { Book } from "./book.model";

export const getBooks = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = "" } = req.query;
  const query = search
    ? { title: { $regex: search as string, $options: "i" } }
    : {};

  const books = await Book.find(query)
    .skip((+page - 1) * +limit)
    .limit(+limit);

  const total = await Book.countDocuments(query);
  res.json({ data: books, total, page: +page, limit: +limit });
};

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw { statusCode: 404, message: "Book not found" };
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) throw { statusCode: 404, message: "Book not found" };
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw { statusCode: 404, message: "Book not found" };
  res.status(204).send();
};
