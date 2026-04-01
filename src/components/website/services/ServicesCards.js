"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Box, Typography, IconButton, useTheme, useMediaQuery, Skeleton, Stack } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { whiteColor, primaryColor } from "@/components/utils/Colors";

const GAP = 2;

const SECTION_TITLE = "Our Services";
const SECTION_DESCRIPTION =
  "SS Associates: A trusted leader in office renovation and integrated design and build services, providing seamless.";


function ServicesCards() {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const scrollRef = useRef(null);
  const containerRef = useRef(null);
  const scrollIndexRef = useRef(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const cardsPerView = isLg ? 4 : isMd ? 3 : isSm ? 2 : 1;
  const maxIndex = Math.max(0, services.length - cardsPerView);
  scrollIndexRef.current = scrollIndex;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load services");
        }
        if (!cancelled) {
          setServices(Array.isArray(data.services) ? data.services : []);
        }
      } catch (e) {
        if (!cancelled) setFetchError(e.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setContainerWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalGap = GAP * Math.max(0, cardsPerView - 1);
  const cardWidth =
    containerWidth > 0 ? (containerWidth - totalGap) / cardsPerView : isLg ? 342 : isMd ? 360 : 280;
  const step = cardWidth + GAP;

  const scrollToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setScrollIndex(clamped);
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({ left: clamped * step, behavior: "smooth" });
      }
    },
    [maxIndex, step]
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || step <= 0) return;
    const index = Math.round(el.scrollLeft / step);
    setScrollIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex, step]);

  useEffect(() => {
    if (services.length === 0 || maxIndex < 1) return;
    const id = setInterval(() => {
      const next = scrollIndexRef.current >= maxIndex ? 0 : scrollIndexRef.current + 1;
      scrollToIndex(next);
    }, 3000);
    return () => clearInterval(id);
  }, [maxIndex, scrollToIndex, services.length]);

  const paginationCount = maxIndex + 1;
  const activeDot = Math.min(scrollIndex, Math.max(0, paginationCount - 1));

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#000",
        color: whiteColor,
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <Box ref={containerRef} sx={{ maxWidth: 1400, mx: "auto" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="start"
          gap={1}
          mb={5}
          
        >
          <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 28, sm: 32, md: 38 },
              lineHeight: 1.2,
              color: whiteColor,
            }}
          >
            {SECTION_TITLE}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: 14, sm: 15 },
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 480,
            }}
          >
            {SECTION_DESCRIPTION}
          </Typography>
        </Stack>

        {fetchError && (
          <Typography sx={{ color: "rgba(255,255,255,0.75)", mb: 2 }}>{fetchError}</Typography>
        )}

        {loading && (
          <Box sx={{ display: "flex", gap: GAP, pb: 1 }}>
            {Array.from({ length: cardsPerView }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                sx={{
                  flex: `0 0 ${cardWidth}px`,
                  minWidth: cardWidth,
                  height: (cardWidth * 4) / 3,
                  bgcolor: "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </Box>
        )}

        {!loading && services.length === 0 && !fetchError && (
          <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>No services to show yet.</Typography>
        )}

        {!loading && services.length > 0 && (
          <>
            <Box
              ref={scrollRef}
              onScroll={handleScroll}
              sx={{
                display: "flex",
                gap: GAP,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
                pb: 1,
              }}
            >
              {services.map((service, index) => (
                <Link
                  key={String(service._id)}
                  href={`/services/${service._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ServiceCard
                    service={service}
                    cardWidth={cardWidth}
                    priority={index < cardsPerView}
                  />
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 4,
                px: 0,
              }}
            >
              <Box sx={{ display: "flex", gap: 0.76, alignItems: "center" }}>
                {Array.from({ length: paginationCount }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: i === activeDot ? 20 : 16,
                      height: 3,
                      borderRadius: 0,
                      backgroundColor: i === activeDot ? primaryColor : "rgba(255,255,255,0.25)",
                      transition: "background-color 0.2s ease, width 0.2s ease",
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  onClick={() => scrollToIndex(scrollIndex - 1)}
                  disabled={scrollIndex <= 0}
                  sx={{
                    width: 44,
                    height: 44,
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "50%",
                    color: whiteColor,
                    "&:hover": {
                      borderColor: whiteColor,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-disabled": {
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <ChevronLeftRoundedIcon sx={{ fontSize: 24 }} />
                </IconButton>
                <IconButton
                  onClick={() => scrollToIndex(scrollIndex + 1)}
                  disabled={scrollIndex >= maxIndex}
                  sx={{
                    width: 44,
                    height: 44,
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: "50%",
                    color: whiteColor,
                    "&:hover": {
                      borderColor: whiteColor,
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-disabled": {
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.3)",
                    },
                  }}
                >
                  <ChevronRightRoundedIcon sx={{ fontSize: 24 }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

function ServiceCard({ service, cardWidth, priority = false }) {
  const [hovered, setHovered] = useState(false);
  const width = typeof cardWidth === "number" && cardWidth > 0 ? cardWidth : 280;
  const imageSrc = service.imageUrl?.trim() || FALLBACK_IMAGE;

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        flex: `0 0 ${width}px`,
        minWidth: width,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        scrollSnapAlign: "start",
        aspectRatio: "3 / 4",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={service.title || "Service"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "50%",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          zIndex: 1,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.25s ease",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.3,
            color: whiteColor,
          }}
        >
          {service.title}
        </Typography>
      </Box>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(251, 134, 30, 0.5) 0%, rgb(251, 134, 30) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 20,
              zIndex: 2,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: 18,
                mb: 2,
                lineHeight: 1.3,
                color: whiteColor,
              }}
            >
              {service.title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {service.description ||
                "Explore this service for full scope, deliverables, and how we support your project."}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ServicesCards;
