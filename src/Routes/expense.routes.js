import express from "express";

import { getExpenses, deleteExpense, updateExpense, addExpense } from "../Controllers/expense.controller.js";

const router = express.Router();

// routes to create update delete and fetch  expense 

router.route("/create")
    .post(addExpense); 


router.route("/read")
    .get( getExpenses); 

router.route("/delete/:id")
    .delete(deleteExpense); 


router.route("/update/:id")
    .put(updateExpense); 

export default router;
