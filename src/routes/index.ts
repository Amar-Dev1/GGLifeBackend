import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import profileRoutes from "./profileRoutes";
import weekRoutes from "./weekRoutes";
import taskRoutes from "./taskRoutes";
import emailRoutes from './emailRoutes';
import authenticateUser from "../middlewares/authenticatedUser";

const router = Router();

router.use("/auth", authRoutes);
router.use("/auth",emailRoutes)
router.use("/users", authenticateUser,userRoutes);
router.use("/profiles", authenticateUser, profileRoutes);
router.use("/weeks", authenticateUser, weekRoutes);
router.use("/weeks/:weekId/tasks", authenticateUser, taskRoutes);
router.use("/tasks", authenticateUser, taskRoutes);

export default router;