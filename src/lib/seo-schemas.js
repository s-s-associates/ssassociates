import { getDefaultOgImagePath, getSiteUrl, SITE_NAME } from "@/lib/site-config";

/** Adjust to real business address / geo when available. */
const LOCAL_BUSINESS = {
  streetAddress: "",
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  postalCode: "",
  addressCountry: "PK",
};

/**
 * @param {string} baseUrl
 * @param {{ email?: string, phone?: string }} contact
 */
export function buildOrganizationSchema(baseUrl, contact = {}) {
  const logo = `${baseUrl}${getDefaultOgImagePath()}`;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: baseUrl,
    logo: { "@type": "ImageObject", url: logo },
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
  };
}

export function buildLocalBusinessSchema(baseUrl, contact = {}) {
  const org = buildOrganizationSchema(baseUrl, contact);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: org.logo?.url,
    url: baseUrl,
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: LOCAL_BUSINESS.streetAddress || undefined,
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
