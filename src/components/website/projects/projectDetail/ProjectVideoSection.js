"use client";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { primaryColor, primaryLight } from "@/components/utils/Colors";

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
  } catch {
    return null;
  }
  return null;
}

export default function ProjectVideoSection({ videoUrl, title }) {
  const [playing, setPlaying] = useState(false);

  const videoId = getYouTubeId(videoUrl);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, sm: 7, md: 9 },
        px: { xs: 2, sm: 3, md: 5 },
        background: "linear-gradient(160deg, #100c06 0%, #0e0b05 40%, #130e07 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top orange accent bar */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: `linear-gradient(90deg, transparent 0%, ${primaryColor} 30%, ${primaryLight} 50%, ${primaryColor} 70%, transparent 100%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Diagonal hatching texture */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(251, 134, 30, 0.028) 0px,
            rgba(251, 134, 30, 0.028) 1px,
            transparent 1px,
            transparent 18px
          )`,
        }}
      />

      {/* Centered spotlight behind the player */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          maxWidth: 800,
          height: "120%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(251,134,30,0.14) 0%, rgba(251,134,30,0.05) 40%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Left vertical rule */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "15%",
          left: { xs: 12, md: 32 },
          width: "1px",
          height: "70%",
          background: "linear-gradient(180deg, transparent, rgba(251,134,30,0.35) 30%, rgba(251,134,30,0.35) 70%, transparent)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Right vertical rule */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "15%",
          right: { xs: 12, md: 32 },
          width: "1px",
          height: "70%",
          background: "linear-gradient(180deg, transparent, rgba(251,134,30,0.35) 30%, rgba(251,134,30,0.35) 70%, transparent)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Corner tick — top-left */}
      <Box aria-hidden sx={{ position: "absolute", top: 20, left: 20, zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ width: 24, height: "2px", background: `rgba(251,134,30,0.5)` }} />
        <Box sx={{ width: "2px", height: 24, background: `rgba(251,134,30,0.5)`, mt: "-2px" }} />
      </Box>

      {/* Corner tick — top-right */}
      <Box aria-hidden sx={{ position: "absolute", top: 20, right: 20, zIndex: 0, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <Box sx={{ width: 24, height: "2px", background: `rgba(251,134,30,0.5)` }} />
        <Box sx={{ width: "2px", height: 24, background: `rgba(251,134,30,0.5)`, mt: "-2px" }} />
      </Box>

      {/* Corner tick — bottom-left */}
      <Box aria-hidden sx={{ position: "absolute", bottom: 20, left: 20, zIndex: 0, pointerEvents: "none", display: "flex", flexDirection: "column-reverse" }}>
        <Box sx={{ width: 24, height: "2px", background: `rgba(251,134,30,0.5)` }} />
        <Box sx={{ width: "2px", height: 24, background: `rgba(251,134,30,0.5)`, mb: "-2px" }} />
      </Box>

      {/* Corner tick — bottom-right */}
      <Box aria-hidden sx={{ position: "absolute", bottom: 20, right: 20, zIndex: 0, pointerEvents: "none", display: "flex", flexDirection: "column-reverse", alignItems: "flex-end" }}>
        <Box sx={{ width: 24, height: "2px", background: `rgba(251,134,30,0.5)` }} />
        <Box sx={{ width: "2px", height: 24, background: `rgba(251,134,30,0.5)`, mb: "-2px" }} />
      </Box>

      <Box sx={{ maxWidth: 920, mx: "auto", position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <Stack alignItems="center" spacing={1} sx={{ mb: { xs: 4, md: 5.5 }, textAlign: "center" }}>
          <Typography
            sx={{
              color: primaryLight,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Watch it come to life
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: "#f8fafc",
              fontFamily: '"Times New Roman", Georgia, serif',
              fontSize: { xs: 30, sm: 36, md: 42 },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Project Walkthrough
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 3,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
              mt: 0.5,
            }}
          />
          <Typography
            sx={{
              color: "rgba(248,250,252,0.52)",
              fontSize: { xs: 14, sm: 15 },
              maxWidth: 540,
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            A visual journey through the construction process — from groundwork to completion.
          </Typography>
        </Stack>

        {/* Player */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            background: "#000",
            boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {playing ? (
            <Box
              component="iframe"
              src={embedUrl}
              title={`${title || "Project"} video walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />
          ) : (
            <Box
              component={motion.div}
              whileTap={{ scale: 0.995 }}
              onClick={() => setPlaying(true)}
              sx={{
                position: "absolute",
                inset: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover .play-ring": {
                  transform: "scale(1.12)",
                  background: primaryColor,
                  borderColor: primaryColor,
                },
                "&:hover .thumb": { transform: "scale(1.04)" },
                "&:hover .play-label": { opacity: 1 },
              }}
            >
              {/* Thumbnail */}
              <Box
                className="thumb"
                component="img"
                src={thumbnailUrl}
                alt={`${title || "Project"} video thumbnail`}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                }}
              />

              {/* Gradient vignette */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.52) 100%)",
                }}
              />

              {/* Glow behind play button */}
              <Box
                sx={{
                  position: "absolute",
                  width: { xs: 120, md: 160 },
                  height: { xs: 120, md: 160 },
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(251,134,30,0.35) 0%, transparent 70%)`,
                  filter: "blur(20px)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />

              {/* Play button */}
              <Box
                className="play-ring"
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: { xs: 68, md: 84 },
                  height: { xs: 68, md: 84 },
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  transition: "transform 0.35s ease, background 0.35s ease, border-color 0.35s ease",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,255,255,0.06)",
                }}
              >
                <PlayArrowRoundedIcon sx={{ fontSize: { xs: 38, md: 46 }, ml: "4px" }} />
              </Box>

              {/* "Play video" label */}
              <Typography
                className="play-label"
                sx={{
                  position: "absolute",
                  bottom: { xs: 18, md: 26 },
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                  opacity: 0.75,
                  transition: "opacity 0.3s ease",
                }}
              >
                Play video
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
