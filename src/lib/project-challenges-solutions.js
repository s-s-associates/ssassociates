/**
 * Normalize challenges/solutions from DB: supports legacy string or string[].
 */
export function toStringArray(val) {
  if (Array.isArray(val)) {
    return val.map((s) => String(s ?? "").trim()).filter(Boolean);
  }
  if (typeof val === "string" && val.trim()) {
    return [val.trim()];
  }
  return [];
}

export function normalizeProjectChallengesSolutions(project) {
  if (!project || typeof project !== "object") return project;
  return {
    ...project,
    challengesFaced: toStringArray(project.challengesFaced),
    solutionsImplemented: toStringArray(project.solutionsImplemented),
  };
}
