"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app/app");
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.app.listen(PORT, () => console.log(`Library API running on http://localhost:${PORT}`));
};
start();
