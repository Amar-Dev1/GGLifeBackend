import { Router } from "express";
import {
  deletetaskController,
  deleteAlltasksController,
  getSingletaskController,
  listtasksController,
  updatetaskController,
} from "../controllers/taskController";

const router = Router();

router.get("/", listtasksController).delete("/", deleteAlltasksController);
router
  .get("/:weekId/:taskId", getSingletaskController)
  .put("/:weekId/:taskId", updatetaskController)
  .delete("/:weekId/:taskId", deletetaskController);

export default router;
