import { getSiteUrl } from "@/lib/site-config";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/user/", "/api/", "/login", "/setup"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
