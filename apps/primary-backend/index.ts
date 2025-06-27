import { prismaClient } from "db/client";
import express from "express";
import cors from "cors";
import { authMiddleware } from "./middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/project", authMiddleware, async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId! as string;
  // Feature: Add better name to project
  const project = await prismaClient.project.create({
    data: {
      description: prompt,
      userId,
    },
  });
  res.json({ projectId: project.id });
});
app.get("/projects", authMiddleware, async (req, res) => {
  const userId = req.userId! as string;
  const project = await prismaClient.project.findFirst({
    where: { userId },
  });
  res.json(project);
});

app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
