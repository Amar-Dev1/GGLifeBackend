import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. token not provided" });
    return;
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = { id: (decoded as any).id, role: (decoded as any).role };
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateUser;
