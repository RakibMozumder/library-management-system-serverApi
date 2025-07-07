import cors from "cors";
import express, { Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>Library Management System API</h1>
    <p>Welcome! This API is built with Express, TypeScript, and MongoDB.</p>
    <ul>
      <li><code>POST  /api/v1/books</code>   — Create a Book</li>
      <li><code>GET   /api/v1/books</code>   — Get All Books</li>
      <li><code>GET   /api/v1/books/:id</code> — Get Book by ID</li>
      <li><code>PATCH /api/v1/books/:id</code> — Update Book</li>
      <li><code>DELETE /api/v1/books/:id</code> — Delete Book</li>
      <li><code>POST  /api/v1/borrows</code> — Borrow a Book</li>
      <li><code>GET   /api/v1/borrows/summary</code> — Borrow Summary</li>
    </ul>
  `);
});

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrows", borrowRouter);

app.use(notFound);
app.use(errorHandler);
