"use client";

import {
  primaryColor,
  primaryLight,
  primaryBg,
  secondaryColor,
  secondaryDark,
  whiteColor,
} from "@/components/utils/Colors";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const toolsAndMachineryItems = [
  { name: "Steel Shuttering", quantity: "30000 sft" },
  { name: "Scaffolding Pipes & Joints", quantity: "25000 sft" },
  { name: "Wooden Ballies & Battens", quantity: "1500" },
  { name: "Construction Jacks", quantity: "20" },
  { name: "Wheel Barrows", quantity: "40" },
  { name: "Compactor", quantity: "06" },
  { name: "Concrete Mixture Machine", quantity: "04" },
  { name: "Drill Machine Heavy Duty", quantity: "04" },
  { name: "Welding Plant", quantity: "02" },
  { name: "Lift Machine with 30'-0\" Tower", quantity: "03" },
  { name: "Electric Generator", quantity: "02" },
  { name: "Total Station", quantity: "01" },
];

const ICON_CYCLE = [
  ConstructionRoundedIcon,
  EngineeringRoundedIcon,
  HandymanRoundedIcon,
  LocalShippingRoundedIcon,
  PrecisionManufacturingRoundedIcon,
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function ToolsAndMachinery() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 11 },
        overflow: "hidden",
        background: `linear-gradient(165deg, ${secondaryDark} 0%, #0d0f14 45%, #12151c 100%)`,
      }}
    >
      {/* Ambient glows */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: { xs: 280, md: 480 },
          height: { xs: 280, md: 480 },
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(251, 134, 30, 0.12) 0%, transparent 68%)`,
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "-25%",
          left: "-15%",
          width: { xs: 320, md: 520 },
          height: { xs: 320, md: 520 },
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(251, 134, 30, 0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />


      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", maxWidth: 640, mx: "auto", mb: { xs: 5, md: 6.5 } }}>
          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: primaryColor,
              mb: 1.5,
            }}
          >
            Capability & scale
          </Typography>
          <Typography
            component={motion.h2}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 800,
              fontSize: { xs: 28, sm: 34, md: 40 },
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: whiteColor,
              mb: 2,
            }}
          >
            Tools &{" "}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Machinery
            </Box>
          </Typography>
          <Box
            component={motion.div}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              width: 56,
              height: 4,
              borderRadius: 2,
              mx: "auto",
              mb: 2,
              background: `linear-gradient(90deg, ${primaryColor}, ${primaryLight})`,
              transformOrigin: "center",
            }}
          />
          <Typography
            component={motion.p}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              color: "rgba(248, 250, 252, 0.55)",
              fontSize: { xs: 14, sm: 15 },
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            In-house equipment and fleet capacity that keep your sites moving from shuttering and scaffolding to
            heavy plant and precision surveying.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2, sm: 2.25, md: 2.5 },
          }}
        >
          {toolsAndMachineryItems.map((item, index) => {
            const Icon = ICON_CYCLE[index % ICON_CYCLE.length];
            return (
              <Box
                key={item.name}
                component={motion.article}
                variants={cardVariants}
                sx={{
                  position: "relative",
                  borderRadius: "18px",
                  p: { xs: 2.25, md: 2.75 },
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 20px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(251, 134, 30, 0.45)",
                    boxShadow: [
                      "0 24px 56px rgba(0,0,0,0.45)",
                      "0 0 0 1px rgba(251, 134, 30, 0.2)",
                      "0 12px 40px rgba(251, 134, 30, 0.12)",
                    ].join(", "),
                    transform: "translateY(-4px)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 20,
                    bottom: 20,
                    width: 3,
                    borderRadius: "0 4px 4px 0",
                    background: `linear-gradient(180deg, ${primaryColor}, ${primaryLight})`,
                    opacity: 0.85,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, pl: 0.5 }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: primaryBg,
                      color: primaryColor,
                      border: "1px solid rgba(251, 134, 30, 0.25)",
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 16, sm: 20 },
                        lineHeight: 1.4,
                        color: whiteColor,
                        letterSpacing: "-0.02em",
                        mb: 1.25,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "999px",
                        fontSize: 13,
                        fontWeight: 800,
                        letterSpacing: "0.04em",
                        color: secondaryColor,
                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryLight})`,
                        boxShadow: "0 4px 14px rgba(251, 134, 30, 0.35)",
                      }}
                    >
                      {item.quantity}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default ToolsAndMachinery;
