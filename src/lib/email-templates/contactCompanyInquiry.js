import { escapeHtml } from "./escapeHtml";

/** Brand-aligned colors for HTML emails (inline-safe). */
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
  rowAlt: "#f8fafc",
};

/**
 * Notification email sent to RECIPIENT_EMAIL with full form details.
 * @param {{ fullName: string, email: string, companyName: string, phone: string, address: string, message: string }} payload
 * @returns {{ text: string, html: string }}
 */
export function getCompanyInquiryEmail(payload) {
  const {
    fullName,
    email,
    companyName,
    phone,
    address,
    message,
  } = payload;

  const rows = [
    ["Full name", fullName],
    ["Email", email],
    ["Company", companyName || "—"],
    ["Phone", phone],
    ["Address", address || "—"],
    ["Message", message],
  ];

  const text = [
    "New message from the website contact form.",
    "",
    ...rows.map(([label, val]) => `${label}: ${val || "—"}`),
  ].join("\n");

  const rowHtml = rows
    .map(([label, val], i) => {
      const bg = i % 2 === 0 ? C.rowAlt : C.card;
      return `
        <tr>
          <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};vertical-align:top;width:132px;background:${bg};border-bottom:1px solid ${C.border};">
            ${escapeHtml(label)}
          </td>
          <td style="padding:14px 18px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.55;color:${C.text};vertical-align:top;background:${bg};border-bottom:1px solid ${C.border};">
            <span style="white-space:pre-wrap;">${escapeHtml(val || "—")}</span>
          </td>
        </tr>`;
    })
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${C.pageBg};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${C.pageBg};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
        <tr>
          <td style="background:linear-gradient(145deg,${C.headerSub} 0%,${C.headerDark} 100%);border-radius:18px 18px 0 0;padding:0;overflow:hidden;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="height:5px;background:linear-gradient(90deg,${C.accent} 0%,#ffb366 50%,${C.accent} 100%);"></td>
              </tr>
              <tr>
                <td style="padding:28px 28px 24px 28px;text-align:left;">
                  <p style="margin:0 0 6px;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;">Website · Contact form</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;letter-spacing:-0.03em;color:#ffffff;line-height:1.2;">New inquiry</p>
                  <p style="margin:12px 0 0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#cbd5e1;">Someone reached out through your site. Reply directly to this email to respond to them.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${C.card};padding:0;border-radius:0 0 18px 18px;box-shadow:0 12px 40px rgba(15,23,42,0.1);">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              ${rowHtml}
            </table>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding:20px 24px 28px 24px;">
                  <div style="border-radius:12px;background:${C.accentSoft};border:1px solid rgba(251,134,30,0.25);padding:16px 18px;">
                    <p style="margin:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.55;color:${C.text};">
                      <strong style="color:${C.accent};">Tip:</strong> Use <strong>Reply</strong> in your mail client — the visitor&apos;s address is set as the reply-to.
                    </p>
                  </div>
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

  return { text, html };
}
