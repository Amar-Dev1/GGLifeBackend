import { TokenPayload } from "../types/auth.types";
import { PrismaClient } from "@prisma/client";
import { SafeTask } from "../types/task.types";

const prisma = new PrismaClient();

export const listtasks = async (token: TokenPayload, weekId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: token.id, weekId: weekId },
    });
    return tasks;
  } catch (err) {
    console.log("error during fetching tasks:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const getSingletask = async (
  token: TokenPayload,
  weekId: string,
  taskId: string
) => {
  try {
    const task = await prisma.task.findFirst({
      where: { userId: token.id, weekId: weekId, task_id: taskId },
    });

    if (!task) {
      throw new Error("task not found");
    }

    return task;
  } catch (err) {
    console.log("error during fetching a task:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const updatetask = async (
  token: TokenPayload,
  weekId: string,
  taskId: string,
  data: SafeTask
) => {
  try {
    const trulyCompleted = data.score === 100;

    // 1.check if task exists
    const task = await prisma.task.findUnique({
      where: { task_id: taskId, weekId: weekId },
    });
    if (!task) throw new Error("task not found");

    // 2. update the user data
    const updatedtask = await prisma.task.update({
      data: {
        ...data,
        completed: trulyCompleted,
      },
      where: {
        userId: token.id,
        weekId: weekId,
        task_id: taskId,
      },
    });

    return updatedtask;
  } catch (err) {
    console.log("error during user updating a task :", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const deletetask = async (
  token: TokenPayload,
  weekId: string,
  taskId: string
) => {
  try {
    // 1.check if task exists
    const task = await prisma.task.findUnique({
      where: { userId: token.id, weekId: weekId, task_id: taskId },
    });
    if (!task) throw new Error("task not found");

    await prisma.task.delete({
      where: { userId: token.id, weekId: weekId, task_id: taskId },
    });
    return;
  } catch (err) {
    console.log("error during task delete:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const deletetasks = async (token: TokenPayload, weekId: string) => {
  try {
    await prisma.task.deleteMany({
      where: { userId: token.id, weekId: weekId },
    });
    return;
  } catch (err) {
    console.log("error during deleting tasks:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};
