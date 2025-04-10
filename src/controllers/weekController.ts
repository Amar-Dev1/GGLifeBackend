import { Request, Response } from "express";
import { authenticatedRequest } from "../types/auth.types";
import {
  createWeek,
  deleteWeek,
  deleteWeeks,
  getSingleWeek,
  listWeeks,
  updateWeek,
} from "../services/weekService";

export const createWeekController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;

    const week = await createWeek(user, req.body);
    res.status(200).json({ message: "week created successfully", week });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const listWeeksController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;

    const weeks = await listWeeks(user);

    res.status(200).json({ message: "weeks fetched successfully", weeks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const updateWeekController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;
    const weekId = req.params.weekId;

    const updatedweek = await updateWeek(user, weekId, req.body);
    res.status(200).json({ message: "user updated successfully", updatedweek });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const getSingleWeekController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;
    const week = await getSingleWeek(user, req.params.weekId);
    res.status(200).json({ message: "week fetched successfully", week });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteWeekController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;

    const deletedWeek = await deleteWeek(user, req.params.weekId);
    res.status(200).json({ message: "deleted successfully", deletedWeek });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteAllWeeksController = async (req: Request, res: Response) => {
  try {
    const { user } = req as authenticatedRequest;

    const deletedWeeks = await deleteWeeks(user);
    res
      .status(200)
      .json({ message: "All users deleted successfully:", deletedWeeks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
