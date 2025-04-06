import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all tasks for a user
export const getAllTasks = async (req: Request, res: Response) => {
  const { userId } = req.user.id;
  const { weekId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: userId, weekId: weekId },
      include: { week: true },
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while fetching tasks" });
  }
};

// get a specific task
export const getSpecificTask = async (req: Request, res: Response) => {
  const { userId } = req.user.id;
  const { weekId, taskId } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { userId: userId, weekId: weekId, task_id: taskId },
    });
    res.status(200).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the task" });
  }
};

// create a new task
// export const createtask = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { userId } = req.user.id;
//   const { weekId } = req.params;
//   const { title, score, completed } = req.body;
//   const trulyCompleted = score === 100 ? true : false;

//   try {
//     // Validate that the user exists
//     const userExists = await prisma.user.findUnique({
//       where: { user_id: userId },
//     });
//     if (!userExists) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     // Validate that the week exists and belongs to the user
//     const weekExists = await prisma.week.findFirst({
//       where: { week_id: weekId, userId: userId },
//     });
//     if (!weekExists) {
//       res
//         .status(404)
//         .json({ message: "Week not found or does not belong to the user" });
//       return;
//     }

//     // Create the task
//     const task = await prisma.task.create({
//       data: {
//         title,
//         score: score || 0, // Default score to 0 if not provided
//         userId,
//         weekId,
//         completed: trulyCompleted,
//       },
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "An error occurred while creating a task" });
//   }
// };

// update a task
export const updateTask = async (req: Request, res: Response) => {
  const { userId } = req.user.id;
  const { weekId, taskId } = req.params;
  const { title, score, completed } = req.body;
  const trulyCompleted = score === 100 ? true : false;

  try {
    const updatedTask = await prisma.task.update({
      where: { userId: userId, weekId: weekId, task_id: taskId },
      data: {
        title,
        score,
        completed: trulyCompleted,
      },
    });
    res.json(updatedTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the task" });
  }
};

//  delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { userId } = req.user.id;
  const { weekId, taskId } = req.params;
  try {
    await prisma.task.delete({ where: { userId, weekId, task_id: taskId } });
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the task" });
  }
};
