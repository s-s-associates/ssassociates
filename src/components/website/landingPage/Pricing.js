"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

const features = [
  "Unlimited CSV uploads",
  "10 pre-built dashboards",
  "Smart data normalization",
  "Email support",
];

function Pricing({ heading = "Simple, Transparent Pricing" }) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Heading */}
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          fontWeight: 700,
          fontSize: { xs: 28, sm: 32, md: 40 },
          lineHeight: 1.2,
          color: grayColor,
          textAlign: "center",
          mb: { xs: 4, md: 5 },
        }}
      >
        {heading}
      </Box>

      {/* Pricing card - extreme hover */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.05,
          y: -14,
        }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.4,
          delay: 0.12,
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          borderRadius: 3,
          overflow: "hidden",
          background: `linear-gradient(180deg, ${primaryColor} 0%, #7632d9 100%)`,
          boxShadow: "0 8px 32px rgba(138, 56, 245, 0.35)",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          cursor: "pointer",
          transition: "box-shadow 0.4s ease",
          "&:hover": {
            boxShadow: "0 24px 56px rgba(138, 56, 245, 0.5), 0 0 0 1px rgba(255,255,255,0.1)",
          },
        }}
      >
        {/* Plan name */}
        <Box sx={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
          Starter
        </Box>

        {/* Price */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
          <Box component="span" sx={{ color: "#fff", fontSize: 48, fontWeight: 700 }}>
            $29
          </Box>
          <Box component="span" sx={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}>
            /Month
          </Box>
        </Box>

        {/* Separator line - gradient left to right */}
        <Box
          sx={{
            width: "66%",
            height: 2,
            my: 0.5,
            background: "linear-gradient(to right, rgba(138, 56, 245, 1), rgba(110, 49, 189, 1))",
            borderRadius: 1,
          }}
        />

        {/* Includes */}
        <Box sx={{ color: "#fff", fontSize: 15, fontWeight: 600, mt: 0.5 }}>
          Includes:
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
          {features.map((text) => (
            <Box
              key={text}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#fff",
                fontSize: 15,
              }}
            >
              <FiCheckCircle style={{ fontSize: 22, flexShrink: 0, color: "#fff" }} />
              <span>{text}</span>
            </Box>
          ))}
        </Box>

        {/* CTA button */}
        <Box sx={{ width: "100%", mt: 2, textAlign: "center" }}>
          <Box
            component={motion.div}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Box
              component={Link}
              href="/signup"
              sx={{
                display: "inline-block",
                backgroundColor: "#fff",
                color: primaryColor,
                fontWeight: 600,
                fontSize: 16,
                py: 1.5,
                px: 3,
                borderRadius: 2,
                textDecoration: "none",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                },
              }}
            >
              Start 14 Days Free Trial
            </Box>
          </Box>
        </Box>

        {/* Disclaimer */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
            mt: 0.5,
          }}
        >
          Cancel anytime. No contracts.
        </Box>
      </Box>
    </Box>
  );
}

export default Pricing;
