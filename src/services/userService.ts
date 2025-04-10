import { TokenPayload } from "../types/auth.types";
import { PrismaClient } from "@prisma/client";
import { SafeUser } from "../types/user.types";

const prisma = new PrismaClient();

export const listUsers = async () => {
  try {
    const users = await prisma.user.findMany({ include: { profile: true } });
    return  users ;
  } catch (err) {
    console.log("error during fetching users:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const getSingleUser = async (token: TokenPayload) => {
  try {
    // 1. check if user found
    const exists = await prisma.user.findUnique({
      where: { user_id:token.id},
    });
    if (!exists) throw new Error("user not found");

    const user = await prisma.user.findUnique({
      where: { user_id: token.id },
      include: { profile: true },
    });

    return  user ;
  } catch (err) {
    console.log("error during fetching the user:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const updateUser = async (token: TokenPayload, data: SafeUser) => {
  try {
    // 1. check if user found
    const user = await prisma.user.findUnique({ where: { user_id:token.id } });

    if (!user) throw new Error("user not found");

    // 2. update the user data
    const updatedUser = await prisma.user.update({
      data: data,
      where: {
        user_id: token.id,
        role: token.role,
      },
    });

    return  updatedUser;
  } catch (err) {
    console.log("error during user updating:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};
export const deleteUser = async (token: TokenPayload) => {
  try {
    // 1. check if user exists
    const user = await prisma.user.findUnique({ where: { user_id:token.id } });
    if (!user) throw new Error("user not found");
    await prisma.user.delete({
      where: { user_id: token.id, role: token.role },
    });
    return;
  } catch (err) {
    console.log("error during user delete:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};

export const deleteUsers = async () => {
  try {
    await prisma.user.deleteMany();
    return;
  } catch (err) {
    console.log("error during deleting users:", err);
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
  }
};