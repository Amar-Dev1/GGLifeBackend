import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import { LoginInput, RegisterInput } from "../types/auth.types";
import generateToken from "../utils/generateToken";

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
      ...updateData,password:hashedPassword, role
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

      return { user: { ...createdUser, profile } };
    });
    return result;
  } catch (err) {
    console.log("error during user registeration:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const loginUser = async (data: LoginInput) => {
  try {
    // 1. check if user not found
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) throw new Error("user not found");

    // 2. compare the password
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
