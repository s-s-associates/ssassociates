/**
 * Normalizes sub-category payloads for create/update.
 * Returns an array of { name } objects, trimmed, de-duplicated case-insensitively, empty names dropped.
 */
export function normalizeSubCategories(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const out = [];
  for (const item of raw) {
    const name =
      typeof item === "string"
        ? item.trim()
        : String(item?.name ?? "")
            .trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name });
  }
  return out;
}
