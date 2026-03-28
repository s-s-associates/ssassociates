export function clampRating(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(5, Math.max(0, n));
}

export function trimText(value) {
  return String(value ?? "").trim();
}

export function normalizeTestimonialBody(body) {
  const payload = body && typeof body === "object" ? body : {};
  return {
    clientName: trimText(payload.clientName),
    role: trimText(payload.role),
    companyName: trimText(payload.companyName),
    content: trimText(payload.content),
    imageUrl: trimText(payload.imageUrl),
    rating: clampRating(payload.rating),
  };
}

export function validateRequiredTestimonialFields(values) {
  if (!values.clientName) return "Client name is required";
  if (!values.content) return "Content/quote is required";
  return null;
}
