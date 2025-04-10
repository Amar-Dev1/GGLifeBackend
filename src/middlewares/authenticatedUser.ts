import jwt from "jsonwebtoken";
import { Request, NextFunction, Response } from "express";
import { authenticatedRequest, TokenPayload } from "../types/auth.types";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied. Token not provided" });
    return;
  }

  
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    (req as authenticatedRequest).user = { id: decoded.id, role: decoded.role };

    console.log("Decoded token:", decoded);
    console.log("User role:", decoded.role);

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default authenticateUser;
