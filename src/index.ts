import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: number = 8080;

app.get("/api/todos", async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const allTodos = await prisma.todo.findMany();
    return res.json({
      success: true,
      data: allTodos,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.post("/api/todos", async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { title, description } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
      },
    });
    return res.json({
      success: true,
      data: newTodo,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.put("/api/todos/:id", async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { id } = req.params;
    const { title, description, completed, archived } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(completed && { completed }),
        ...(archived && { archived }),
      },
    });
    return res.json({
      success: true,
      data: updatedTodo,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "*");

  try {
    const { id } = req.params;
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return res.json({
      success: true,
      data: deletedTodo,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
