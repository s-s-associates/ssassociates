import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail({ to, otp, type }) {
  const subject = type === "signup" ? `Verify your ${process.env.NEXT_PUBLIC_COMPANY_NAME} account` : `Reset your ${process.env.NEXT_PUBLIC_COMPANY_NAME} password`;
  const text =
    type === "signup"
      ? `Your verification code is: ${otp}. It expires in 10 minutes.`
      : `Your password reset code is: ${otp}. It expires in 10 minutes.`;
  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #15151D;">${subject}</h2>
      <p style="color: #333;">Your code is:</p>
      <p style="font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #8A38F5;">${otp}</p>
      <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
      <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
    </div>
  `;
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}

/** Send a single HTML email (e.g. bulk campaign). */
export async function sendHtmlEmail({ to, subject, html, text }) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: subject || `Message from ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    text: text || (typeof html === "string" ? html.replace(/<[^>]*>/g, "").trim() : ""),
    html: html || undefined,
  });
}
