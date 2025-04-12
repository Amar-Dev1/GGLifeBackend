import express from "express";
import { verifyEmailController } from "../controllers/emailController";

const router = express.Router();

router.get("/verify-email/:token", verifyEmailController);
// router.post("/resend-verification-email", resendEmailVerification);

export default router;