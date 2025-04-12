import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Verify email
export const verifyEmail = async (token: any) => {
  try {
    //1. verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.verified) {
      throw new Error("User is already verified");
    }

    //2. update the user`s verfied status
    const verifiedUser = await prisma.user.update({
      where: { email: decoded.email },
      data: { verified: true },
    });

    return verifiedUser;
  } catch (err) {
    console.log("error during user registeration:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};