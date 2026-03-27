export function splitToList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatDate(value) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function getStatusColor(status) {
  if (status === "Completed") return { bg: "rgba(16,185,129,0.16)", color: "#047857" };
  if (status === "Ongoing") return { bg: "rgba(245,158,11,0.18)", color: "#b45309" };
  return { bg: "rgba(99,102,241,0.16)", color: "#4338ca" };
}

export function buildFeatureItems(project) {
  return [project.sustainabilityFeatures, project.safetyStandards, project.certifications]
    .filter(Boolean)
    .flatMap((text) => splitToList(text));
}
