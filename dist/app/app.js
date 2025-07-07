"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("../middlewares/errorHandler");
const book_route_1 = require("../modules/books/book.route");
const borrow_route_1 = require("../modules/borrow/borrow.route");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: ["https://library-management-system-client-ap.vercel.app"],
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use("/api/v1/books", book_route_1.bookRouter);
exports.app.use("/api/v1/borrows", borrow_route_1.borrowRouter);
exports.app.use(errorHandler_1.notFound);
exports.app.use(errorHandler_1.errorHandler);
