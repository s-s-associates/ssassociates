import { getSiteUrl } from "@/lib/site-config";

// Public routes — explicitly allowed for all crawlers
const allowed = ["/", "/about", "/contact", "/services", "/projects", "/home"];

// Private routes — never index
const disallowed = ["/user/", "/api/", "/login", "/setup"];

// AI crawlers that respect robots.txt
const AI_CRAWLERS = [
  "GPTBot",             // OpenAI / ChatGPT
  "ChatGPT-User",       // ChatGPT browsing
  "OAI-SearchBot",      // OpenAI search
  "ClaudeBot",          // Anthropic Claude
  "Claude-Web",         // Anthropic Claude web
  "anthropic-ai",       // Anthropic general
  "PerplexityBot",      // Perplexity AI
  "YouBot",             // You.com
  "cohere-ai",          // Cohere
  "Omgilibot",          // Omgili / Webz.io AI
  "Diffbot",            // Diffbot AI
  "FacebookBot",        // Meta AI training
  "Applebot-Extended",  // Apple AI / Siri
  "Bytespider",         // ByteDance / TikTok AI
  "Googlebot-Extended", // Google AI (Gemini training)
  "CCBot",              // Common Crawl (used by many LLMs)
  "DataForSeoBot",      // DataForSEO AI
  "PetalBot",           // Huawei AI
];

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  const base = getSiteUrl();
  return {
    rules: [
      // Standard search engines + crawlers
      {
        userAgent: "*",
        allow: allowed,
        disallow: disallowed,
      },
      // Explicit rules for every known AI crawler
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: allowed,
        disallow: disallowed,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
