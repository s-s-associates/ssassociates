import { escapeHtml } from "./escapeHtml";

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
 * Auto-reply sent to the customer after they submit the contact form.
 * @param {{ fullName: string }} params
 * @returns {{ subject: string, html: string, text: string }}
 */
export function getContactAutoReply({ fullName }) {
  const rawName = (fullName || "").trim();
  const name = escapeHtml(rawName) || "there";
  const brand = escapeHtml(companyName());

  const subject = `We received your message — ${companyName()}`;

  const text = [
    `Hi ${rawName || "there"},`,
    "",
    `Thank you for contacting ${companyName()}.`,
    "",
    "We have received your message and will get back to you within 24 hours.",
    "",
    "If your request is urgent, reply to this email and we will prioritize it.",
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
          <td style="background:linear-gradient(145deg,${C.headerSub} 0%,${C.headerDark} 100%);border-radius:20px 20px 0 0;padding:0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="height:5px;background:linear-gradient(90deg,${C.accent} 0%,#ffb366 55%,${C.accent} 100%);border-radius:20px 20px 0 0;"></td>
              </tr>
              <tr>
                <td style="padding:36px 32px 32px;text-align:center;">
                  <table role="presentation" cellspacing="0" cellpadding="0" align="center" style="margin:0 auto 20px;">
                    <tr>
                      <td style="width:56px;height:56px;border-radius:16px;background:rgba(251,134,30,0.15);border:1px solid rgba(251,134,30,0.35);text-align:center;vertical-align:middle;">
                        <span style="font-family:Georgia,serif;font-size:28px;line-height:56px;color:${C.accent};">✓</span>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:0 0 8px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#94a3b8;">Message received</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:1.15;">You&apos;re all set</p>
                  <p style="margin:14px auto 0 auto;max-width:420px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;color:#cbd5e1;text-align:center;">We appreciate you taking the time to write to us.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${C.card};padding:0 0 8px 0;border-radius:0 0 20px 20px;box-shadow:0 16px 48px rgba(15,23,42,0.12);">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:36px 32px 8px 32px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
                  <p style="margin:0 0 18px;font-size:17px;line-height:1.5;color:${C.text};">Hi ${name},</p>
                  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${C.muted};">Thank you for contacting <strong style="color:${C.text};">${brand}</strong>. Your note is safely in our inbox and our team will respond within <strong style="color:${C.text};">24 hours</strong>.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 28px 32px;">
                  <div style="border-radius:14px;background:${C.accentSoft};border:1px solid rgba(251,134,30,0.2);padding:20px 22px;">
                    <p style="margin:0 0 6px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${C.accent};">Need something sooner?</p>
                    <p style="margin:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.6;color:${C.text};">Simply hit <strong>reply</strong> to this email — we&apos;ll prioritize urgent requests.</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 36px 32px;border-top:1px solid ${C.border};">
                  <p style="margin:24px 0 4px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.5;color:${C.text};">Warm regards,</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:${C.text};letter-spacing:-0.02em;">${brand}</p>
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
