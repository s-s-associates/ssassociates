import { getStructuredDataKeywordsString, SITE_KNOWS_ABOUT } from "@/lib/seo-keywords";
import { getDefaultOgImagePath, SITE_NAME, truncateMetaDescription } from "@/lib/site-config";

const ORGANIZATION_DESCRIPTION = truncateMetaDescription(
  "S&S Associates provides residential and commercial construction, grey structure, fit-outs, and project management across Pakistan — quality-driven building solutions from planning to handover.",
  320
);

function contactFromEnv() {
  const sameAs = [
    process.env.NEXT_PUBLIC_COMPANY_FACEBOOK,
    process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM,
    process.env.NEXT_PUBLIC_COMPANY_LINKEDIN,
    process.env.NEXT_PUBLIC_COMPANY_WHATSAPP,
  ].filter(Boolean);
  return {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || undefined,
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || undefined,
    streetAddress: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

/** Default geo — street line comes from env when set. */
const LOCAL_BUSINESS = {
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  postalCode: "",
  addressCountry: "PK",
};

function openingHoursFromEnv() {
  const raw = process.env.NEXT_PUBLIC_WORKING_HOURS?.trim();
  if (!raw) return undefined;
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ];
}

/**
 * @param {string} baseUrl
 * @param {{ email?: string, phone?: string, streetAddress?: string, sameAs?: string[] }} contact — overrides env
 */
export function buildOrganizationSchema(baseUrl, contact = {}) {
  const env = contactFromEnv();
  const merged = {
    email: contact.email ?? env.email,
    phone: contact.phone ?? env.phone,
    streetAddress: contact.streetAddress ?? env.streetAddress,
    sameAs: contact.sameAs ?? env.sameAs,
  };
  const logo = `${baseUrl}${getDefaultOgImagePath()}`;
  const kw = getStructuredDataKeywordsString(10000);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: ORGANIZATION_DESCRIPTION,
    url: baseUrl,
    logo: { "@type": "ImageObject", url: logo },
    keywords: kw,
    knowsAbout: SITE_KNOWS_ABOUT,
    ...(merged.email ? { email: merged.email } : {}),
    ...(merged.phone ? { telephone: merged.phone } : {}),
    ...(merged.sameAs?.length ? { sameAs: merged.sameAs } : {}),
  };
}

export function buildLocalBusinessSchema(baseUrl, contact = {}) {
  const env = contactFromEnv();
  const merged = {
    email: contact.email ?? env.email,
    phone: contact.phone ?? env.phone,
    streetAddress: contact.streetAddress ?? env.streetAddress,
  };
  const org = buildOrganizationSchema(baseUrl, contact);
  const openingHoursSpecification = openingHoursFromEnv();
  const kw = getStructuredDataKeywordsString(10000);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: ORGANIZATION_DESCRIPTION,
    image: org.logo?.url,
    url: baseUrl,
    keywords: kw,
    knowsAbout: SITE_KNOWS_ABOUT,
    ...(merged.email ? { email: merged.email } : {}),
    ...(merged.phone ? { telephone: merged.phone } : {}),
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
    address: {
      "@type": "PostalAddress",
      ...(merged.streetAddress ? { streetAddress: merged.streetAddress } : {}),
      addressLocality: LOCAL_BUSINESS.addressLocality,
      addressRegion: LOCAL_BUSINESS.addressRegion,
      postalCode: LOCAL_BUSINESS.postalCode || undefined,
      addressCountry: LOCAL_BUSINESS.addressCountry,
    },
  };
}

export function buildWebSiteSchema(baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: ORGANIZATION_DESCRIPTION,
    url: baseUrl,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * @param {{ name: string, path: string }[]} items — path without domain
 */
export function buildBreadcrumbListSchema(baseUrl, items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * CreativeWork-style schema for portfolio project pages (Mongo Project shape).
 * @param {object} project — lean project with title, description, dates, bannerUrl, imageGallery, videoUrl
 * @param {string} baseUrl
 * @param {string} path — e.g. /projects/abc123
 */
export function buildProjectCreativeWorkSchema(project, baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const images = [];
  if (project.bannerUrl) images.push(project.bannerUrl);
  if (Array.isArray(project.imageGallery)) {
    project.imageGallery.forEach((u) => {
      if (u && !images.includes(u)) images.push(u);
    });
  }
  const datePublished = project.createdAt ? new Date(project.createdAt).toISOString() : undefined;
  const dateModified = project.updatedAt ? new Date(project.updatedAt).toISOString() : datePublished;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title || "Project",
    headline: project.tagline || undefined,
    description: truncateForSchema(project.description || project.tagline || ""),
    url,
    image: images.length ? images : undefined,
    ...(project.videoUrl ? { associatedMedia: { "@type": "VideoObject", contentUrl: project.videoUrl } } : {}),
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    provider: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    ...(project.location ? { locationCreated: { "@type": "Place", name: project.location } } : {}),
  };
}

function truncateForSchema(text, max = 500) {
  if (!text || typeof text !== "string") return undefined;
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export function buildServiceSchema(service, baseUrl, path) {
  const url = `${baseUrl}${path}`;
  const img = service.imageUrl || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title || "Service",
    description: truncateForSchema(service.description || ""),
    url,
    provider: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    ...(img ? { image: img } : {}),
  };
}
