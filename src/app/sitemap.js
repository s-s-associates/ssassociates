import { getSiteUrl } from "@/lib/site-config";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Service from "@/models/Service";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default async function sitemap() {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    // Path segment contains & — must be %26 in sitemap XML <loc> (bare & breaks XML)
    { url: `${base}/terms-%26-conditions`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const dynamic = [];

  try {
    await connectDB();
    const [services, projects] = await Promise.all([
      Service.find({}).select("_id updatedAt createdAt").lean(),
      Project.find({}).select("_id updatedAt createdAt").lean(),
    ]);

    for (const s of services) {
      const id = s._id?.toString?.() || s._id;
      if (!id) continue;
      const lastMod = s.updatedAt || s.createdAt || now;
      dynamic.push({
        url: `${base}/services/${id}`,
        lastModified: lastMod instanceof Date ? lastMod : new Date(lastMod),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const p of projects) {
      const id = p._id?.toString?.() || p._id;
      if (!id) continue;
      const lastMod = p.updatedAt || p.createdAt || now;
      dynamic.push({
        url: `${base}/projects/${id}`,
        lastModified: lastMod instanceof Date ? lastMod : new Date(lastMod),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch (err) {
    console.warn("[sitemap] Dynamic URLs omitted (DB unavailable):", err?.message || err);
  }

  return [...staticRoutes, ...dynamic];
}
