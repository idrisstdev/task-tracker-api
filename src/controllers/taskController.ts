import { taskSchema, taskUpdateSchema } from "../schemas/taskSchema";
import { TaskModel } from "../models/taskModel";
import Task from "../types/taskType";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

let tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Sortir les poubelles",
    description: "Titre assez explicite",
    completed: false,
  },
];

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error });
  }
}
export const createTask = async (req: Request, res: Response) => {
  const parseResult = taskSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error.message });
  }

  try {
    const task = new TaskModel(parseResult.data);
    await task.save();
    res.send(`La tâche ${task.title} a bien été ajouté`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }
    const task = await TaskModel.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const parseResult = taskUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: parseResult.error.message });
    }
    const taskId = new mongoose.Types.ObjectId(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res
        .status(400)
        .json({ message: "Le format de l'id de la tâche est invalide" });
    }
    const taskUpdated = await TaskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(taskUpdated);
    if (!taskUpdated)
      return res.status(404).json({ message: "Task not found" });
    res.json(taskUpdated);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskDeleted = await TaskModel.findByIdAndDelete(req.params.id);
    if (!taskDeleted)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Tâche supprimé" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
