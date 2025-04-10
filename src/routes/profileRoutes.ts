import { Router } from "express";
import {
  getSingleProfileController,
  updateProfileController,
} from "../controllers/profileController";

const router = Router();

router
  .get("/me", getSingleProfileController)
  .put("/me", updateProfileController);

export default router;