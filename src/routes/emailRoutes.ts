import express from "express";
import { verifyEmailController } from "../controllers/emailController";
import { resendVerificationEmailController } from "../controllers/authController";

const router = express.Router();

router.get("/verify-email/:token", verifyEmailController);
router.post("/resend-verification-email", resendVerificationEmailController);

export default router;