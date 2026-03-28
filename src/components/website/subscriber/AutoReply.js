import { escapeHtml } from "@/lib/email-templates/escapeHtml";

const companyName = () => process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";

const C = {
  pageBg: "#eef0f4",
  card: "#ffffff",
  headerDark: "#0f1419",
  headerSub: "#1a2332",
  accent: "#fb861e",
  accentSoft: "#fff4e8",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
};

function greetingFromEmail(email) {
  const local = String(email || "").split("@")[0] || "";
  const cleaned = local.replace(/[._+-]/g, " ").trim();
  if (!cleaned) return "there";
  return cleaned.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}

/**
 * Welcome email sent to the person who subscribed.
 * @param {{ subscriberEmail: string }} params
 * @returns {{ subject: string, html: string, text: string }}
 */
export function getSubscriberWelcomeEmail({ subscriberEmail }) {
  const raw = (subscriberEmail || "").trim();
  const greet = greetingFromEmail(raw);
  const name = escapeHtml(greet);
  const brand = escapeHtml(companyName());

  const subject = `You’re subscribed — welcome to ${companyName()}`;

  const text = [
    `Hi ${greet},`,
    "",
    `Thank you for subscribing to ${companyName()}'s newsletter.`,
    "",
    "You’ll hear from us with updates on projects, services, and company news. We respect your inbox and you can unsubscribe anytime by replying to this email.",
    "",
    `Warm regards,`,
    `${companyName()}`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${C.pageBg};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.pageBg};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
        <tr>
          <td style="background:linear-gradient(145deg,${C.headerSub} 0%,${C.headerDark} 100%);border-radius:20px 20px 0 0;padding:0;overflow:hidden;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0;">
              <tr>
                <td style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,${C.accent} 0%,#ffb366 55%,${C.accent} 100%);border-top-left-radius:20px;border-top-right-radius:20px;"></td>
              </tr>
              <tr>
                <td style="padding:36px 32px 32px;text-align:center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto 18px;">
                    <tr>
                      <td style="width:52px;height:52px;border-radius:14px;background:rgba(251,134,30,0.15);border:1px solid rgba(251,134,30,0.35);text-align:center;vertical-align:middle;">
                        <span style="font-family:Georgia,serif;font-size:26px;line-height:52px;color:${C.accent};">✉</span>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 8px;font-family:'Segoe UI',Roboto,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#94a3b8;">Welcome aboard</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:1.15;">You&apos;re on the list</p>
                  <p style="margin:14px auto 0;max-width:400px;font-family:'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#cbd5e1;text-align:center;">We&apos;re glad you chose to stay in touch with <strong style="color:#fff;">${brand}</strong>.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${C.card};padding:0 0 8px;border-radius:0 0 20px 20px;box-shadow:0 16px 48px rgba(15,23,42,0.12);">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:32px 28px 8px;font-family:'Segoe UI',Roboto,sans-serif;">
                  <p style="margin:0 0 16px;font-size:17px;line-height:1.5;color:${C.text};">Hi ${name},</p>
                  <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${C.muted};">Thank you for subscribing to our newsletter. You&apos;ll receive updates on our projects, services, and announcements—we aim to make every message useful.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 28px;">
                  <div style="border-radius:14px;background:${C.accentSoft};border:1px solid rgba(251,134,30,0.2);padding:18px 20px;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">Your preferences</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:${C.text};">If you ever want to stop receiving these emails, simply reply with <strong>unsubscribe</strong> and we&apos;ll take care of it.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 32px;border-top:1px solid ${C.border};">
                  <p style="margin:22px 0 4px;font-size:15px;line-height:1.5;color:${C.text};">Warm regards,</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:17px;font-weight:700;color:${C.text};letter-spacing:-0.02em;">${brand}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`.trim();

  return { subject, html, text };
}
