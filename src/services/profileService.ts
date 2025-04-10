import { TokenPayload } from "../types/auth.types";
import { PrismaClient } from "@prisma/client";
import { SafeProfile } from "../types/user.types";

const prisma = new PrismaClient();

export const getSingleProfile = async (token: TokenPayload) => {
  try {
    // 1. check if user found
    const exists = await prisma.user.findUnique({
      where: { user_id:token.id},
    });
    if (!exists) throw new Error("user not found");

    const profile = await prisma.profile.findUnique({
      where: { userId: token.id },
    });

    return { profile };
  } catch (err) {
    console.log("error during fetching a profile:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const updateProfile = async (token: TokenPayload, data: SafeProfile) => {
  try {

    // 1. check if user found
    const user = await prisma.profile.findUnique({ where: { userId:token.id } });

    if (!user) throw new Error("user not found");

    // 2. update the profile data
    const updatedProfile = await prisma.profile.update({
      data: data,
      where: {
        userId:token.id
      },
    });

    return { updatedProfile };
  } catch (err) {
    console.log("error during user updating a profile", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

