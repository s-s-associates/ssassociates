/** Split a string into non-empty trimmed lines (handles `\n` and `\r\n`). */
function linesFromString(str) {
  return String(str ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Normalize challenges/solutions from DB: legacy string, string[], or array entries with embedded newlines.
 * Each `\n` starts a new logical line / bullet.
 */
export function toStringArray(val) {
  const out = [];
  if (Array.isArray(val)) {
    for (const item of val) {
      out.push(...linesFromString(item));
    }
    return out;
  }
  if (typeof val === "string" && val.trim()) {
    return linesFromString(val);
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

/**
 * Backward-compatible DB payload:
 * - If schema path is String (legacy runtime model), join lines into one string.
 * - Otherwise keep as string[] (current model shape).
 */
export function toStoredProjectListValue(lines, schemaPathInstance) {
  const normalized = toStringArray(lines);
  if (schemaPathInstance === "String") {
    return normalized.join("\n");
  }
  return normalized;
}
