import cors from "cors";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { errorHandler, notFound } from "../middlewares/errorHandler";
import { bookRouter } from "../modules/books/book.route";
import { borrowRouter } from "../modules/borrow/borrow.route";

export const app = express();

app.use(
  cors({
    origin: ["https://library-management-system-client-ap.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrows", borrowRouter);

app.use(notFound);
app.use(errorHandler);
