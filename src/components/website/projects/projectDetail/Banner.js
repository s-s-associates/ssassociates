import { bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import { Box, Breadcrumbs, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { formatDate, getStatusColor } from "./projectDetailHelpers";

export default function Banner({ project }) {
  const statusStyle = getStatusColor(project.status);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2, flexWrap: "wrap", gap: 1.5 }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "rgba(0,0,0,0.6)" }}>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "inherit", textDecoration: "none" }}
          >
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
          <Box
            sx={{
              position: "absolute",
              left: { xs: 16, md: 28 },
              right: { xs: 16, md: 28 },
              bottom: { xs: 16, md: 24 },
              color: "#fff",
            }}
          >
            <Stack direction="row" spacing={1} sx={{ mb: 1.2, flexWrap: "wrap" }}>
              <Chip
                label={project.category || "Uncategorized"}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }}
              />
              <Chip
                label={project.status}
                size="small"
                sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 700 }}
              />
            </Stack>
            <Typography sx={{ fontSize: { xs: 26, md: 42 }, fontWeight: 800, lineHeight: 1.12 }}>{project.title}</Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.92, mt: 0.8 }}>
              {project.tagline || project.location}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1.2, flexWrap: "wrap" }}>
              <Typography sx={{ fontSize: 13 }}>Client: {project.clientName || "N/A"}</Typography>
              <Typography sx={{ fontSize: 13 }}>
                Duration: {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </>
  );
}
