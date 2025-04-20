// server.js
import express from "express";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

let tasks = [];

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description: description || tasks[taskIndex].description,
  };

  res.status(200).json(tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
