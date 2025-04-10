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

export const createWeekController = async (req: authenticatedRequest, res: Response) => {
  try {
    const {id:userId} = req.user

    const week = await createWeek(req.user, req.body);
    res.status(200).json({ message: "week created successfully", week });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const listWeeksController = async (req: authenticatedRequest, res: Response) => {
  try {
    const { id: userId } = req.user;

    const weeks = await listWeeks(req.user);

    res.status(200).json({ message: "weeks fetched successfully", weeks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const updateWeekController = async (
  req: authenticatedRequest,
  res: Response
) => {
  try {
    const { id: userId } = req.user;
    const weekId = req.params.weekId;

    const updatedweek = await updateWeek(req.user, weekId, req.body);
    res.status(200).json({ message: "user updated successfully", updatedweek });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const getSingleWeekController = async (req: authenticatedRequest, res: Response) => {
  try {
    const {id:userId} = req.user;
    const week = await getSingleWeek(req.user, req.params.weekId);
    res.status(200).json({ message: "week fetched successfully", week });
    return;
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteWeekController = async (req: authenticatedRequest, res: Response) => {
  try {

    const {id:userId} = req.user
    
    const deletedWeek = await deleteWeek(req.user, req.params.weekId);
    res.status(200).json({ message: "deleted successfully", deletedWeek });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const deleteAllWeeksController = async (req: authenticatedRequest, res: Response) => {
  try {
    const {id:userId}= req.user

    const deletedWeeks = await deleteWeeks(req.user);
    res
      .status(200)
      .json({ message: "All users deleted successfully:", deletedWeeks });
  } catch (err) {
    res.status(400).json({
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};
