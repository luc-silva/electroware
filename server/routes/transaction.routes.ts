import { Router } from "express";

import {
    createProductTransaction,
    getUserTransactions,
} from "../controllers/transactionController";
import { protectedRoute } from "../middleware/auth";

export const transactionRouter = Router();

transactionRouter.post("/", protectedRoute, createProductTransaction);
