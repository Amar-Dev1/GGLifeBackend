import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }
  next();
};

export default isAdmin;
