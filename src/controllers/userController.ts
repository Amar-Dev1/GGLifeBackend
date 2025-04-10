import { Request, Response } from "express";
import {
  deleteUser,
  deleteUsers,
  getSingleUser,
  listUsers,
  updateUser,
} from "../services/userService";
import { authenticatedRequest } from "../types/auth.types";

export const listUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listUsers();
    res.status(200).json({ message: "users fetched successfully", users });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = (req as authenticatedRequest).user;

    const updatedUser = await updateUser(user, req.body);
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
    const { user } = req as authenticatedRequest;

    const singleUser = await getSingleUser(user);
    res.status(200).json({ message: "user fetched successfully", singleUser });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;

    await deleteUser(user);
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
