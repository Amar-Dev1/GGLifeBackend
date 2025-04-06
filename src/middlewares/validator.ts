import { Schema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (Schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validate error",
          errors: error.message,
        });
        return;
      }
      next(error);
    }
  };
