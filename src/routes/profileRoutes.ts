import express from "express";
import {
  getAllProfiles,
  getSpecificProfile,
  updateProfile,
} from "../controllers/profileController";
import { validate } from "../middlewares/validator";
import { profileSchema } from "../validations/profileSchema";
import authenticateUser from "../middlewares/authenticatedUser";
import isAdmin from "../middlewares/authRole";
import authorizedUser from "../middlewares/authorizedUser";

const router = express.Router();

router.get("/", authenticateUser, isAdmin, getAllProfiles);
router.get("/:profileId", authenticateUser, authorizedUser, getSpecificProfile);
router.put(
  "/:profileId",
  authenticateUser,
  authorizedUser,
  validate(profileSchema),
  updateProfile
);

export default router;
