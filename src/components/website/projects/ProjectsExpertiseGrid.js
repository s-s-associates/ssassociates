"use client";

import {
  primaryBg,
  primaryColor,
  secondaryColor,
  textGrayDark,
  whiteColor,
} from "@/components/utils/Colors";
import { btnRadius, boxShadow, transition } from "@/components/utils/GlobalVariables";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const items = [
  {
    icon: ArchitectureRoundedIcon,
    title: "Design intelligence",
    body: "Layouts, materials, and coordination that respect programme, budget, and how people actually use the space.",
  },
  {
    icon: VerifiedRoundedIcon,
    title: "Site-ready delivery",
    body: "Structured handovers, documentation, and quality checks so installations stay predictable from first fix to sign-off.",
  },
  {
    icon: HandshakeRoundedIcon,
    title: "Partnership mindset",
    body: "We align with your stakeholders—clear communication, proactive problem-solving, and accountability at every stage.",
  },
];

function ProjectsExpertiseGrid() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
        px: { xs: 2, sm: 3 },
        bgcolor: whiteColor,
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: primaryColor,
                mb: 1.5,
              }}
            >
              Our approach
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: "var(--font-app)",
                fontWeight: 700,
                fontSize: { xs: 26, md: 34 },
                lineHeight: 1.2,
                color: secondaryColor,
              }}
            >
              What you&apos;ll see across every project file
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 15,
              lineHeight: 1.7,
              color: textGrayDark,
              maxWidth: 420,
            }}
          >
            From concept imagery to practical completion, we combine craft, compliance, and commercial sense—so the result
            feels considered, not rushed.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  sx={{
                    height: "100%",
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: btnRadius,
                    border: `1px solid rgba(16, 24, 40, 0.08)`,
                    background: `linear-gradient(145deg, ${whiteColor} 0%, ${primaryBg} 120%)`,
                    boxShadow,
                    transition,
                    "&:hover": {
                      boxShadow: "0 16px 48px rgba(8, 12, 20, 0.1)",
                      borderColor: "rgba(251, 134, 30, 0.35)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: primaryBg,
                      color: primaryColor,
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-app)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: secondaryColor,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: textGrayDark }}>
                    {item.body}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsExpertiseGrid;
