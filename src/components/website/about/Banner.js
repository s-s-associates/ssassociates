"use client";

import { primaryColor, secondaryColor, whiteColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function Banner() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "70vh",
        maxHeight: "70vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/about/about-banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(8,12,20,0.82) 0%, rgba(8,12,20,0.55) 60%, rgba(8, 12, 20, 0.55) 100%)",
        }}
      />

      {/* Bottom fade */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background:
            "linear-gradient(to top, rgba(8,12,20,0.6) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 3, sm: 6, md: 10 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Label */}
        <Typography
          component={motion.span}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          sx={{
            display: "inline-block",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: primaryColor,
            mb: 2,
          }}
        >
          About S&S Associates
        </Typography>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: 20, sm: 20, md: 30 },
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: whiteColor,
            mb: 3,
            WebkitTextStroke: "0.5px rgba(255,255,255,0.8)",
          }}
        >
          Building Tomorrow, One Foundation  at a Time.
         
        </Typography>

        {/* Description */}
        <Typography
          component="p"
          sx={{
            fontSize: { xs: 15, md: 17 },
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.75,
            maxWidth: 800,
          }}
        >
          For over a decade, S&S Associates has been delivering high-performance
          construction and engineering projects across the region. We combine
          deep technical expertise with a genuine commitment to quality,
          sustainability, and client satisfaction.
        </Typography>
      </Box>
    </Box>
  );
}

export default Banner;
