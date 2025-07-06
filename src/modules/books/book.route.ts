import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "./book.controller";

export const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);
