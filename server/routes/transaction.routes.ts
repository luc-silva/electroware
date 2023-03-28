import { Router } from "express";

const {
    createProductTransaction,
    getUserTransactions,
} = require("../controllers/transactionController");
const { protectedRoute } = require("../middleware/auth");

export const transactionRouter = Router();
transactionRouter.post("/", protectedRoute, createProductTransaction);
