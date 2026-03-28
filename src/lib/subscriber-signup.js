import Subscriber from "@/models/Subscriber";
import { getSubscriberAdminEmail } from "@/components/website/subscriber/AdminEmail";
import { getSubscriberWelcomeEmail } from "@/components/website/subscriber/AutoReply";
import { connectDB } from "@/lib/db";
import { sendHtmlEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mailFromDisplay() {
  const name = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";
  const user = process.env.SMTP_USER;
  if (!user) return undefined;
  return `"${name.replace(/"/g, "")}" <${user}>`;
}

async function sendSubscriberEmails(subscriberEmail, createdAt) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return;
  }
  const recipient = (process.env.RECIPIENT_EMAIL || "").trim() || process.env.SMTP_USER;
  const from = mailFromDisplay();

  try {
    const admin = getSubscriberAdminEmail({
      subscriberEmail,
      subscribedAt: createdAt,
    });
    await sendHtmlEmail({
      to: recipient,
      from,
      replyTo: subscriberEmail,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });
  } catch (err) {
    console.error("Subscriber admin notification email failed:", err);
  }

  try {
    const welcome = getSubscriberWelcomeEmail({ subscriberEmail });
    await sendHtmlEmail({
      to: subscriberEmail,
      from,
      subject: welcome.subject,
      html: welcome.html,
      text: welcome.text,
    });
  } catch (err) {
    console.error("Subscriber welcome email failed:", err);
  }
}

/**
 * Validate email, create subscriber if new, send admin + welcome emails.
 * @param {string} rawEmail
 * @returns {Promise<
 *   | { ok: true; message: string; subscriber: object }
 *   | { ok: false; alreadySubscribed?: boolean; message: string; status?: number }
 * >}
 */
export async function subscribeWithNotifications(rawEmail) {
  const email = (rawEmail || "").trim().toLowerCase();
  if (!email) {
    return { ok: false, message: "Email is required", status: 400 };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, message: "Please enter a valid email", status: 400 };
  }

  await connectDB();

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    return {
      ok: false,
      alreadySubscribed: true,
      message: "This email is already subscribed.",
      status: 200,
    };
  }

  let doc;
  try {
    doc = await Subscriber.create({ email });
  } catch (err) {
    if (err.code === 11000) {
      return {
        ok: false,
        alreadySubscribed: true,
        message: "This email is already subscribed.",
        status: 200,
      };
    }
    throw err;
  }

  await sendSubscriberEmails(email, doc.createdAt);

  const subscriber = {
    _id: doc._id,
    email: doc.email,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    __v: doc.__v,
  };

  return {
    ok: true,
    message: "Subscribed successfully",
    subscriber,
  };
}
