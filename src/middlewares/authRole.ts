import { Request, Response, NextFunction } from "express";
import { authenticatedRequest } from "../types/auth.types";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const {user} = req as authenticatedRequest;
  if (user.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }
  next();
};

export default isAdmin;
