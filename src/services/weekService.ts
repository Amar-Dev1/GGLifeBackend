import { TokenPayload } from "../types/auth.types";
import { PrismaClient } from "@prisma/client";
import { SafeWeek } from "../types/week.types";

const prisma = new PrismaClient();

export const createWeek = async (token: TokenPayload, data: SafeWeek) => {
  try {
    
    const trulyCompleted = data.score === 100;

    // 1. Create the week
    const week = await prisma.week.create({
      data: {
        title: data.title,
        score: data.score,
        completed: trulyCompleted,
        userId: token.id,
      },
    });

    // 2. Create tasks if provided
    if (data.tasks && data.tasks.length > 0) {
      const taskData = data.tasks.map((task) => ({
        title: task.title,
        score: task.score,
        weekId: week.week_id,
        userId: token.id,
        completed: task.completed,
      }));

      await prisma.task.createMany({
        data: taskData,
      });
    }

    return week;
  } catch (err) {
    console.error("Error during creating week:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const listWeeks = async (token: TokenPayload) => {
  try {
    const weeks = await prisma.week.findMany({
      where: { userId: token.id },
      include: { tasks: true },
    });
    return weeks;
  } catch (err) {
    console.log("error during fetching weeks:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const getSingleWeek = async (token: TokenPayload, weekId: string) => {
  try {
    const week = await prisma.week.findFirst({
      where: { userId: token.id, week_id: weekId },
      include: { tasks: true },
    });

    if (!week) {
      throw new Error("Week not found");
    }

    return week;
  } catch (err) {
    console.log("error during fetching a week:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const updateWeek = async (token: TokenPayload,weekId:string, data: SafeWeek) => {
  try {    

    
    const trulyCompleted = data.score === 100;

    // 1.check if week exists
    const week = await prisma.week.findFirst({
      where: {week_id: weekId, userId:token.id},
    });

    if (!week || week.userId !== token.id) {
      throw new Error("Week not found or you do not have access to it");
    }

    // 2. update the user data
    const updatedWeek = await prisma.week.update({
      data: {
        title: data.title,
        score: data.score,
        completed: trulyCompleted,
      },
      where: {
        userId: token.id,
        week_id: weekId,
      },
    });

    return updatedWeek;
  } catch (err) {
    console.log("error during user updating a week :", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const deleteWeek = async (token: TokenPayload, weekId: string) => {
  try {
    // 1.check if week exists
    const week = await prisma.week.findUnique({
      where: { userId: token.id, week_id: weekId },
    });
    if (!week) throw new Error("week not found");

    await prisma.week.delete({
      where: { userId: token.id, week_id: weekId },
    });
    return;
  } catch (err) {
    console.log("error during week delete:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const deleteWeeks = async (token: TokenPayload) => {
  try {
    await prisma.week.deleteMany({ where: { userId: token.id } });
    return;
  } catch (err) {
    console.log("error during deleting weeks:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};
