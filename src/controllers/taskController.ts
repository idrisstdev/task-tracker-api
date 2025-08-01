import { taskSchema } from "../schemas/taskSchema";
import Task from "../models/taskModel";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

let tasks: Task[] = [
  {
    id: uuidv4(),
    title: "Sortir les poubelles",
    description: "Titre assez explicite",
    completed: false,
  },
];

export function getTasks(req: Request, res: Response) {
  res.json(tasks);
}
export const createTask = (req: Request, res: Response) => {
  const parseResult = taskSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error.message });
  }

  const taskData = parseResult.data;

  tasks.push({
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description,
    completed: false,
  });
  res.send(`La tâche ${taskData.title} a bien été ajouté`);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  const parseResult = taskSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error.message });
  }
  task.title = parseResult.data.title;
  task.description = parseResult.data.description;
  task.completed = parseResult.data.completed;
  res.json(task);
};
export const deleteTask = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  tasks = tasks.filter((t) => t.id !== task.id);
  res.json({ message: "Tâche supprimé" });
};
