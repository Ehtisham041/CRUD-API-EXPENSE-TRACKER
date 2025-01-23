import mongoose from "mongoose";

import { Schema } from "mongoose";

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ["Food", "Transport", "Rent", "Shopping", "Utilities", "Other"], // Predefined categories
    default: "Other",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Linking with User model
    required: true,
  },
}, {
  timestamps: true,
});

export const Expense = mongoose.model("Expense", expenseSchema);
