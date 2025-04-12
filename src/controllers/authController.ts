import { Request, Response } from "express";
import { loginUser, registerUser, resendVerificationEmail } from "../services/authService";

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully and email verification sent !",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const resendVerificationEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) res.status(400).json({message:"Email is required !"})
  
      await resendVerificationEmail(email);
  
      res.status(200).json({
        message: "Verification email resent successfully",
      });

  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({ message: "Logged in successfully", data: result });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
