import { Request, Response } from "express";
import {
  deleteUser,
  deleteUsers,
  getSingleUser,
  listUsers,
  updateUser,
} from "../services/userService";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/auth.types";

export const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.status(200).json({ message: "users fetched successfully" , users});
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);

    req.user = {
      id: (decoded as TokenPayload).id,
      role: (decoded as TokenPayload).role,
    };
    if (!req.user) {
      console.log("error during updating user data");
      return;
    }
    const updatedUser = await updateUser(req.user, req.body);
    res.status(200).json({ message: "user updated successfully", updatedUser });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);

    req.user = {
      id: (decoded as TokenPayload).id,
      role: (decoded as TokenPayload).role,
    };
    if (!req.user) {
      console.log("error during fetching the user");
      return;
    }
    const user = await getSingleUser(req.user);
    res.status(200).json({ message: "user fetched successfully", user });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    const decoded = jwt.verify(token!, process.env.JWT_SECRET as string);

    req.user = {
      id: (decoded as TokenPayload).id,
      role: (decoded as TokenPayload).role,
    };
    if (!req.user) {
      console.log("error during deleting the user");
      return;
    }
    await deleteUser(req.user);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteUsersController = async (req: Request, res: Response) => {
  try {
    await deleteUsers();
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
