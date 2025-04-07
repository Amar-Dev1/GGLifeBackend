import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all weeks belong to the user
export const getAllWeeks = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const weeks = await prisma.week.findMany({
      where: { userId: userId },
    });
    res.status(200).json(weeks);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while fetching weeks" });
  }
};

// get a specific week
export const getSpecificWeek = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const  weekId  = req.params.weekId;

  try {
    const week = await prisma.week.findFirst({
      where: { userId: userId, week_id: weekId },
      include: { tasks: true },
    });

    if (!week) {
      res.status(404).json({ message: "Week not found or access denied." });
      return
    }

    res.status(200).json(week);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when fetching the week" });
  }
};

// create a new week
export const createWeek = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { title, score, completed, tasks } = req.body;
  const trulyCompleted = score === 100 ? true : false;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // 1. create a new week
      const week = await prisma.week.create({
        data: {
          title,
          score,
          userId,
          completed: trulyCompleted,
        },
      });

      // 2. create tasks
      if (tasks && tasks.length > 0) {
        const taskData = tasks.map((task: any) => ({
          title: task.title,
          score: task.score,
          weekId: week.week_id,
          userId,
          completed: trulyCompleted,
        }));
        await prisma.task.createMany({
          data: taskData,
        });
      }

      return week;
    });

    res.status(201).json({ result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating the week" });
  }
};

// update a week
export const updateWeek = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { weekId } = req.params;
  const { title, score, completed } = req.body;
  const trulyCompleted = score === 100 ? true : false;

  try {
    const updatedWeek = await prisma.week.update({
      where: { userId: userId, week_id: weekId },
      data: {
        title,
        score,
        completed: trulyCompleted,
      },
    });
    res.json(updatedWeek);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the week" });
  }
};

//  delete a week
export const deleteWeek = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { weekId } = req.params;
  try {
    await prisma.week.delete({ where: { userId: userId, week_id: weekId } });
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the week" });
  }
};
