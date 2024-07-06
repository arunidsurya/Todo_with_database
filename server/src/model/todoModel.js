import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const todoModel = mongoose.model("todo", todoListSchema);
