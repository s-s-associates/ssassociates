"use client";

import {
  primaryColor,
  primaryLight,
  secondaryDark,
  whiteColor,
} from "@/components/utils/Colors";
import { Box, IconButton, Skeleton, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const CARD_W = 280;
const MOBILE_CARD_W = 270;
const GAP = 20;

function initialsFromTitle(title) {
  const t = String(title || "").trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

function normalizeExternalUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return null;
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  return `https://${raw}`;
}

const cardSx = {
  flexShrink: 0,
  width: `${CARD_W}px`,
  background:
    "linear-gradient(145deg, rgba(18, 22, 32, 0.58) 0%, rgba(12, 16, 24, 0.48) 50%, rgba(22, 18, 14, 0.5) 100%)",
  borderRadius: 3,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
  transition: "box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease, background 0.35s ease",
  "&:hover": {
    border: `1px solid ${primaryColor}`,
    background:
      "linear-gradient(145deg, rgba(18, 22, 32, 0.72) 0%, rgba(12, 16, 24, 0.62) 50%, rgba(22, 18, 14, 0.64) 100%)",
    boxShadow: [
      "0 22px 50px rgba(0, 0, 0, 0.55)",
      "0 12px 36px rgba(251, 134, 30, 0.35)",
      "0 0 48px rgba(251, 134, 30, 0.4)",
      "0 0 88px rgba(251, 134, 30, 0.18)",
    ].join(", "),
    transform: "translateY(-6px)",
  },
};

const logoWellSx = {
  position: "relative",
  width: "100%",
  maxWidth: 230,
  aspectRatio: "1 / 1",
  height: "auto",
  mx: "auto",
  borderRadius: 2,
  bgcolor: "rgba(255, 255, 255, 0.06)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
};

function ClientCard({ client, cardWidth }) {
  const href = normalizeExternalUrl(client?.url);
  const hasImage = client.imageUrl && String(client.imageUrl).trim();

  return (
    <Box
      className="client-card"
      sx={{
        ...cardSx,
        width: `${cardWidth}px`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 1.6, pb: 1.15 }}>
        <Box sx={logoWellSx}>
          {hasImage ? (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                zIndex: 0,
              }}
            >
              <Image
                src={client.imageUrl}
                alt={client.title || "Client"}
                sizes="(max-width: 600px) 220px, 260px"
                width={120}
                height={120}
                loading="lazy"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 0,
                background:
                  "linear-gradient(145deg, rgba(251,134,30,0.22), rgba(255,184,116,0.1), rgba(8,12,20,0.4))",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 28,
                  color: primaryLight,
                  letterSpacing: "-0.02em",
                }}
              >
                {initialsFromTitle(client.title)}
              </Typography>
            </Box>
          )}

          {/* Only the icon opens the URL */}
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => {
                // Prevent slider drag from stealing icon click.
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ textDecoration: "none" }}
            >
              <Tooltip title="Visit Website" placement="top" arrow>
                <Box
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    zIndex: 2,
                    width: 30,
                    height: 30,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(8, 12, 20, 0.62)",
                    border: "1px solid rgba(255, 255, 255, 0.22)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                    transition: "background-color 0.2s ease, border-color 0.2s ease",
                    "&:hover": {
                      bgcolor: primaryColor,
                      borderColor: primaryColor,
                    },
                  }}
                >
                  <OpenInNewRoundedIcon sx={{ fontSize: 18, color: primaryLight }} />
                </Box>
              </Tooltip>
            </Link>
          ) : null}
        </Box>
      </Box>

      <Box
        sx={{
          // px: 2.25,
          pb: 2.25,
          pt: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-app)",
            fontWeight: 700,
            fontSize: { xs: 15, sm: 16 },
            color: whiteColor,
            textAlign: "center",
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {client.title || "Client"}
        </Typography>
        {client.description && String(client.description).trim() ? (
          <Typography
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 500,
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.62)",
              textAlign: "center",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {client.description}
          </Typography>
        ) : (
          <Box sx={{ minHeight: 8 }} />
        )}
      </Box>
    </Box>
  );
}

function ClientCardSkeleton({ cardWidth }) {
  const sk = { bgcolor: "rgba(255,255,255,0.08)" };
  return (
    <Box
      sx={{
        ...cardSx,
        width: `${cardWidth}px`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 1.6, pb: 1.15 }}>
        <Box sx={{ ...logoWellSx, bgcolor: "rgba(255,255,255,0.04)" }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              position: "absolute",
              inset: 10,
              transform: "none",
              ...sk,
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          pb: 2.25,
          pt: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          px: 1.25,
        }}
      >
        <Skeleton
          animation="wave"
          width="82%"
          height={20}
          sx={{ ...sk, mx: "auto", mb: 0.75, bgcolor: "rgba(255,255,255,0.1)" }}
        />
        <Skeleton animation="wave" width="58%" height={16} sx={{ ...sk, mx: "auto" }} />
      </Box>
    </Box>
  );
}

function OurClients() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const dragStartXRef = useRef(0);
  const cardWidth = isSmUp ? CARD_W : MOBILE_CARD_W;
  const step = cardWidth + GAP;
  const visibleCount = isXlUp ? 4 : isLgUp ? 3 : isMdUp ? 2 : isSmUp ? 2 : 1;
  const loopedClients = useMemo(() => {
    if (!clients.length) return [];
    return [...clients, ...clients.slice(0, visibleCount)];
  }, [clients, visibleCount]);

  // ── API fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      try {
        const res = await fetch("/api/clients", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.success && Array.isArray(data.clients)) {
          setClients(data.clients);
        } else {
          setError(data.message || "Could not load clients");
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load clients");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setIsTransitionEnabled(true);
  }, [visibleCount, clients.length]);

  useEffect(() => {
    if (loading || isHoverPaused || isDragging || clients.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2800);
    return () => clearInterval(timer);
  }, [loading, isHoverPaused, isDragging, clients.length]);

  useEffect(() => {
    if (isTransitionEnabled) return undefined;
    const raf = requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [isTransitionEnabled]);

  const handlePrev = () => {
    if (clients.length <= 1) return;
    if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(clients.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setCurrentIndex(clients.length - 1);
        });
      });
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (clients.length <= 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (currentIndex >= clients.length) {
      setIsTransitionEnabled(false);
      setCurrentIndex(0);
    }
  };

  const handlePointerDown = (e) => {
    if (clients.length <= 1) return;
    setIsDragging(true);
    setIsTransitionEnabled(false);
    setDragOffset(0);
    dragStartXRef.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartXRef.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const threshold = step * 0.18;
    const delta = dragOffset;
    setIsDragging(false);
    setDragOffset(0);
    setIsTransitionEnabled(true);
    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 11 },
        overflow: "hidden",
        bgcolor: secondaryDark,
      }}
    >
      {/* Ambient glows */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -90,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.28), transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: -80,
          bottom: -90,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.32), rgba(255,184,116,0.12) 45%, transparent 70%)",
          filter: "blur(3px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-5%", md: "3%" },
          bottom: { xs: "5%", md: "8%" },
          width: { xs: 200, md: 260 },
          height: { xs: 200, md: 260 },
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.18), transparent 65%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 5, md: 6 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            sx={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: primaryColor,
              mb: 1.5,
            }}
          >
            Our Clients
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${primaryColor}, rgba(255,184,116,0.45))`,
              mx: "auto",
              mb: 2.5,
            }}
          />
          <Box
            component="h2"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 800,
              fontSize: { xs: 30, md: 40 },
              lineHeight: 1.12,
              color: whiteColor,
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Trusted by Industry Leaders
          </Box>
          <Typography
            component="p"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 400,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.72)",
              maxWidth: 560,
              mx: "auto",
            }}
          >
            A curated network of clients who rely on us for quality, clarity, and delivery project after project.
          </Typography>
        </Box>
      </Box>

      {/* Slider / states */}
      {loading ? (
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              width: { xs: `${cardWidth + 20}px`, sm: "100%" },
              px: { xs: 1.2, sm: 1.5, md: 2, lg: 2.5 },
              py: { xs: 1.2, sm: 1.5, md: 1.75 },
              mx: "auto",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: `${GAP}px`,
                py: 3,
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              {Array.from({ length: visibleCount }).map((_, i) => (
                <ClientCardSkeleton key={i} cardWidth={cardWidth} />
              ))}
            </Box>
          </Box>
          <Box sx={{ mt: 2.5, display: "flex", justifyContent: "center", gap: 1.5 }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={42}
              height={42}
              sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={42}
              height={42}
              sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
            />
          </Box>
        </Box>
      ) : error ? (
        <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.55)", px: 2, position: "relative", zIndex: 1 }}>
          {error}
        </Typography>
      ) : clients.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.65)", px: 2, position: "relative", zIndex: 1 }}>
          No clients to show yet.
        </Typography>
      ) : (
        <Box
          sx={{ position: "relative", zIndex: 1 }}
          onMouseEnter={() => setIsHoverPaused(true)}
          onMouseLeave={() => setIsHoverPaused(false)}
        >
          {/* Edge fade-out masks */}
          <Box
            sx={{
              position: "absolute", top: 0, bottom: 0, left: 0,
              width: { xs: 56, sm: 88, md: 120 },
              background: `linear-gradient(to right, ${secondaryDark}, rgba(8,12,20,0))`,
              zIndex: 10, pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute", top: 0, bottom: 0, right: 0,
              width: { xs: 56, sm: 88, md: 120 },
              background: `linear-gradient(to left, ${secondaryDark}, rgba(8,12,20,0))`,
              zIndex: 10, pointerEvents: "none",
            }}
          />

          {/* Slider viewport */}
          <Box
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            sx={{
              width: { xs: `${cardWidth+20}px`, sm: "100%" },
              px: { xs: 1.2, sm: 1.5, md: 2, lg: 2.5 },
              py: { xs: 1.2, sm: 1.5, md: 1.75 },
              mx: "auto",
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              touchAction: "pan-y",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: `${GAP}px`,
                py: 3,
                transform: `translateX(${-(currentIndex * step) + dragOffset}px)`,
                transition: isTransitionEnabled && !isDragging
                  ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
                willChange: "transform",
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {loopedClients.map((client, index) => (
                <ClientCard key={`${client._id || "client"}-${index}`} client={client} cardWidth={cardWidth} />
              ))}
            </Box>
          </Box>

          {/* Arrow controls */}
          <Box sx={{ mt: 2.5, display: "flex", justifyContent: "center", gap: 1.5 }}>
            <IconButton
              onClick={handlePrev}
              disabled={clients.length <= 1}
              aria-label="Previous clients"
              sx={{
                width: 42,
                height: 42,
                border: `1px solid ${primaryColor}`,
                color: whiteColor,
                bgcolor: primaryColor,
                "&:hover": { bgcolor: primaryColor, opacity: 0.9, borderColor: primaryColor },
                "&.Mui-disabled": { opacity: 0.35, color: whiteColor, bgcolor: primaryColor },
              }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={clients.length <= 1}
              aria-label="Next clients"
              sx={{
                width: 42,
                height: 42,
                border: `1px solid ${primaryColor}`,
                color: whiteColor,
                bgcolor: primaryColor,
                "&:hover": { bgcolor: primaryColor, opacity: 0.9, borderColor: primaryColor },
                "&.Mui-disabled": { opacity: 0.35, color: whiteColor, bgcolor: primaryColor },
              }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default OurClients;

