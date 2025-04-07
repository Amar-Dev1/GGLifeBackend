import express from "express";
import taskRoutes from "./taskRoutes";
import userRoutes from "./userRoutes";
import weekRoutes from "./weekRoutes";
import profileRoutes from "./profileRoutes";

const router = express.Router();

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/weeks", weekRoutes);
router.use("/profile", profileRoutes);

export default router;