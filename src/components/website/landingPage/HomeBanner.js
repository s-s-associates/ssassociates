
"use client";
import { Box, Button, Icon, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Link from "next/link";
import Image from "next/image";
import { Monoton } from "next/font/google";
import React, { useMemo, useRef, useState } from "react";
import {
  primaryColor,
  secondaryDark,
} from "@/components/utils/Colors";

const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
});

const scrollIconBounce = keyframes`
  0%, 100% { transform: rotate(90deg) translateX(0); }
  50% { transform: rotate(90deg) translateX(8px); }
`;

const CELL_SIZE = 100;

function HomeBanner() {
  const sectionRef = useRef(null);
  const [activeCell, setActiveCell] = useState(-1);
  const [gridMeta, setGridMeta] = useState({
    cols: 0,
    rows: 0,
    total: 0,
  });

  const cells = useMemo(() => {
    return Array.from({ length: gridMeta.total }, (_, i) => i);
  }, [gridMeta.total]);

  const updateGridMeta = () => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const cols = Math.ceil(rect.width / CELL_SIZE);
    const rows = Math.ceil(rect.height / CELL_SIZE);
    const total = cols * rows;

    setGridMeta((prev) => {
      if (
        prev.cols === cols &&
        prev.rows === rows &&
        prev.total === total
      ) {
        return prev;
      }
      return { cols, rows, total };
    });
  };

  React.useEffect(() => {
    updateGridMeta();

    const handleResize = () => updateGridMeta();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current || gridMeta.cols === 0) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    const index = row * gridMeta.cols + col;

    if (index >= 0 && index < gridMeta.total) {
      setActiveCell(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveCell(-1);
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: secondaryDark,
        userSelect: "none",
      }}
    >
      {/* Grid overlay - lines */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      />

      {/* Grid cells - controlled by mouse position on whole banner */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${gridMeta.cols || 1}, ${CELL_SIZE}px)`,
          gridAutoRows: `${CELL_SIZE}px`,
          pointerEvents: "none",
        }}
      >
        {cells.map((i) => {
          const isActive = i === activeCell;

          return (
            <Box
              key={i}
              sx={{
                borderRadius: 1,
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.2s ease, border-color 0.3s ease",
                transform: isActive ? "scale(1.12)" : "scale(1)",
                backgroundColor: isActive ? secondaryDark : "transparent",
                boxShadow: isActive
                  ? `
                    0 0 20px rgba(251, 133, 30, 0.7),
                    0 18px 45px rgba(0,0,0,0.45)
                  `
                  : "none",
              }}
            />
          );
        })}
      </Box>

      {/* Person image — original sizing: height 120% of banner, centered */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: "url(/images/home/home-banner-person.png)",
          backgroundSize: "auto 120%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          opacity: 0,
          transform: "translateY(80px)",
          animation: "personSlideIn 1s ease-out 0.3s forwards",
          "@keyframes personSlideIn": {
            "0%": { opacity: 0, transform: "translateY(80px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          // dark overlay on mobile so text stays readable over the image
          "&::after": {
            content: '""',
            display: { xs: "block", sm: "none" },
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 100%)",
          },
        }}
      />

      {/* Left edge fade */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "20%",
          maxWidth: 280,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Right edge fade */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "20%",
          maxWidth: 280,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Left text */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 30, sm: 40, md: 40 },
          top: { xs: "18%", sm: "20%", md: "22%" },
          right: { xs: 3, sm: 4, md: "40%" },
          zIndex: 2,
          opacity: 0,
          transform: "translateX(-80px)",
          animation: "slideFromLeft 1s ease-out 0.3s forwards",
          "@keyframes slideFromLeft": {
            "0%": {
              opacity: 0,
              transform: "translateX(-80px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateX(0)",
            },
          },
        }}
      >
        <Typography
          component="h1"
          lineHeight={[1.5,1.1]}
          sx={{
            color: "#fff",
            fontFamily: `${monoton.style.fontFamily}, var(--font-app) !important`,
            fontSize: { xs: 34, sm: 46, md: 54, lg: 62 },
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: 0,
            display: "block",
            WebkitTextStroke: 0,
            wordSpacing: 13,
            
          }}
        >
          FOUNDATIONS
          <br />
          FOR A <span style={{ color: primaryColor,
            fontFamily: `${monoton.style.fontFamily}, var(--font-app) !important`, }}>STRONGER</span>
          <br />
          FUTURE
        </Typography>

        <Typography
          component="p"
          sx={{
            color: "#fff",
            fontFamily:
              "var(--font-app)",
            fontWeight: 400,
            fontSize: { xs: 14, sm: 15, md: 16 },
            lineHeight: 1.6,
            mt: 2.5,
            mb: 0,
            maxWidth: 450,
          }}
        >
          High-performance buildings that respect the planet. We specialize in
          sustainable materials and energy-efficient.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
          <Button
            component={Link}
            href="/about"
            variant="outlined"
            sx={{
              height: 35,
              width: 120,
              color: "#fff",
              borderColor: "#fff",
              borderWidth: 1.5,
              borderRadius: 1.5,
              px: 1,
              py: 0.5,
              fontWeight: 700,
              fontSize: 15,
              textTransform: "none",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderWidth: 1.5,
              },
            }}
          >
            Learn More
          </Button>

          <Button
            component={Link}
            href="/contact"
            sx={{
              height: 38,
              width: 120,
              color: "#fff",
              backgroundColor: "rgba(30, 35, 45, 0.95)",
              borderRadius: 1.5,
              px: 1,
              py: 0.5,
              fontWeight: 700,
              fontSize: 15,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              "&:hover": {
                backgroundColor: "rgba(40, 48, 60, 0.95)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
              },
            }}
          >
            Build With Us
          </Button>
        </Box>
      </Box>

      {/* Right content */}
      <Box
        sx={{
          position: "absolute",
          bottom: 100,
          right: { xs: 20, sm: 30, md: 40 },
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
          maxWidth: { xs: "100%", sm: 420 },
          opacity: 0,
          transform: "translateX(80px)",
          animation: "statsSlideIn 1s ease-out 0.3s forwards",
          "@keyframes statsSlideIn": {
            "0%": {
              opacity: 0,
              transform: "translateX(80px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateX(0)",
            },
          },
        }}
      >
        <Typography
          component="h2"
          sx={{
            color: primaryColor,
            fontFamily:
              "var(--font-app)",
            fontWeight: 900,
            fontSize: { xs: 18, sm: 20, md: 35 },
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          BUILDING FINEST SPACES
        </Typography>

        <Typography
          component="p"
          sx={{
            color: "rgba(255,255,255,0.9)",
            fontFamily:
              "var(--font-app)",
            fontWeight: 400,
            fontSize: { xs: 12, sm: 13, md: 18 },
            lineHeight: 1.5,
            mt: 1,
            mb: 1.5,
            maxWidth: 400,
          }}
        >
          Premium fit-outs, grey structures, and specialist joinery
          crafted with precision for every project.
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
          {[
            { value: "7.5K", label: "Excellence" },
            { value: "90%", label: "Rating" },
          ].map(({ value, label }, i) => (
            <Box key={label} sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1 } }}>
              <Image
                src="/images/home/left-leaf.png"
                alt=""
                width={28}
                height={70}
                style={{  opacity: 0.92 }}
              />
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 30, sm: 30 },
                    color: "#fff",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 11, sm: 13 },
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 500,
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </Typography>
              </Box>
              <Image
                src="/images/home/right-leaf.png"
                alt=""
                width={28}
                height={70}
                style={{  opacity: 0.92 }}
              />
              {/* divider between stats */}
              {i === 0 && (
                <Box sx={{ width: "1px", height: 36, bgcolor: "rgba(255,255,255,0.2)", mx: { xs: 0.5, sm: 1 } }} />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom blur bar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          backgroundColor: "rgba(24, 29, 33, 0.15)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="span"
            sx={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll Down
          </Typography>
          <Icon
            component={DoubleArrowIcon}
            sx={{
              color: "#fff",
              fontSize: 40,
              animation: `${scrollIconBounce} 1s ease-in-out infinite`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HomeBanner;