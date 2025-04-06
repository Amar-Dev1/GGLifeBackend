import express from "express";
import {
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/taskController";
import authenticateUser from "../middlewares/authenticatedUser";
import authorizedUser from "../middlewares/authorizedUser";

const router = express.Router();

router.get("/:weekId", authenticateUser,authorizedUser, getAllTasks);
router.put("/:weekId/:taskId", authenticateUser,authorizedUser, updateTask);
router.delete("/:weekId/:taskId", authenticateUser,authorizedUser, deleteTask);

export default router;
