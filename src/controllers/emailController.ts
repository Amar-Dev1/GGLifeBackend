import { Request, Response } from "express";
import { verifyEmail } from "../services/emailService";

// Verify email
export const verifyEmailController = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    await verifyEmail(token);
    res.status(200).json({ message: "email verified successfully !" });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};