import { Router } from "express";
import {
  deleteUserController,
  deleteUsersController,
  getSingleUserController,
  listUsersController,
  updateUserController,
} from "../controllers/userController";

const router = Router();

router.get("/", listUsersController).delete("/", deleteUsersController); // ✅
router
  .get("/me", getSingleUserController) // ✅
  .put("/me", updateUserController) // ✅
  .delete("/me", deleteUserController);

export default router;
