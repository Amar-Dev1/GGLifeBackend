import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticatedRequest, TokenPayload } from "../types/auth.types";
import {
  deletetask,
  deletetasks,
  getSingletask,
  listtasks,
  updatetask,
} from "../services/taskService";

export const listtasksController = async (req:Request, res: Response) => {
  try {
    const {user} = req as authenticatedRequest
    const tasks = await listtasks(user, req.params.weekId);

    res.status(200).json({ message: "tasks fetched successfully", tasks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const getSingletaskController = async (req:Request, res: Response) => {
  try {
    const {user} = req as authenticatedRequest

    const task = await getSingletask(
      user,
      req.params.weekId,
      req.params.taskId,
    );
    res.status(200).json({ message: "task fetched successfully", task });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const updatetaskController = async (req:Request, res: Response) => {
  try {
    const {user} = req as authenticatedRequest;

    const weekId = req.params.weekId;
    const taskId = req.params.taskId;

    const updatedtask = await updatetask(user, weekId, taskId, req.body);
    res.status(200).json({ message: "user updated successfully", updatedtask });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deletetaskController = async (req:Request, res: Response) => {
  try {
    
    const {user} = req as authenticatedRequest

    const deletedtask = await deletetask(
      user,
      req.params.weekId,
      req.params.taskId
    );
    res.status(200).json({ message: "deleted successfully", deletedtask });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteAlltasksController = async (req:Request, res: Response) => {
  try {
    const {user} = req as authenticatedRequest

    const deletedtasks = await deletetasks(user, req.params.weekId);
    res
      .status(200)
      .json({ message: "All users deleted successfully:", deletedtasks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
