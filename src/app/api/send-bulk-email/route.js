import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/get-user-from-request";
import EmailLog from "@/models/EmailLog";
import { sendHtmlEmail } from "@/lib/email";
import { NextResponse } from "next/server";

function buildEmailHtml(body, ctaText, ctaUrl, heading) {
  const hasCta = ctaText && ctaUrl;
  const ctaBlock = hasCta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0 0 0;"><tr><td align="center"><a href="${ctaUrl}" target="_blank" rel="noopener" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%); color: #fff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 16px;">${ctaText}</a></td></tr></table>`
    : "";
  const headingBlock = heading ? `<h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1f2937;">${heading}</h1>` : "";
  const content = (body || "").replace(/\n/g, "<br>");
  return `${headingBlock}<div style="color: #1f2937; font-size: 16px; line-height: 1.65;">${content}</div>${ctaBlock}`;
}

/** Derive a friendly name from email when we don't have a stored name (e.g. "john" from "john@example.com"). */
function nameFromEmail(email) {
  if (!email || typeof email !== "string") return "there";
  const part = email.split("@")[0]?.trim();
  if (!part) return "there";
  return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
}

/** Replace {{name}} and {{email}} in text/HTML so placeholders don't show in the sent email. */
function personalizeText(text, email) {
  const name = nameFromEmail(email);
  return (text || "")
    .replace(/\{\{name\}\}/gi, name)
    .replace(/\{\{email\}\}/gi, email || "");
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { subject, body: emailBody, ctaText, ctaUrl, recipientEmails, templateId, templateTitle } = body;
    const recipients = Array.isArray(recipientEmails) ? recipientEmails.filter((e) => e && String(e).trim()) : [];
    if (!subject || !String(subject).trim()) {
      return NextResponse.json({ success: false, error: "Subject is required" }, { status: 400 });
    }
    if (recipients.length === 0) {
      return NextResponse.json({ success: false, error: "At least one recipient is required" }, { status: 400 });
    }
    const heading = (body.heading || "").trim();
    const rawBody = emailBody || "";
    const isHtml = typeof rawBody === "string" && (rawBody.includes("<") && rawBody.includes(">"));
    const baseHtml = isHtml ? rawBody : buildEmailHtml(rawBody, ctaText || "", ctaUrl || "", heading);
    let successCount = 0;
    let failedCount = 0;
    for (const to of recipients) {
      try {
        const personalizedSubject = personalizeText(subject.trim(), to);
        const personalizedHtml = personalizeText(baseHtml, to);
        await sendHtmlEmail({ to, subject: personalizedSubject, html: personalizedHtml });
        successCount++;
      } catch (err) {
        console.error("Bulk email send error to", to, err);
        failedCount++;
      }
    }
    await connectDB();
    await EmailLog.create({
      subject: subject.trim(),
      recipientCount: recipients.length,
      successCount,
      failedCount,
      status: failedCount === 0 ? "sent" : failedCount === recipients.length ? "failed" : "partial",
      templateId: templateId || "",
      templateTitle: templateTitle || "",
    });
    return NextResponse.json({
      success: true,
      successCount,
      failedCount,
    });
  } catch (err) {
    console.error("Send bulk email error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send emails" },
      { status: 500 }
    );
  }
}
