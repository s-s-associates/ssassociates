"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  Chip,
  Skeleton,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { primaryBg, primaryColor, primaryHover, primaryLight, secondaryDark, textGrayDark, textGrayLight, whiteColor } from "@/components/utils/Colors";

function normalizeExternalUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return null;
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  return `https://${raw}`;
}

function PartnerLogo({ src, alt }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt || "Partner"}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "8px",
        filter: "brightness(1.05) contrast(1.05)",
        transition: "transform 0.3s ease",
      }}
    />
  );
}

export default function OurPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [slideDirection, setSlideDirection] = useState("right");
  const trackRef = useRef(null);
  const nextRef = useRef(() => {});
  const activeIndexRef = useRef(0);
  /** Card width in horizontal slider; `md+` uses a wider logo column */
  const slideCardWidth = { xs: 320, sm: 380, md: 520 };
  /** Inline padding so first/last slides can snap to viewport center */
  const slideTrackPaddingX = {
    xs: "max(16px, calc((100% - 320px) / 2))",
    sm: "max(16px, calc((100% - 380px) / 2))",
    md: "max(16px, calc((100% - 520px) / 2))",
  };
  const AUTO_SLIDE_MS = 3000;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setFetchError(null);
      try {
        const res = await fetch("/api/partners", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.success && Array.isArray(data.partners)) {
          setPartners(data.partners);
          setActiveIndex(0);
        } else {
          setFetchError(data.message || "Could not load partners");
        }
      } catch (e) {
        if (!cancelled) setFetchError(e.message || "Failed to load partners");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= partners.length && partners.length > 0) {
      setActiveIndex(0);
    }
  }, [partners.length, activeIndex]);

  const scrollToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const run = () => {
      const t = trackRef.current;
      if (!t) return;
      const slides = t.querySelectorAll("[data-slide]");
      const slide = slides[index];
      if (!slide) return;
      const tRect = t.getBoundingClientRect();
      const sRect = slide.getBoundingClientRect();
      const delta =
        sRect.left + sRect.width / 2 - (tRect.left + tRect.width / 2);
      t.scrollBy({ left: delta, behavior: "smooth" });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  };

  const goTo = (index, direction = "right") => {
    if (!partners.length) return;
    const len = partners.length;
    const wrapped = ((index % len) + len) % len;
    if (wrapped === activeIndexRef.current) return;
    setSlideDirection(direction);
    setContentVisible(false);
    setTimeout(() => {
      setActiveIndex(wrapped);
      activeIndexRef.current = wrapped;
      setContentVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToSlide(wrapped));
      });
    }, 260);
  };

  const prev = () => {
    if (!partners.length) return;
    const current = activeIndexRef.current;
    const newIndex = (current - 1 + partners.length) % partners.length;
    goTo(newIndex, "left");
  };

  const next = () => {
    if (!partners.length) return;
    const current = activeIndexRef.current;
    const newIndex = (current + 1) % partners.length;
    goTo(newIndex, "right");
  };

  nextRef.current = next;

  useEffect(() => {
    if (partners.length <= 1) return undefined;
    const id = setInterval(() => nextRef.current(), AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [partners.length]);

  /** Center the active card after data loads (padding + layout need a frame) */
  useEffect(() => {
    if (!partners.length) return undefined;
    const id = window.setTimeout(() => scrollToSlide(activeIndexRef.current), 150);
    return () => window.clearTimeout(id);
  }, [partners.length]);

  const partner = partners[activeIndex];
  const websiteHref = partner ? normalizeExternalUrl(partner.url) : null;

  return (
    <Box
      component="section"
      sx={{
        background: secondaryDark,
        py: { xs: 8, md: 10 },
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Section heading */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: "center", width: "100%" }}>
          <Typography
            variant="overline"
            sx={{
              color: primaryColor,
              letterSpacing: 4,
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "block",
              mb: 1,
            }}
          >
            Trusted By
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: whiteColor,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.2,
              "& span": { color: primaryColor },
            }}
          >
            {/* Our <span>Collaborators</span> */}
            Our Consultants & Architects
          </Typography>
          <Typography
            sx={{
              color: textGrayLight,
              mt: 2,
              maxWidth: 520,
              mx: "auto",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            We collaborate with industry leaders who share our vision for
            innovation and excellence.
          </Typography>
        </Box>

        {loading ? (
          <Box
            mt={-5}
            py={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 5, md: 8 },
              alignItems: { xs: "center", md: "center" },
              justifyContent: "center",
              width: "100%",
              maxWidth: { xs: "100%", md: 1280 },
              mx: "auto",
            }}
          >
            <Box
              sx={{
                order: { xs: 2, md: 0 },
                flex: { md: "0 0 auto" },
                width: { xs: "100%", md: 540 },
                minWidth: { md: 540 },
                maxWidth: { xs: "100%", md: 540 },
                mx: { xs: "auto", md: 0 },
                pt: { xs: 4, md: 0 },
                borderTop: {
                  xs: "1px solid rgba(255,255,255,0.08)",
                  md: "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  overflowX: "hidden",
                  gap: 2,
                  pb: 0.5,
                  px: slideTrackPaddingX,
                  boxSizing: "border-box",
                  width: "100%",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      minWidth: slideCardWidth,
                      width: slideCardWidth,
                      height: { xs: 260, md: 320 },
                      p: { xs: 1.25, md: 1.5 },
                      flexShrink: 0,
                      borderRadius: "16px",
                      border: "1.5px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      sx={{
                        width: "90%",
                        minHeight: { xs: 100, md: 140 },
                        maxHeight: { xs: 130, md: 180 },
                        bgcolor: "rgba(255,255,255,0.08)",
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      width="72%"
                      height={20}
                      sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
                    />
                    <Skeleton
                      variant="circular"
                      animation="wave"
                      width={6}
                      height={6}
                      sx={{ bgcolor: "rgba(255,255,255,0.12)" }}
                    />
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mt: 3,
                }}
              >
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={44}
                  height={44}
                  sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                />
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      width={i === 0 ? 20 : 6}
                      height={6}
                      sx={{ borderRadius: "3px", bgcolor: "rgba(255,255,255,0.12)" }}
                    />
                  ))}
                </Box>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={44}
                  height={44}
                  sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                order: { xs: 1, md: 0 },
                flex: { md: "0 1 auto" },
                width: { xs: "100%", md: "auto" },
                maxWidth: { xs: "100%", md: 520 },
                px: { xs: 2, sm: 3, md: 0 },
                boxSizing: "border-box",
                pl: { md: 4 },
                pr: { md: 0 },
                borderLeft: { md: `1px solid rgba(255,255,255,0.12)` },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                width={88}
                height={26}
                sx={{
                  mb: 2.5,
                  borderRadius: "13px",
                  bgcolor: "rgba(255,255,255,0.1)",
                }}
              />
              <Skeleton
                animation="wave"
                height={36}
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255,255,255,0.12)",
                  maxWidth: 400,
                  width: { xs: "85%", md: "92%" },
                }}
              />
              <Skeleton
                animation="wave"
                width={48}
                height={3}
                sx={{ mb: 3, borderRadius: "2px", bgcolor: "rgba(255,255,255,0.15)" }}
              />
              <Skeleton
                animation="wave"
                height={20}
                sx={{
                  mb: 1,
                  bgcolor: "rgba(255,255,255,0.08)",
                  maxWidth: 520,
                  width: "100%",
                }}
              />
              <Skeleton
                animation="wave"
                height={20}
                sx={{
                  mb: 1,
                  bgcolor: "rgba(255,255,255,0.08)",
                  maxWidth: 520,
                  width: "100%",
                }}
              />
              <Skeleton
                animation="wave"
                height={20}
                sx={{
                  mb: 2,
                  bgcolor: "rgba(255,255,255,0.08)",
                  maxWidth: 400,
                  width: { xs: "70%", md: "78%" },
                }}
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                width={152}
                height={40}
                sx={{ borderRadius: "10px", bgcolor: "rgba(255,255,255,0.1)" }}
              />
            </Box>
          </Box>
        ) : fetchError ? (
          <Typography sx={{ color: "rgba(255,255,255,0.55)", textAlign: "center", py: 4 }}>
            {fetchError}
          </Typography>
        ) : !partners.length ? (
          <Typography sx={{ color: "rgba(255,255,255,0.55)", textAlign: "center", py: 4 }}>
            No partners to show yet.
          </Typography>
        ) : (
        /* Main slider + content layout — centered as one block */
        <Box mt={-5} py={2}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 5, md: 8 },
            alignItems: { xs: "center", md: "center" },
            justifyContent: "center",
            width: "100%",
            maxWidth: { xs: "100%", md: 1280 },
            mx: "auto",
          }}
        >
          {/* Logo slider — below detail when viewport is under md (900px) */}
          <Box
            sx={{
              order: { xs: 2, md: 0 },
              flex: { md: "0 0 auto" },
              width: { xs: "100%", md: 540 },
              minWidth: { md: 540 },
              maxWidth: { xs: "100%", md: 540 },
              mx: { xs: "auto", md: 0 },
              pt: { xs: 4, md: 0 },
              borderTop: {
                xs: "1px solid rgba(255,255,255,0.08)",
                md: "none",
              },
            }}
          >
            {/* Slider track */}
            <Box
              ref={trackRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                gap: 2,
                pb: 0.5,
                px: slideTrackPaddingX,
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              {partners.map((p, i) => (
                <Box
                  key={p._id}
                  data-slide={i}
                  onClick={() => {
                    const dir = i > activeIndex ? "right" : "left";
                    goTo(i, dir);
                  }}
                  sx={{
                    scrollSnapAlign: "center",
                    minWidth: slideCardWidth,
                    width: slideCardWidth,
                    height: { xs: 260, md: 320 },
                    p: { xs: 1.25, md: 1.5 },
                    flexShrink: 0,
                    borderRadius: "16px",
                    border: "1.5px solid",
                    borderColor:
                      i === activeIndex
                        ? primaryColor
                        : "rgba(255,255,255,0.08)",
                    background:
                      i === activeIndex
                        ? primaryBg
                        : "rgba(255,255,255,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    cursor: "pointer",
                    transition: "border-color 0.35s ease, background 0.35s ease, transform 0.25s ease",
                    transform: i === activeIndex ? "scale(1)" : "scale(0.97)",
                    "&:hover": {
                      borderColor:
                        i === activeIndex
                          ? primaryColor
                          : "rgba(255,255,255,0.2)",
                      transform: "scale(1)",
                    },
                  }}
                >
                  {/* Logo area */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      minHeight: { xs: 100, md: 160 },
                      maxWidth: { xs: 280, md: 440 },
                      maxHeight: { xs: 130, md: 200 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PartnerLogo src={p.imageUrl} alt={p.title} />
                  </Box>

                  <Typography
                    sx={{
                      color:
                        i === activeIndex
                          ? "#FFFFFF"
                          : "rgba(255,255,255,0.5)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      textAlign: "center",
                      px: 2,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {p.title}
                  </Typography>

                  {/* Active indicator dot */}
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: i === activeIndex ? "#FF6A00" : "transparent",
                      border: `1px solid ${primaryColor}`,
                      transition: "background 0.3s ease",
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Arrow controls below slider */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mt: 3,
              }}
            >
              <IconButton
                onClick={prev}
                sx={{
                  width: 44,
                  height: 44,
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    border: `1.5px solid ${primaryColor}`,
                    color: primaryColor,
                    background: primaryBg,
                  },
                }}
              >
                <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>

              {/* Dots */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {partners.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => goTo(i, i > activeIndex ? "right" : "left")}
                    sx={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      borderRadius: "3px",
                      background:
                        i === activeIndex
                          ? primaryColor
                          : "rgba(255,255,255,0.2)",
                      cursor: "pointer",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </Box>

              <IconButton
                onClick={next}
                sx={{
                  width: 44,
                  height: 44,
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    border: `1.5px solid ${primaryColor}`,
                    color: primaryColor,
                    background: primaryBg,
                  },
                }}
              >
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Partner info — first when viewport is under md (900px) */}
          <Box
            sx={{
              order: { xs: 1, md: 0 },
              flex: { md: "0 1 auto" },
              width: { xs: "100%", md: "auto" },
              maxWidth: { xs: "100%", md: 520 },
              px: { xs: 2, sm: 3, md: 0 },
              boxSizing: "border-box",
              pl: { md: 4 },
              pr: { md: 0 },
              borderLeft: { md: `1px solid ${primaryColor}` },
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateX(0)"
                : slideDirection === "right"
                ? "translateX(32px)"
                : "translateX(-32px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              willChange: "opacity, transform",
            }}
          >
            <Chip
              label="Partner"
              size="small"
              sx={{
                background: primaryBg,
                color: primaryColor,
                border: `1px solid ${primaryColor}`,
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: 1,
                mb: 2.5,
                height: 26,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                color: whiteColor,
                fontWeight: 700,
                fontSize: { xs: "1.5rem", md: "2rem" },
                lineHeight: 1.2,
                mb: 2,
                textAlign: { xs: "center", md: "left" },
                width: "100%",
                maxWidth: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {partner.title}
            </Typography>

            {/* Orange accent line */}
            <Box
              sx={{
                width: 48,
                height: 3,
                borderRadius: "2px",
                background: "linear-gradient(90deg, #FF6A00, #FF9A3C)",
                mb: 3,
              }}
            />

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                maxWidth: 520,
                width: "100%",
                mb: 2,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {partner.description}
            </Typography>

            {websiteHref ? (
              <Button
                variant="contained"
                href={websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  background: primaryBg,
                  color: primaryColor,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  border: `1px solid ${primaryColor}`,
                  px: 3,
                  py: 1,
                  borderRadius: "10px",
                  textTransform: "none",
                  letterSpacing: 0.5,
                //   boxShadow: `0 2px 10px ${primaryColor}`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    background: primaryColor,
                    color: whiteColor,
                }
                }}
              >
                Visit Website
              </Button>
            ) : null}
          </Box>
        </Box>
        )}
      </Container>
    </Box>
  );
}