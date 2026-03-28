"use client";

import { primaryLight, whiteColor } from "@/components/utils/Colors";
import { transition } from "@/components/utils/GlobalVariables";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function ServicesPageCTA() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgb(8, 12, 20) 0%, rgb(16, 24, 40) 50%, rgb(20, 30, 48) 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-15%",
          width: { xs: "80%", md: "50%" },
          height: "120%",
          background: `radial-gradient(ellipse at center, rgba(251, 134, 30, 0.18) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: primaryLight,
              mb: 2,
            }}
          >
            Book a conversation
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 26, sm: 32, md: 38 },
              lineHeight: 1.15,
              color: whiteColor,
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Tell us what you&apos;re planning next
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 520,
              mx: "auto",
              mb: 3.5,
            }}
          >
            Share timelines, headcount, and any constraints—we&apos;ll suggest a sensible route through surveys, design,
            and delivery that matches your risk profile.
          </Typography>
          <Button
            component={Link}
            href="/contact"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              px: 3.5,
              py: 1.75,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 16,
              color: "rgb(8, 12, 20)",
              background: `linear-gradient(135deg, ${whiteColor}, rgba(255,255,255, 0.92))`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition,
              "&:hover": {
                background: whiteColor,
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(251, 134, 30, 0.25)",
              },
            }}
          >
            Start the discussion
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ServicesPageCTA;
