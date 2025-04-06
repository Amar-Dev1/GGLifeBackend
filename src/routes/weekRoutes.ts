import express from "express";
import {
  getAllWeeks,
  createWeek,
  updateWeek,
  deleteWeek,
  getSpecificWeek,
} from "../controllers/weekController";
import { validate } from "../middlewares/validator";
import { weekSchema } from "../validations/weekSchema";
import authenticateUser from "../middlewares/authenticatedUser";
import authorizedUser from "../middlewares/authorizedUser";

const router = express.Router();
router.get("/", authenticateUser,authorizedUser, getAllWeeks);
router.get("/:weekId", authenticateUser,authorizedUser, getSpecificWeek);
router.post("/", authenticateUser,authorizedUser, validate(weekSchema), createWeek);
router.put("/:weekId", authenticateUser, authorizedUser,updateWeek);
router.delete("/:weekId", authenticateUser,authorizedUser, deleteWeek);

export default router;
