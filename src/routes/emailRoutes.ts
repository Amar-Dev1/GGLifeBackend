import express from "express";
import { verifyEmail, resendEmailVerification } from "../controllers/emailController";

const router = express.Router();

router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-email", resendEmailVerification);

export default router;