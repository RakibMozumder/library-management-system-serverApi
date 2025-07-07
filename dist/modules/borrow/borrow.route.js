"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
exports.borrowRouter = (0, express_1.Router)();
exports.borrowRouter.post('/', borrow_controller_1.borrowBook);
exports.borrowRouter.get('/summary', borrow_controller_1.borrowSummary);
