import { connectDB } from "@/lib/db";
import { sendHtmlEmail } from "@/lib/email";
import { getCompanyInquiryEmail } from "@/lib/email-templates/contactCompanyInquiry";
import { getContactAutoReply } from "@/lib/email-templates/contactAutoReply";
import ContactSubmission from "@/models/ContactSubmission";
import { NextResponse } from "next/server";

function mailFromDisplay() {
  const name = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";
  const user = process.env.SMTP_USER;
  if (!user) return undefined;
  return `"${name.replace(/"/g, "")}" <${user}>`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const fullName = (body.fullName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();
    const companyName = (body.companyName || "").trim();
    const address = (body.address || "").trim();

    if (!fullName) {
      return NextResponse.json({ success: false, message: "Full name is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Contact POST: SMTP_USER or SMTP_PASS is not configured");
      return NextResponse.json(
        { success: false, message: "Email is not configured on the server." },
        { status: 503 }
      );
    }

    const recipient = (process.env.RECIPIENT_EMAIL || "").trim() || process.env.SMTP_USER;
    const from = mailFromDisplay();

    await connectDB();
    await ContactSubmission.create({
      fullName,
      email,
      companyName,
      phone,
      address,
      message,
    });

    const payload = { fullName, email, companyName, phone, address, message };
    const { text: companyText, html: companyHtml } = getCompanyInquiryEmail(payload);

    const companySubject = `Contact form: ${fullName.replace(/[\r\n]/g, " ").slice(0, 120)}`;

    await sendHtmlEmail({
      to: recipient,
      from,
      replyTo: email,
      subject: companySubject,
      html: companyHtml,
      text: companyText,
    });

    try {
      const auto = getContactAutoReply({ fullName });
      await sendHtmlEmail({
        to: email,
        from,
        subject: auto.subject,
        html: auto.html,
        text: auto.text,
      });
    } catch (autoErr) {
      console.error("Contact auto-reply failed:", autoErr);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact POST error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
