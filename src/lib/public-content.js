/**
 * Server-only data loaders for public marketing pages.
 * Mirrors GET /api/* logic so content can be rendered in RSC/SSR HTML (crawlable),
 * without a client-side round trip to the same origin.
 */
import { connectDB } from "@/lib/db";
import { normalizeProjectChallengesSolutions } from "@/lib/project-challenges-solutions";
import Faq from "@/models/Faq";
import Project from "@/models/Project";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";

function serialize(docs) {
  return JSON.parse(JSON.stringify(docs ?? []));
}

export async function getPublicServices() {
  try {
    await connectDB();
    const services = await Service.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return serialize(services);
  } catch (e) {
    console.error("[public-content] getPublicServices", e);
    return [];
  }
}

export async function getPublicProjects() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    const normalized = projects.map((p) => normalizeProjectChallengesSolutions(p));
    return serialize(normalized);
  } catch (e) {
    console.error("[public-content] getPublicProjects", e);
    return [];
  }
}

function sortTestimonialsServer(list) {
  return [...list].sort((a, b) => {
    const oa = typeof a.order === "number" ? a.order : 9999;
    const ob = typeof b.order === "number" ? b.order : 9999;
    if (oa !== ob) return oa - ob;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

export async function getPublicTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return serialize(sortTestimonialsServer(testimonials));
  } catch (e) {
    console.error("[public-content] getPublicTestimonials", e);
    return [];
  }
}

export async function getPublicFaqs() {
  try {
    await connectDB();
    const faqs = await Faq.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return serialize(faqs);
  } catch (e) {
    console.error("[public-content] getPublicFaqs", e);
    return [];
  }
}
