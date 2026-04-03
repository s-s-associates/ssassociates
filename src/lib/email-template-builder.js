/**
 * Builds a beautiful, branded HTML email document for bulk subscriber campaigns.
 * Works in both client-side (preview) and server-side (send) contexts.
 *
 * @param {object} opts
 * @param {string} opts.body        - Plain-text body (newlines → <br>)
 * @param {string} opts.heading     - Email heading / title
 * @param {string} opts.ctaText     - CTA button label (optional)
 * @param {string} opts.ctaUrl      - CTA button URL (optional)
 * @param {string} opts.appUrl      - Absolute base URL of the site (e.g. https://example.com)
 * @param {string} opts.companyName - Display name shown in header & footer
 * @returns {string} Full <!DOCTYPE html> email document
 */
export function buildBrandedEmail({ body, heading, ctaText, ctaUrl, appUrl, companyName }) {
  const BRAND      = "#FB861E";
  const BRAND_DARK = "#c96c10";
  const DARK_BG    = "#111111";
  const company    = companyName || "S&S Associates";
  const logoUrl    = appUrl ? `${appUrl}/logo.png` : "/logo.png";
  const year       = new Date().getFullYear();

  const headingBlock = heading
    ? `<h1 style="margin:0 0 20px 0;font-size:26px;font-weight:800;color:#111827;line-height:1.25;letter-spacing:-0.02em;">${heading}</h1>`
    : "";

  const content = (body || "").replace(/\n/g, "<br>");

  const ctaBlock = ctaText && ctaUrl
    ? `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0 0;">
        <tr>
          <td align="center">
            <a href="${ctaUrl}" target="_blank" rel="noopener"
              style="display:inline-block;padding:15px 36px;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;border-radius:50px;letter-spacing:0.02em;box-shadow:0 4px 14px rgba(251,134,30,0.4);">
              ${ctaText} &rarr;
            </a>
          </td>
        </tr>
      </table>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${heading || company}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
    style="background-color:#f0f2f5;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
          style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background-color:${DARK_BG};padding:0;">
              <!-- Top accent bar -->
              <div style="height:5px;background:linear-gradient(90deg,${BRAND} 0%,#f0c76a 100%);"></div>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:28px 36px 24px 36px;text-align:center;">
                    <!-- Logo -->
                    <a href="${appUrl || '#'}" target="_blank" rel="noopener"
                      style="display:inline-block;text-decoration:none;">
                      <img src="${logoUrl}" alt="${company} logo"
                        width="56" height="56"
                        style="width:56px;height:56px;object-fit:contain;display:block;margin:0 auto 10px auto;border-radius:10px;background:rgba(255,255,255,0.06);" />
                      <span style="display:block;color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.04em;text-transform:uppercase;margin-top:2px;">${company}</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 36px 36px 36px;">
              ${headingBlock}
              <div style="color:#374151;font-size:16px;line-height:1.75;">${content}</div>
              ${ctaBlock}
            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 36px;">
              <div style="height:1px;background-color:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px 36px;border-radius:0 0 20px 20px;text-align:center;">
              <!-- Bottom brand accent -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                style="margin-bottom:14px;">
                <tr>
                  <td align="center">
                    <span style="display:inline-block;width:32px;height:3px;border-radius:2px;background:${BRAND};"></span>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 6px 0;color:#6b7280;font-size:13px;font-weight:600;">${company}</p>
              <p style="margin:0 0 10px 0;color:#9ca3af;font-size:12px;line-height:1.6;">
                You received this email because you subscribed to updates from ${company}.<br/>
                &copy; ${year} ${company}. All rights reserved.
              </p>
              <a href="${appUrl || '#'}" target="_blank" rel="noopener"
                style="color:${BRAND};font-size:12px;text-decoration:none;font-weight:600;">
                Visit our website &rarr;
              </a>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
