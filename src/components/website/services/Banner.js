"use client";

import { primaryColor, whiteColor } from "@/components/utils/Colors";
import { mainHeadingSize, mainSubHeadingSize } from "@/components/utils/Sizes";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const BANNER_SRC = "/images/services/services-banner.jpg";

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
      {/* LCP: priority + fetchPriority so the hero paints without waiting on lazy images below */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src={BANNER_SRC}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </Box>

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
          Our services
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
          Fit-out, joinery &amp; design-build expertise.
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
          From workplace planning and bespoke joinery to full design-and-build
          delivery—we help you scope, refine, and execute spaces that work for
          your teams today and scale with you tomorrow.
        </Typography>
      </Box>
    </Box>
  );
}

export default Banner;
