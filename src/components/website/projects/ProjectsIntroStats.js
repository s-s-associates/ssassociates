"use client";

import {
  primaryColor,
  secondaryColor,
  secondaryBg,
  textGrayDark,
  whiteColor,
} from "@/components/utils/Colors";
import { sectionRadius } from "@/components/utils/GlobalVariables";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const stats = [
  { key: "count", label: "Portfolio pieces", sub: "Curated project highlights" },
  { key: "sectors", value: "Multi-sector", label: "Commercial & specialist", sub: "Fit-out, joinery & engineering-led delivery" },
  { key: "focus", value: "End-to-end", label: "Design to handover", sub: "Coordinated teams and clear milestones" },
];

function ProjectsIntroStats() {
  const [projectCount, setProjectCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.projects)) {
          setProjectCount(data.projects.length);
        }
      } catch {
        if (!cancelled) setProjectCount(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3 },
        background: `linear-gradient(180deg, ${whiteColor} 0%, ${secondaryBg} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}
        >
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
            Why explore our work
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 26, md: 34 },
              lineHeight: 1.2,
              color: secondaryColor,
              maxWidth: 640,
              mx: "auto",
            }}
          >
            Built for clarity, safety, and lasting impact in every space.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {stats.map((item, i) => {
            const displayValue =
              item.key === "count"
                ? projectCount != null
                  ? `${projectCount}+`
                  : "—"
                : item.value;

            return (
              <Grid key={item.key} size={{ xs: 12, md: 4 }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                  sx={{
                    height: "100%",
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: sectionRadius,
                    backgroundColor: whiteColor,
                    border: "1px solid rgba(16, 24, 40, 0.08)",
                    boxShadow: "0 12px 40px rgba(8, 12, 20, 0.06)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${primaryColor}, rgba(255, 184, 116, 0.9))`,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-app)",
                      fontWeight: 800,
                      fontSize: { xs: 36, sm: 42 },
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: secondaryColor,
                      mb: 1,
                    }}
                  >
                    {displayValue}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: secondaryColor,
                      mb: 0.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: textGrayDark,
                      opacity: 0.92,
                    }}
                  >
                    {item.sub}
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

export default ProjectsIntroStats;
