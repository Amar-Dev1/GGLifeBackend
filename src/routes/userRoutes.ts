import express from "express";
import {
  listAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getSpecificUser,
  loginUser,
  deleteAllUsers,
} from "../controllers/userController";
import { validate } from "../middlewares/validator";
import { userSchema } from "../validations/userSchema";

import isAdmin from "../middlewares/authRole";

import authenticateUser from "../middlewares/authenticatedUser";
import authorizedUser from "../middlewares/authorizedUser";
const router = express.Router();

// public routes
router.post("/register", validate(userSchema), createUser); // ✅
router.post("/login", loginUser); // ✅

// protected routes
router.get("/", authenticateUser, isAdmin, listAllUsers); // ✅
router.get("/:userId", authenticateUser, authorizedUser, getSpecificUser); // ✅
router.put("/:userId", authenticateUser, authorizedUser, updateUser); // ✅
router.delete("/:userId", authenticateUser, authorizedUser, deleteUser); // ✅
router.delete("/", authenticateUser, isAdmin, deleteAllUsers); // ✅

export default router;

