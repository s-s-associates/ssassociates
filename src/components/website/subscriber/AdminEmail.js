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

/**
 * Email sent to RECIPIENT_EMAIL when someone subscribes to the newsletter.
 * @param {{ subscriberEmail: string, subscribedAt?: string }} params
 * @returns {{ subject: string, html: string, text: string }}
 */
export function getSubscriberAdminEmail({ subscriberEmail, subscribedAt }) {
  const raw = (subscriberEmail || "").trim();
  const safe = escapeHtml(raw);
  const brand = escapeHtml(companyName());
  const when = subscribedAt
    ? new Date(subscribedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  const subject = `New newsletter subscriber — ${companyName()}`;
  const mailtoHref = raw ? `mailto:${encodeURIComponent(raw)}` : "#";

  const text = [
    "Someone subscribed to your newsletter via the website.",
    "",
    `Email: ${raw}`,
    `Time: ${when}`,
    "",
    `— ${companyName()}`,
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
          <td style="background:linear-gradient(145deg,${C.headerSub} 0%,${C.headerDark} 100%);border-radius:18px 18px 0 0;padding:0;overflow:hidden;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0;">
              <tr>
                <td style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,${C.accent} 0%,#ffb366 50%,${C.accent} 100%);border-top-left-radius:18px;border-top-right-radius:18px;"></td>
              </tr>
              <tr>
                <td style="padding:28px 28px 24px;text-align:left;">
                  <p style="margin:0 0 6px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;">Newsletter</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:1.2;">New subscriber</p>
                  <p style="margin:12px 0 0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#cbd5e1;">A visitor joined your mailing list from the site footer.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${C.card};padding:28px 28px 32px;border-radius:0 0 18px 18px;box-shadow:0 12px 40px rgba(15,23,42,0.1);">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};width:100px;background:${C.pageBg};border:1px solid ${C.border};">Email</td>
                <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,sans-serif;font-size:15px;color:${C.text};border:1px solid ${C.border};"><a href="${mailtoHref}" style="color:${C.accent};font-weight:600;text-decoration:none;">${safe}</a></td>
              </tr>
              <tr>
                <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};background:${C.pageBg};border:1px solid ${C.border};border-top:none;">Subscribed</td>
                <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,sans-serif;font-size:14px;color:${C.text};border:1px solid ${C.border};border-top:none;">${escapeHtml(when)}</td>
              </tr>
            </table>
            <div style="margin-top:20px;padding:16px 18px;border-radius:12px;background:${C.accentSoft};border:1px solid rgba(251,134,30,0.25);">
              <p style="margin:0;font-family:'Segoe UI',Roboto,sans-serif;font-size:13px;line-height:1.55;color:${C.text};">
                <strong style="color:${C.accent};">${brand}</strong> — you can reply directly to this address or manage subscribers in your admin dashboard.
              </p>
            </div>
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
