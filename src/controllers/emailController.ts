import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "../utils/emailUtils";

const prisma = new PrismaClient();

// Verify email
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET as string) as { email: string };
    const { email } = decoded;

    // Update the user's verified status
    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Resend email verification
export const resendEmailVerification = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(404).json({ message: "User not found" });
      return
    }

    // Check if the user is already verified
    if (user.verified) {
        res.status(400).json({ message: "User already verified" });
      return
    }

    // Resend the verification email
    await sendVerificationEmail(user.email);

    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (err) {
    console.error("Error resending verification email:", err);
    res.status(500).json({ message: "An error occurred when resending the email" });
  }
};