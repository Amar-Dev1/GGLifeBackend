import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import { validate } from "../middlewares/validator";
import { userSchema } from "../validations/userSchema";

const router = Router();

router.post("/register", validate(userSchema), registerController); 
router.post("/login", loginController);

export default router;