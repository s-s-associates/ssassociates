/**
 * Normalizes request body to match Service model schema.
 * Single source of truth for services API – aligns with src/models/Service.js
 */

export function normalizeServiceBody(body) {
  if (!body || typeof body !== "object") {
    return getEmptyServiceFields();
  }
  return {
    title: (body.title ?? "").trim(),
    description: (body.description ?? "").trim(),
    imageUrl: (body.imageUrl ?? "").trim(),
    whatYouGet: Array.isArray(body.whatYouGet)
      ? body.whatYouGet.map((s) => String(s).trim()).filter(Boolean)
      : [],
    extraBenefits: Array.isArray(body.extraBenefits)
      ? body.extraBenefits.map((s) => String(s).trim()).filter(Boolean)
      : [],
    conclusion: (body.conclusion ?? "").trim(),
    subServices: (() => {
      const raw = body.subServices;
      if (!Array.isArray(raw)) return [];
      return raw.map((s) => ({
        title: String(s?.title ?? "").trim(),
        description: String(s?.description ?? "").trim(),
        items: Array.isArray(s?.items)
          ? s.items.map((i) => String(i).trim()).filter(Boolean)
          : [],
      }));
    })(),
  };
}

export function getEmptyServiceFields() {
  return {
    title: "",
    description: "",
    imageUrl: "",
    whatYouGet: [],
    extraBenefits: [],
    conclusion: "",
    subServices: [],
  };
}

/** Validate required fields for create/update. Returns null if valid, else error message. */
export function validateServiceBody(normalized) {
  if (!(normalized.title || "").trim()) {
    return "Title is required";
  }
  return null;
}
