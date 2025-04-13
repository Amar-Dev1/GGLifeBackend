import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import { LoginInput, RegisterInput } from "../types/auth.types";
import generateToken from "../utils/generateToken";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/emailUtils";

const prisma = new PrismaClient();

export const registerUser = async (data: RegisterInput) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // 1. check if user already exists
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (user) throw new Error("User already exists");

      // 2. hash the password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // 3. create the user
      let role: "USER" | "ADMIN" = "USER"; // Default role is USER
      if (data.adminKey && data.adminKey === process.env.ADMIN_KEY) {
        role = "ADMIN";
      }

      let { adminKey, ...updateData } = data;
      const createdUser = await prisma.user.create({
        data: {
          ...updateData,
          password: hashedPassword,
          role,
        },
      });

      // 4. create a profile
      const profile = await prisma.profile.create({
        data: {
          userId: createdUser.user_id,
          name: createdUser.name,
          photo: null,
          bio: "",
        },
      });

      // 5. generate email token
      const token = jwt.sign(
        { email: createdUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
      );
      sendVerificationEmail(data.email, token);
      return { user: { ...createdUser, profile },token };
    });
    return result;
  } catch (err) {
    console.log("error during user registeration:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const resendVerificationEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user?.verified) throw new Error("email already verified");

  const token = jwt.sign(
    { email: user?.email},
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  sendVerificationEmail(email, token);
};

export const loginUser = async (data: LoginInput) => {
  try {
    // 1. check if user not found
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new Error("user not found");

    // 2. check if verified
    if (!user.verified) throw new Error("you must verify your email");

    // 3. compare the password
    const matchPassword = bcrypt.compare(user.password, data.password);
    if (!matchPassword) throw new Error("invalid email or password");

    const token = await generateToken(user.user_id, user.role);

    return { user, token };
  } catch (err) {
    console.log("error during user login:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};
