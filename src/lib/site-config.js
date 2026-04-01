/**
 * Canonical site URL for SEO, sitemaps, and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.ssassociates.com).
 */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ssassociates.com";
  return String(raw).replace(/\/+$/, "");
}

/** Max ~160 characters for meta description (search snippet). */
export function truncateMetaDescription(text, maxLen = 160) {
  if (text == null || typeof text !== "string") return "";
  const t = text.trim().replace(/\s+/g, " ");
  if (!t) return "";
  if (t.length <= maxLen) return t;
  const slice = t.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const out = (lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${out}…`;
}

export const SITE_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";

/** Default social preview image when a page has no specific image. */
export function getDefaultOgImagePath() {
  return "/logo.png";
}

/**
 * Optional Search Console / Bing verification (visible as <meta> in page source).
 * Vercel: set in Project → Settings → Environment Variables
 * - GOOGLE_SITE_VERIFICATION or NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (content token only)
 * - BING_SITE_VERIFICATION (msvalidate.01 content)
 */
export function getSearchVerificationMetadata() {
  const google =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim() || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

  if (!google && !bing) return undefined;

  const verification = {};
  if (google) verification.google = google;
  if (bing) verification.other = { "msvalidate.01": bing };
  return verification;
}
