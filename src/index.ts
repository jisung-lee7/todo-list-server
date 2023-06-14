import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

const PORT: number = 8080;

app.get("/api/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.json(allTodos);
  } catch (error) {
    return res.json({ type: 'ERROR', error });
  }
});

app.post("/api/todos", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
      },
    });
    return res.json(newTodo);
  } catch (error) {
    return res.json({ type: 'ERROR', error });
  }
});

app.put("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed, archived } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(archived !== undefined && { archived }),
      },
    });
    return res.json(updatedTodo);
  } catch (error) {
    return res.json({ type: 'ERROR', error });
  }
});

app.delete("/api/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return res.json(deletedTodo);
  } catch (error) {
    return res.json({ type: 'ERROR', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
