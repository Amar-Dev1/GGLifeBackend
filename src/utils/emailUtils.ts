import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string,token:string) => {
  // const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET as string, { expiresIn: "15m" });
  const url = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Please click the link to verify your email: ${url}`,
  };

  await transporter.sendMail(mailOptions);
};