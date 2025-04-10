import { Request, Response } from "express";
import { authenticatedRequest, TokenPayload } from "../types/auth.types";
import { getSingleProfile, updateProfile } from "../services/profileService";

export const updateProfileController = async (req: Request, res: Response) => {
  try {
  
    const {user} = req as authenticatedRequest;

    const updatedProfile = await updateProfile(user, req.body);
    res.status(200).json({ message: "profile updated successfully", updatedProfile });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const getSingleProfileController = async (req: Request, res: Response) => {
  try {
    const {user} = req as authenticatedRequest;
    const profile = await getSingleProfile(user);
    res.status(200).json({ message: "profile fetched successfully", profile });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

