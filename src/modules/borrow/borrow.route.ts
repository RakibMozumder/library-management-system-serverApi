import { Router } from 'express';
import { borrowBook, borrowSummary } from './borrow.controller';

export const borrowRouter = Router();

borrowRouter.post('/', borrowBook);
borrowRouter.get('/summary', borrowSummary);
