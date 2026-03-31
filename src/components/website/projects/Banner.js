"use client";

import { primaryColor, whiteColor } from "@/components/utils/Colors";
import { mainHeadingSize, mainSubHeadingSize } from "@/components/utils/Sizes";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function Banner() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "80vh",
        maxHeight: "80vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image — CSS sizing matches original (cover + center) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/images/projects/projects-banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          Our portfolio
        </Typography>

        {/* Heading */}
        <Typography
          component="h1"
          sx={{
            fontSize: mainHeadingSize.fontSize,
            fontWeight: mainHeadingSize.fontWeight,
            lineHeight: mainHeadingSize.lineHeight,
            textTransform: "uppercase",
            color: whiteColor,
            mb: 3,
            WebkitTextStroke: "0.5px rgba(255,255,255,0.8)",
            maxWidth: 800
          }}
        >
          Projects that shape spaces and standards.
        </Typography>

        {/* Description */}
        <Typography
          component="p"
          sx={{
            fontSize: mainSubHeadingSize.fontSize,
            fontWeight: mainSubHeadingSize.fontWeight,
            color: "rgba(255,255,255,0.82)",
            lineHeight: mainSubHeadingSize.lineHeight,
            maxWidth: 800,
          }}
        >
          Explore a selection of our commercial fit-outs, design-and-build
          delivery, and engineering-led projects across Belfast, Dublin, and
          beyond—each delivered with precision, safety, and long-term value in
          mind.
        </Typography>
      </Box>
    </Box>
  );
}

export default Banner;
