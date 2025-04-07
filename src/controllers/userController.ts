import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

const prisma = new PrismaClient();

// list users
export const listAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "An error occured when fetching users" });
  }
};

// get a specific user
export const getSpecificUser = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },

      include: { profile: true },
    });
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when fetching the user" });
  }
};

// register a user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, adminKey } = req.body;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // determine the user role
      const role = adminKey === process.env.ADMIN_KEY ? "ADMIN" : "USER";

      // 1. hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 2. create a user
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword, role },
      });

      // 4. automatically create a profile
      const profile = await prisma.profile.create({
        data: {
          userId: user.user_id,
          bio: "",
          photo: null,
          name:user.name
        },
      });
      return {
        user: { ...user, profile },
      };
    });

    // 5. send the response
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when creating the user" });
  }
};

// login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "wrong email or password" });
      return;
    }
    // generate a token
    const token = generateToken(user.user_id, user.role);
    // send the response
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured when logging in the user" });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name, email, password, adminKey } = req.body;
  try {
    const role = adminKey === process.env.ADMIN_KEY ? "ADMIN" : "USER";

    const user = await prisma.user.update({
      where: { user_id: userId },
      data: {
        name,
        email,
        password,
        role,
      },
    });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when updating the user" });
  }
};

// delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    await prisma.user.delete({ where: { user_id: userId } });
    res.status(204).json({ message: "Deleted successfuly !" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when deleting the user" });
  }
};

// delete all users
export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    await prisma.user.deleteMany();
    res.status(204).json({ message: "Deleted successfuly !" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured when deleting the users" });
  }
};
