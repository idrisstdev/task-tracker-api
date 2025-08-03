import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false, default: null },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("Task", taskSchema);
