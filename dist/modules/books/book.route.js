"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
exports.bookRouter = (0, express_1.Router)();
exports.bookRouter.route("/").get(book_controller_1.getBooks).post(book_controller_1.createBook);
exports.bookRouter.route("/:id").get(book_controller_1.getBook).patch(book_controller_1.updateBook).delete(book_controller_1.deleteBook);
