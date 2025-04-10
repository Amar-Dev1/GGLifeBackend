import { Request, Response, NextFunction } from "express";
import { authenticatedRequest } from "../types/auth.types";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const {user} = req as authenticatedRequest;
  if (!user) {
    res.status(401).json({ message: "Access denied. User not authenticated." });
    return
  }

  if (user.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return
  
  }
  next();
};

export default isAdmin;