import {
  bggrayColor,
  bordergrayColor,
  primaryColor,
  primaryHover,
} from "@/components/utils/Colors";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiHome, FiMail } from "react-icons/fi";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

function splitToList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value) {
  if (!value) return "N/A";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function getStatusColor(status) {
  if (status === "Completed") return { bg: "rgba(16,185,129,0.16)", color: "#047857" };
  if (status === "Ongoing") return { bg: "rgba(245,158,11,0.18)", color: "#b45309" };
  return { bg: "rgba(99,102,241,0.16)", color: "#4338ca" };
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams?.id || "");
  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: bggrayColor, minHeight: "100vh" }}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 820,
            mx: "auto",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: `1px solid ${bordergrayColor}`,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 1 }}>Project Not Found</Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 3 }}>
            The requested project details are not available in this demo preview.
          </Typography>
          <Link href="/projects" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<FiArrowLeft />}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 2.2,
                "&:hover": { bgcolor: primaryHover },
              }}
            >
              Back to Projects
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  const statusStyle = getStatusColor(project.status);
  const technologyItems = splitToList(project.materialsUsed);
  const featureItems = [
    project.sustainabilityFeatures,
    project.safetyStandards,
    project.certifications,
  ]
    .filter(Boolean)
    .flatMap((text) => splitToList(text));

  return (
    <Box sx={{ p: { xs: 2, sm: 10 }, bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1280, mx: "auto" }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, flexWrap: "wrap", gap: 1.5 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "rgba(0,0,0,0.6)" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "inherit", textDecoration: "none" }}>
              <FiHome size={14} />
              Home
            </Link>
            <Link href="/projects" style={{ color: "inherit", textDecoration: "none" }}>
              Projects
            </Link>
            <Typography sx={{ color: "rgba(0,0,0,0.9)" }}>Details</Typography>
          </Breadcrumbs>

          <Link href="/projects" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<FiArrowLeft />}
              sx={{
                border: `1px solid ${bordergrayColor}`,
                color: "#111",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.08)" },
              }}
            >
              Back to Projects
            </Button>
          </Link>
        </Stack>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
          <Box sx={{ position: "relative", height: { xs: 260, md: 420 }, overflow: "hidden" }}>
            <Box
              component="img"
              src={
                project.bannerUrl && String(project.bannerUrl).trim()
                  ? project.bannerUrl
                  : "/images/projects/thumbnail-min.webp"
              }
              alt={project.title || "Project"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s ease",
                "&:hover": { transform: "scale(1.04)" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 12%, rgba(0,0,0,0.2) 58%, transparent 100%)",
              }}
            />
            <Box sx={{ position: "absolute", left: { xs: 16, md: 28 }, right: { xs: 16, md: 28 }, bottom: { xs: 16, md: 24 }, color: "#fff" }}>
              <Stack direction="row" spacing={1} sx={{ mb: 1.2, flexWrap: "wrap" }}>
                <Chip label={project.category || "Uncategorized"} size="small" sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }} />
                <Chip label={project.status} size="small" sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700 }} />
              </Stack>
              <Typography sx={{ fontSize: { xs: 26, md: 42 }, fontWeight: 800, lineHeight: 1.12 }}>{project.title}</Typography>
              <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.92, mt: 0.8 }}>{project.tagline || project.location}</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1.2, flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 13 }}>Client: {project.clientName || "N/A"}</Typography>
                <Typography sx={{ fontSize: 13 }}>Duration: {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}</Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.2 }}>Overview</Typography>
              <Typography sx={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.75 }}>{project.description || "No description provided."}</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Features</Typography>
              {featureItems.length ? (
                <Grid container spacing={1.4}>
                  {featureItems.map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item}>
                      <Box
                        sx={{
                          p: 1.4,
                          borderRadius: 2,
                          bgcolor: "#fff",
                          border: `1px solid ${bordergrayColor}`,
                          transition: "all 0.25s ease",
                          "&:hover": { borderColor: primaryColor, transform: "translateY(-2px)" },
                        }}
                      >
                        <Typography sx={{ color: "rgba(0,0,0,0.75)", fontSize: 14 }}>{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No feature entries available.</Typography>
              )}
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Technologies</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {technologyItems.length ? (
                  technologyItems.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: "rgba(251,134,30,0.1)", color: "#9a4a08", fontWeight: 600 }} />
                  ))
                ) : (
                  <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No material/technology details available.</Typography>
                )}
              </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
              <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Image Gallery</Typography>
              <Grid container spacing={1.5}>
                {(project.imageGallery || []).map((url, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${url}-${index}`}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: `1px solid ${bordergrayColor}`,
                        height: 180,
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={url}
                        alt={`${project.title} ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.45s ease",
                          "&:hover": { transform: "scale(1.06)" },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.2 }}>Project Meta</Typography>
              <MetaRow label="Client" value={project.clientName} />
              <MetaRow label="Category" value={project.category} />
              <MetaRow label="Status" value={project.status} />
              <MetaRow label="Year" value={project.year} />
              <MetaRow label="Location" value={project.location} />
              <MetaRow label="Area" value={`${project.projectArea || "N/A"} ${project.projectAreaUnit || ""}`} />
              <MetaRow label="Budget" value={project.budget} />
              <MetaRow label="Structure Type" value={project.structureType} />
              <MetaRow label="Floors" value={project.floors} />
              <MetaRow label="Foundation Type" value={project.foundationType} />
              <MetaRow label="Duration Start" value={formatDate(project.durationStart)} />
              <MetaRow label="Duration End" value={formatDate(project.durationEnd)} />
              <MetaRow label="Video URL" value={project.videoUrl || "N/A"} isLink />
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1.4 }}>Actions</Typography>
              <Stack spacing={1.2}>
                <Link href="/contact" style={{ textDecoration: "none" }}>
                  <Button
                    fullWidth
                    startIcon={<FiMail />}
                    sx={{
                      bgcolor: primaryColor,
                      color: "#fff",
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { bgcolor: primaryHover },
                    }}
                  >
                    Contact
                  </Button>
                </Link>
                <Link
                  href={project.ctaLink || "https://example.com/live"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    fullWidth
                    startIcon={<FiExternalLink />}
                    sx={{
                      border: `1px solid ${bordergrayColor}`,
                      color: "#111",
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.08)" },
                    }}
                  >
                    View Live
                  </Button>
                </Link>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function MetaRow({ label, value, isLink = false }) {
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
