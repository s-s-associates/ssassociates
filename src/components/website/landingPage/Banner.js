"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

function Banner() {
  const [startHover, setStartHover] = useState(false);
  const [watchHover, setWatchHover] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        margin: "0 auto",
        px: { xs: 2, sm: 5 },
        py: { xs: 8, md:12 },
        // pb: { xs: 4, md: 6 },
        textAlign: "center",
      }}
    >
      {/* H1 */}
      <Box
        component={motion.div}
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.05 }}
        sx={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: { xs: 36, sm: 48, md: 60 },
          lineHeight: { xs: "1.2", sm: "1.25", md: "80px" },
          letterSpacing: "-0.02em",
          color: grayColor,
          maxWidth: 640,
          minHeight: { xs: "auto", md: 160 },
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        Turn Your Play Data Into Winning Insights
      </Box>

      {/* Body text */}
      <Box
        component={motion.div}
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.12 }}
        sx={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: { xs: 18, md: 20 },
          lineHeight: { xs: "28px", md: "34px" },
          letterSpacing: "0%",
          color: grayColor,
          maxWidth: 640,
          margin: "0 auto",
          textAlign: "center",
          mb: 3,
        }}
      >
        Upload your game CSV, get instant self-scouting dashboards. No spreadsheets. No guesswork.
      </Box>

      {/* Buttons - horizontal */}
      <Box
        component={motion.div}
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Box
          component={Link}
          href="/signup"
          onMouseEnter={() => setStartHover(true)}
          onMouseLeave={() => setStartHover(false)}
          sx={{
            fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0%",
            color: "#fff",
            background: primaryColor,
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            minWidth: 151,
            height: 48,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              background: "#7632d9",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(138, 56, 245, 0.4)",
            },
          }}
        >
          <span>Start Free Trial</span>
          <motion.span
            initial={false}
            animate={{
              opacity: startHover ? 1 : 0,
              x: startHover ? 0 : -6,
              width: startHover ? "auto" : 0,
              overflow: "hidden",
            }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
          </motion.span>
        </Box>
        <Box
          component={Link}
          href="#demo"
          onMouseEnter={() => setWatchHover(true)}
          onMouseLeave={() => setWatchHover(false)}
          sx={{
            fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "24px",
            letterSpacing: "0%",
            color: grayColor,
            background: "transparent",
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            minWidth: 151,
            height: 48,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            border: `1px solid ${grayColor}`,
            cursor: "pointer",
            transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease",
            "&:hover": {
              color: primaryColor,
              borderColor: primaryColor,
              background: "rgba(138, 56, 245, 0.06)",
              transform: "translateY(-1px)",
            },
          }}
        >
          <span>Watch Demo</span>
          <motion.span
            initial={false}
            animate={{
              opacity: watchHover ? 1 : 0,
              x: watchHover ? 0 : -6,
              width: watchHover ? "auto" : 0,
              overflow: "hidden",
            }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 20 }} />
          </motion.span>
        </Box>
      </Box>

      {/* Dashboard image container */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.28 }}
        sx={{
          width: "100%",
          borderRadius: { xs: 2, md: 3 },
          overflow: "hidden",
          // boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            // aspectRatio: "16 / 9",
            // maxHeight: { xs: 280, sm: 360, md: 480 },
          }}
        >
          <Image
            src="/images/d.png"
            alt="Dashboard preview - self-scouting insights"
            // fill
            height={625}
            width={1070}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Banner;
