import { bordergrayColor } from "@/components/utils/Colors";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { formatDate } from "./projectDetailHelpers";

function FactRow({ label, value, isLink = false }) {
  const safe = value || "N/A";
  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ py: 1 }}>
        <Typography sx={{ color: "rgba(0,0,0,0.58)", fontSize: 13 }}>{label}</Typography>
        {isLink && typeof safe === "string" && safe.startsWith("http") ? (
          <Link href={safe} target="_blank" rel="noopener noreferrer" style={{ color: "#0f172a", fontWeight: 600, fontSize: 13 }}>
            Open
          </Link>
        ) : (
          <Typography sx={{ color: "#111", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{safe}</Typography>
        )}
      </Stack>
      <Divider />
    </>
  );
}

/** Sidebar panel: project specifications & key facts (formerly "Project Meta"). */
export default function ProjectFactsPanel({ project }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.2 }}>Project facts</Typography>
      <FactRow label="Client" value={project.clientName} />
      <FactRow label="Category" value={project.category} />
      <FactRow label="Status" value={project.status} />
      <FactRow label="Year" value={project.year} />
      <FactRow label="Location" value={project.location} />
      <FactRow label="Area" value={`${project.projectArea || "N/A"} ${project.projectAreaUnit || ""}`} />
      <FactRow label="Budget" value={project.budget} />
      <FactRow label="Structure Type" value={project.structureType} />
      <FactRow label="Floors" value={project.floors} />
      <FactRow label="Foundation Type" value={project.foundationType} />
      <FactRow label="Duration Start" value={formatDate(project.durationStart)} />
      <FactRow label="Duration End" value={formatDate(project.durationEnd)} />
      <FactRow label="Video URL" value={project.videoUrl || "N/A"} isLink />
    </Paper>
  );
}
