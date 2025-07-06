import { NextFunction, Request, Response } from "express";

export const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
