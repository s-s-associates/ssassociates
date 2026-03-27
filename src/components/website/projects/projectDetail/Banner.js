import { Box, Breadcrumbs, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { formatDate, getStatusColor } from "./projectDetailHelpers";

/** Top padding so breadcrumbs sit below the fixed navbar (see Navbar ~minHeight 56 + py). */
const NAV_OFFSET = { xs: 9, sm: 10 };

export default function Banner({ project }) {
  const statusStyle = getStatusColor(project.status);
  const bgUrl =
    project.bannerUrl && String(project.bannerUrl).trim()
      ? project.bannerUrl
      : "/images/projects/thumbnail-min.webp";

  const subtitle = project.tagline || project.location;

  return (
    <Box
      component="section"
      aria-label="Project hero"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        maxHeight: "80vh",
        overflow: "hidden",
        mt: 0,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <Box
          component="img"
          src={bgUrl}
          alt={project.title || "Project"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.7s ease",
            "&:hover": { transform: "scale(1.03)" },
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(8,12,20,0.78) 0%, rgba(8,12,20,0.45) 55%, rgba(8,12,20,0.35) 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "80vh",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 5 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            pt: NAV_OFFSET,
            pb: 2,
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "rgba(255,255,255,0.82)",
              "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.45)" },
              maxWidth: "100%",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <FiHome size={14} />
              Home
            </Link>
            <Link href="/projects" style={{ color: "inherit", textDecoration: "none" }}>
              Projects
            </Link>
            <Typography
              component="span"
              title={project.title || "Project"}
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontWeight: 600,
                maxWidth: { xs: "min(100%, 52vw)", sm: 420, md: 560 },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "inline-block",
                verticalAlign: "bottom",
              }}
            >
              {project.title || "Project"}
            </Typography>
          </Breadcrumbs>
        </Stack>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", pb: { xs: 4, md: 6 } }}>
          <Box sx={{ color: "#fff", maxWidth: 900 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: "wrap", gap: 1 }}>
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
            <Typography component="h1" sx={{ fontSize: { xs: 28, sm: 36, md: 46 }, fontWeight: 800, lineHeight: 1.12 }}>
              {project.title}
            </Typography>
            {subtitle ? (
              <Typography sx={{ fontSize: { xs: 15, md: 17 }, opacity: 0.95, mt: 1.2, lineHeight: 1.45 }}>
                {subtitle}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap", gap: 1 }}>
              <Typography sx={{ fontSize: 14, opacity: 0.95 }}>Client: {project.clientName || "N/A"}</Typography>
              <Typography sx={{ fontSize: 14, opacity: 0.95 }}>
                Duration: {formatDate(project.durationStart)} - {formatDate(project.durationEnd)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
