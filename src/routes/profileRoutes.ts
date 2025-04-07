import express from "express";
import {
  getAllProfiles,
  getSpecificProfile,
  updateProfile,
} from "../controllers/profileController";
import { validate } from "../middlewares/validator";
import { profileSchema } from "../validations/profileSchema";
import authenticateUser from "../middlewares/authenticatedUser";
import authorizedUser from "../middlewares/authorizedUser";

const router = express.Router();

router.get("/", authenticateUser, authorizedUser, getAllProfiles);
router.get("/me", authenticateUser, getSpecificProfile);
router.put(
  "/me",
  authenticateUser,
  validate(profileSchema),
  updateProfile
);

export default router;