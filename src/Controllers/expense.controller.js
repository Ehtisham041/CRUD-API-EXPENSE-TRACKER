import { Expense } from "../Models/expense.model.js";  
import { ApiError } from "../Utils/ApiError.js";       
import { asyncHandler } from "../Utils/asyncHandler.js";


// Controller for adding a new expense
export const addExpense = asyncHandler(async (req, res) =>
 {
    const { title, amount, category, date } = req.body;

    // Validation for required fields
    if (!title || !amount || !category || !date) {
        throw new ApiError(400, "All fields (title, amount, category, date) are required");
    }
    //till not using a authentication using a already created user

    const userId = '679270dec124b2eb6695cbf8';
    // Create a new expense
    const newExpense = new Expense({
        title,
        amount,
        category,
        date,
        user: userId,//for nowon using a dummy user that is already created 
    });

    // Save the expense to the database
    await newExpense.save();
    
    // Return success response
    return res.status(201).json({
        success: true,
        message: "Expense added successfully",
        data: newExpense,
    });
});

// Controller to get all expenses for the authenticated user
export const getExpenses = asyncHandler(async (req, res) => {
    const userId = '679270dec124b2eb6695cbf8';
    const expenses = await Expense.find({ user: userId });

    if (!expenses.length) {
        throw new ApiError(404, "No expenses found for this user");
    }

    return res.status(200).json({
        success: true,
        data: expenses,
    });
});

// Controller to update an existing expense
export const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get expense ID from route parameter
    const { title, amount, category, date } = req.body;

    // Find the expense by ID
    const expense = await Expense.findById(id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }
    // const userId = '679270dec124b2eb6695cbf8';//DUMMY AGAIN
    // // Ensure that the expense belongs to the logged-in user
    // if (expense.user.toString() !== req.userId.toString()) {
    //     throw new ApiError(403, "You are not authorized to update this expense");
    // }

    // Update the expense with new values
    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    // Save the updated expense
    await expense.save();

    return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        data: expense,
    });
});

// Controller to delete an expense
export const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get expense ID from route parameter
   // const userId = '679270dec124b2eb6695cbf8';
    // Find the expense by ID
    const expense = await Expense.findById(id);

    if (!expense) {
        throw new ApiError(404, "Expense not found");
    }

    // // Ensure that the expense belongs to the logged-in user
    // if (expense.user.toString() !== req.userId.toString()) {
    //     throw new ApiError(403, "You are not authorized to delete this expense");
    // }

    // Delete the expense from the database
    await Expense.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "Expense deleted successfully",
    });
});
