import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authorizedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { weekId, taskId, profileId } = req.params;
  const userId = req.user.id;

  try {
    // Allow admins to bypass ownership checks
    if (req.user.role === "ADMIN") {
      return next();
    }

    let resource;

    if (weekId) {
      resource = await prisma.week.findUnique({ where: { week_id: weekId } });
    } else if (taskId) {
      resource = await prisma.task.findUnique({ where: { task_id: taskId } });
    } else if (profileId) {
      resource = await prisma.profile.findUnique({
        where: { profile_id: profileId },
      });
    }

    if (!resource || resource.userId !== userId) {
      res.status(403).json({ message: "Access denied" });
      return;
    }
    next();
  } catch (err) {
    console.error("Authorization error:", err);
    res.status(500).json({ message: "An error occurred during authorization" });
  }
};
export default authorizedUser;
