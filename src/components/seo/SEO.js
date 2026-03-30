import {
  buildBreadcrumbListSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildProjectCreativeWorkSchema,
  buildServiceSchema,
  buildWebSiteSchema,
} from "@/lib/seo-schemas";

/**
 * Injects JSON-LD (server-rendered HTML — visible in View Page Source).
 * Pretty-printed for audits; crawlers (Google, Bing) parse the same.
 */
export function JsonLd({ data }) {
  if (data == null) return null;
  const list = Array.isArray(data) ? data : [data];
  if (!list.length) return null;
  return (
    <>
      {list.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `\n${JSON.stringify(schema, null, 2)}\n`,
          }}
        />
      ))}
    </>
  );
}

/**
 * Organization, LocalBusiness, and WebSite — use once in public website layout.
 */
export function GlobalWebsiteJsonLd({ baseUrl, contact = {} }) {
  const schemas = [
    buildOrganizationSchema(baseUrl, contact),
    buildLocalBusinessSchema(baseUrl, contact),
    buildWebSiteSchema(baseUrl),
  ];
  return <JsonLd data={schemas} />;
}

export function ProjectPageJsonLd({ project, baseUrl, path }) {
  const creative = buildProjectCreativeWorkSchema(project, baseUrl, path);
  const crumbs = buildBreadcrumbListSchema(baseUrl, [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title || "Project", path },
  ]);
  return <JsonLd data={[creative, crumbs]} />;
}

export function ServicePageJsonLd({ service, baseUrl, path }) {
  const svc = buildServiceSchema(service, baseUrl, path);
  const crumbs = buildBreadcrumbListSchema(baseUrl, [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title || "Service", path },
  ]);
  return <JsonLd data={[svc, crumbs]} />;
}
