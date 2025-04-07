import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const profile = await prisma.profile.findMany();
    res.status(200).json(profile);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

// get a specific profile
export const getSpecificProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user.id;
  const { profileId } = req.params;
  try {
    const profile = await prisma.profile.findFirst({
      where: { userId: userId, profile_id: profileId },
    });
    res.status(200).json(profile);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

// update a profile
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.user.id;
  const { profileId } = req.params;
  const { photo, bio } = req.body;
  try {
    const updatedProfile = await prisma.profile.update({
      where: { userId: userId, profile_id: profileId },
      data: {
        photo,
        bio,
      },
    });
    res.status(201).json(updatedProfile);
    console.log("updated successfuly !");
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the profile" });
  }
};