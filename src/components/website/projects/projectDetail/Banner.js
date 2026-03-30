import { Box, Breadcrumbs, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { getStatusColor } from "./projectDetailHelpers";
import { primaryBg, primaryColor } from "@/components/utils/Colors";
import { bannerHeadingSize, bannerSubHeadingSize } from "@/components/utils/Sizes";

/** Top padding so breadcrumbs sit below the fixed navbar (see Navbar ~minHeight 56 + py). */
const NAV_OFFSET = { xs: 9, sm: 10 };

export default function Banner({ project }) {
  const statusStyle = getStatusColor(project.status);
  const bgUrl =
    project.bannerUrl && String(project.bannerUrl).trim()
      ? project.bannerUrl
      : "/images/projects/thumbnail-min.webp";

  const subtitle = (project.tagline || "").trim();
  const locationText = (project.location || "Lahore, PK").trim();
  const yearText =
    (project.year && String(project.year).trim()) ||
    (() => {
      if (!project.durationStart) return "2025";
      const d = new Date(project.durationStart);
      return Number.isNaN(d.getTime()) ? "2025" : String(d.getFullYear());
    })();

  return (
    <Box
      component="section"
      aria-label="Project hero"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "74vh", md: "80vh" },
        maxHeight: { xs: "74vh", md: "80vh" },
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
            "linear-gradient(112deg, rgba(8,18,44,0.78) 0%, rgba(8,18,44,0.58) 38%, rgba(8,18,44,0.44) 58%, rgba(8,18,44,0.38) 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
          "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 46%, rgba(0,0,0,0.18) 72%, transparent 100%)",
        }}
        />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          mt: 10,
          maxHeight: { xs: "74vh", md: "80vh" },
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          px: { xs: 2.5, sm: 4, md: 7, lg: 9 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            pt: NAV_OFFSET,
            pb: { xs: 2, md: 3 },
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

        <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", pb: { xs: 5, md: 7 } }}>
          <Box sx={{ color: "#fff" }}>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Chip
                label={project.category || "Uncategorized"}
                size="small"
                sx={{
                  bgcolor: primaryBg,
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              />
              <Chip
                label={project.status}
                size="small"
                sx={{
                  bgcolor: statusStyle.bg,
                  color: statusStyle.color,
                  fontWeight: 700,
                  border: `1px solid ${statusStyle.color}`,
                }}
              />
            </Stack>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Times New Roman", Georgia, serif',
                fontSize: bannerHeadingSize.fontSize,
                fontWeight: bannerHeadingSize.fontWeight,
                lineHeight: bannerHeadingSize.lineHeight,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              {project.title}
            </Typography>
            {subtitle ? (
              <Typography
                sx={{
                  fontSize: bannerSubHeadingSize.fontSize,
                  fontWeight: bannerSubHeadingSize.fontWeight,
                  lineHeight: bannerSubHeadingSize.lineHeight,
                  opacity: 0.94,
                  mt: 1.8,
                  fontStyle: "italic",
                  color: "rgba(230,238,255,0.85)",
                }}
              >
                {subtitle}
              </Typography>
            ) : null}
            <Stack direction="row" spacing={2.8} sx={{ mt: 2.5, flexWrap: "wrap", gap: 1.5 }}>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FiMapPin size={14} color="#fb8a1e" />
                <Typography sx={{ fontSize: 17, color: "rgba(255,255,255,0.82)" }}>{locationText}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <FiCalendar size={14} color="#fb8a1e" />
                <Typography sx={{ fontSize: 17, color: "rgba(255,255,255,0.82)" }}>{yearText}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
