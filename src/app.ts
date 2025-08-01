import express, { Request, Response } from "express";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(errorHandler);
app.use("/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API Task Tracker is running");
});

export default app;
