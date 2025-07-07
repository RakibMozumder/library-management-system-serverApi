"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const notFound = (_req, res, _next) => {
    res.status(404).json({ success: false, message: "Route not found" });
};
exports.notFound = notFound;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};
exports.errorHandler = errorHandler;
