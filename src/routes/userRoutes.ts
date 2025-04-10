import { Router } from "express";
import {
  deleteUserController,
  deleteUsersController,
  getSingleUserController,
  listUsersController,
  updateUserController,
} from "../controllers/userController";
import isAdmin from "../middlewares/authRole";

const router = Router();

router.get("/", isAdmin,listUsersController).delete("/", isAdmin,deleteUsersController);
router
  .get("/me", getSingleUserController) 
  .put("/me", updateUserController)
  .delete("/me", deleteUserController);

export default router;
