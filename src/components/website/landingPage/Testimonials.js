"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {
  primaryColor,
  primaryDark,
  secondaryDark,
  whiteColor,
} from "@/components/utils/Colors";
import {
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function sortTestimonials(list) {
  return [...list].sort((a, b) => {
    const oa = typeof a.order === "number" ? a.order : 9999;
    const ob = typeof b.order === "number" ? b.order : 9999;
    if (oa !== ob) return oa - ob;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
}

function subtitleLine(t) {
  const parts = [t.role, t.companyName].map((s) => (s || "").trim()).filter(Boolean);
  return parts.length ? parts.join(" · ") : "";
}

function clampRating(n) {
  const r = Number(n);
  if (Number.isNaN(r) || r < 0) return 0;
  return Math.min(5, r);
}

function ProfileAvatar({ url, name }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";
  const u = (url || "").trim();
  if (u && (u.startsWith("http://") || u.startsWith("https://") || u.startsWith("/"))) {
    return (
      <Image
        src={u}
        alt={name || "Client"}
        height={50}
        width={50}
        unoptimized={u.startsWith("http://") || u.startsWith("https://")}
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
    );
  }
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        bgcolor: "rgba(255,255,255,0.12)",
        color: "rgba(255,255,255,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 18,
      }}
    >
      {initial}
    </Box>
  );
}

const Testimonials = () => {
  const sliderRef = useRef(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.success && Array.isArray(data.testimonials)) {
          setItems(sortTestimonials(data.testimonials));
        } else {
          setItems([]);
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = items.length;
  const [progress, setProgress] = useState(count > 0 ? 100 / count : 0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (count === 0) {
      setProgress(0);
      return;
    }
    setProgress((currentIndex + 1) * (100 / count));
  }, [currentIndex, count]);

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: count > 1,
      speed: 800,
      autoplay: count > 1,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: true,
      afterChange: (index) => setCurrentIndex(index),
    }),
    [count]
  );

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: 10,
        px: { xs: 3, sm: 3, md: 40 },
        background: `linear-gradient(165deg, ${secondaryDark} 0%, rgb(12, 16, 26) 42%, rgb(20, 14, 10) 100%)`,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: { xs: -80, md: -100 },
          right: { xs: -60, md: -80 },
          width: { xs: 240, md: 320 },
          height: { xs: 240, md: 320 },
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.26), transparent 68%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: { xs: -70, md: -90 },
          left: { xs: -50, md: -60 },
          width: { xs: 260, md: 340 },
          height: { xs: 260, md: 340 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(251,134,30,0.18), rgba(255,184,116,0.1) 45%, transparent 70%)",
          filter: "blur(3px)",
          pointerEvents: "none",
        }}
      />

      <Stack
        direction={["column-reverse", "column-reverse", "row"]}
        justifyContent={"center"}
        alignItems={"center"}
        gap={[1, 1, 8]}
        sx={{ position: "relative", zIndex: 1 }}
      >
      <Stack gap={2}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1.4,
            py: 0.45,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.22)",
            bgcolor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.82)",
            fontSize: 12,
            fontWeight: 600,
            width: "fit-content",
          }}
        >
          Testimonials
        </Box>
        <LinearProgress
          variant="determinate"
          value={loading || count === 0 ? 0 : progress}
          sx={{
            width: "100%",
            mt: 2,
            height: 4,
            borderRadius: "5px",
            backgroundColor: "rgba(255,255,255,0.12)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: primaryColor,
            },
          }}
        />
        <Typography variant="h3" component={"span"}>
          From Our <b style={{ color: primaryColor }}>Community.</b>
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
          Empowering connections and sharing success stories from our community.
        </Typography>

        <Stack mt={2} direction={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={2}>
          <IconButton
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={count <= 1 || loading}
            sx={{
              bgcolor: primaryColor,
              color: whiteColor,
              transition: "0.3s",
              "&:hover": {
                bgcolor: primaryDark,
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={() => sliderRef.current?.slickNext()}
            disabled={count <= 1 || loading}
            sx={{
                bgcolor: primaryColor,
                color: whiteColor,
                transition: "0.3s",
                "&:hover": {
                  bgcolor: primaryDark,
                },
              }}
          >
            <ArrowForward />
          </IconButton>
        </Stack>
      </Stack>

      <Stack maxWidth={400} minWidth={400} maxHeight={[400, 400, "auto"]} overflow={"hidden"}>
        {loading ? (
          <Stack minHeight={280} alignItems="center" justifyContent="center" p={3}>
            <CircularProgress sx={{ color: primaryColor }} />
          </Stack>
        ) : count === 0 ? (
          <Stack minHeight={280} alignItems="center" justifyContent="center" p={3}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)" }} textAlign="center">
              No testimonials yet.
            </Typography>
          </Stack>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {items.map((t) => {
              const id = t._id != null ? String(t._id) : t.clientName;
              const name = (t.clientName || "").trim() || "Client";
              const sub = subtitleLine(t);
              const stars = clampRating(t.rating);

              return (
                <Stack key={id} spacing={3} p={3}>
                  <Image
                    src={"/images/home/Testimonials-Quotation.png"}
                    alt="Quotation Mark"
                    height={50}
                    width={50}
                  />
                  <Typography
                    variant="h6"
                    maxHeight={150}
                    sx={{
                      overflowY: "auto",
                      backgroundColor: "transparent",
                      scrollbarWidth: "thin",
                      "&::-webkit-scrollbar-button": {
                        display: "none",
                      },
                    }}
                  >
                    {(t.content || "").trim() || "—"}
                  </Typography>

                  <Rating
                    name={`rating-${id}`}
                    value={stars}
                    readOnly
                    precision={0.5}
                    size="small"
                    sx={{
                      color: primaryColor,
                      "& .MuiRating-iconEmpty": {
                        color: "rgba(255,255,255,0.28)",
                      },
                    }}
                  />

                  <Stack direction="row" alignItems="center" gap={1}>
                    <ProfileAvatar url={t.imageUrl} name={name} />
                    <Stack>
                      <Typography fontWeight="bold">{name}</Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.65)" }} fontSize={14}>
                        {sub || "—"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Slider>
        )}
      </Stack>
      </Stack>
    </Box>
  );
};

export default Testimonials;
