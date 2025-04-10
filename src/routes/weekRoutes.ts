import { Router } from "express";
import {
  createWeekController,
  deleteAllWeeksController,
  deleteWeekController,
  getSingleWeekController,
  listWeeksController,
  updateWeekController,
} from "../controllers/weekController";

const router = Router();

// List all weeks
router.get("/", listWeeksController);

// Create a new week
router.post("/", createWeekController);

// Delete all weeks
router.delete("/", deleteAllWeeksController);

// Get, update, or delete a specific week by weekId
router
  .get("/:weekId", getSingleWeekController)
  .put("/:weekId", updateWeekController)
  .delete("/:weekId", deleteWeekController);

export default router;