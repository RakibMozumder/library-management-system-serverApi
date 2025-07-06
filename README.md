# Library Management System Server API

This is the **backend (REST API)** for the Library Management System. It is built with:

- **Node.js 18** + **Express**
- **TypeScript**
- **MongoDB Atlas** via **Mongoose 8**
- Structured using a lightweight **Modular / MVC** pattern

The API powers the React + RTK Query frontend, providing endpoints for book management and borrowing operations.

---

## Features

- **Book CRUD** – create, read, update, delete
- **Borrow Endpoint** – borrow copies & auto‑decrement stock
- **Borrow Summary** – MongoDB aggregation per ISBN
- **Global Error Handler** – consistent JSON errors
- **Optimistic Concurrency** – `copies` and `available` kept in sync
- **Environment‑based config** – seamless local ↔ production

---

## Project Structure

```
backend/
├── src/
│   ├── app/                 # Express app + middlewares
│   ├── config/              # DB connection
│   ├── modules/
│   │   ├── books/           # book.model.ts, book.controller.ts, book.route.ts
│   │   └── borrow/          # borrow.model.ts, borrow.controller.ts, borrow.route.ts
│   ├── middlewares/         # errorHandler.ts, notFound.ts
│   └── server.ts            # bootstrap & start
├── tsconfig.json
├── package.json
└── README-backend.md        # you are here
```

---

## Setup & Development

### Prerequisites

- Node.js ≥ **18**
- MongoDB Atlas URI (or local mongod)

### 1  Install deps

```bash
cd backend
npm install
```

### 2  Create `.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net
DB_NAME=libraryDB
```

### 3  Start in dev mode

```bash
npm run dev   # ts-node-dev --respawn src/server.ts
```

API now live at [**http://localhost:5000/api/v1**](http://localhost:5000/api/v1)

### 4  Run TypeScript build

```bash
npm run build   # tsc -> dist/
```

### 5  Start compiled server

```bash
npm start        # node dist/server.js
```

---

## API Endpoints

| Method | Route              | Body / Query                             | Description       |
| ------ | ------------------ | ---------------------------------------- | ----------------- |
| GET    | `/books`           | `?page & limit`                          | List books        |
| POST   | `/books`           | `{ title, author, genre, isbn, copies }` | Add book          |
| GET    | `/books/:id`       | –                                        | Book by ID        |
| PATCH  | `/books/:id`       | partial fields                           | Update book       |
| DELETE | `/books/:id`       | –                                        | Delete book       |
| POST   | `/borrows`         | `{ book, quantity, dueDate }`            | Borrow copies     |
| GET    | `/borrows/summary` | –                                        | Aggregate summary |

---

## Scripts

| Script          | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Hot‑reload dev server (ts-node-dev) |
| `npm run build` | Compile TS to `/dist`               |
| `npm start`     | Run compiled server                 |
| `npm run lint`  | ESLint check                        |

---

## Deployment Guide (Render)

1. **Push backend folder to GitHub**.
2. Log into **Render** → New Web Service.
3. Select repo → **Root Directory = **``.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Environment Variables: add `PORT`, `MONGODB_URI`, `DB_NAME`.
7. Deploy. Render will give you a URL like: `https://library-backend.onrender.com`.

> **CORS** is enabled via `cors()` middleware to allow your Vercel frontend.

---

## Docker (optional)

```bash
# quick run
docker build -t library-api ./backend
docker run -p 5000:5000 -e MONGODB_URI=... library-api
```

---

## License

[MIT](../LICENSE)

---

## 👤 Author

**Rakib** – [RakibMozumder](https://github.com/RakibMozumder)
