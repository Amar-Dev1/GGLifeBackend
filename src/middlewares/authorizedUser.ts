import { NextFunction, Request, Response } from "express";

const authorizedUser = (req: Request, res: Response, next: NextFunction) => {
  const userId =
    req.params.userId ||
    req.params.profileId ||
    req.params.weekId ||
    req.params.taskId;
  if (req.user.id === userId || req.user.role === "ADMIN") {
    next();
  } else {
    res.status(401).send("Access denied. ");
  }
};

export default authorizedUser;
