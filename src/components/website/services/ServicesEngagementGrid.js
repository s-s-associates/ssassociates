"use client";

import {
  primaryColor,
  secondaryColor,
  secondaryDark,
  textGrayDark,
  whiteColor,
} from "@/components/utils/Colors";
import { btnRadius, boxShadow, transition } from "@/components/utils/GlobalVariables";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const steps = [
  {
    step: "01",
    icon: DrawRoundedIcon,
    title: "Shape the brief",
    body: "Workshops, surveys, and space planning so requirements, brand, and budget line up before design deepens.",
  },
  {
    step: "02",
    icon: GroupsRoundedIcon,
    title: "Coordinate delivery",
    body: "One accountable path across trades, joinery, and site teams—fewer gaps, clearer decisions on the floor.",
  },
  {
    step: "03",
    icon: RocketLaunchRoundedIcon,
    title: "Launch & refine",
    body: "Snagging, handover, and practical support so teams move in smoothly and the space performs from day one.",
  },
];

function ServicesEngagementGrid() {
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
              Engagement model
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
              A steady rhythm from first conversation to move-in
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 15,
              lineHeight: 1.7,
              color: textGrayDark,
              maxWidth: 400,
            }}
          >
            Whether you need a focused fit-out or a broader design-and-build programme, we keep stakeholders aligned and
            documentation legible—so progress stays visible.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <Grid key={item.step} size={{ xs: 12, md: 4 }}>
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
                    border: `2px solid rgba(16, 24, 40, 0.08)`,
                    background: `linear-gradient(160deg, ${whiteColor} 0%, rgba(251, 134, 30, 0.04) 100%)`,
                    boxShadow,
                    transition,
                    position: "relative",
                    "&:hover": {
                      boxShadow: "0 16px 48px rgba(8, 12, 20, 0.1)",
                      borderColor: "rgba(251, 134, 30, 0.35)",
                      transform: "translateY(-4px)",
                    },
                    "&:hover .step-icon": {
                      bgcolor: primaryColor,
                      color: secondaryColor,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-app)",
                        fontWeight: 800,
                        fontSize: 13,
                        letterSpacing: "0.12em",
                        color: primaryColor,
                      }}
                    >
                      {item.step}
                    </Typography>
                    <Box
                      className="step-icon"
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: secondaryDark,
                        color: whiteColor,
                        border: `2px solid ${primaryColor}`,
                        transition: "all 0.25s ease",
                      }}
                    >
                      <Icon sx={{ fontSize: 24 }} />
                    </Box>
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
                  <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: textGrayDark }}>{item.body}</Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default ServicesEngagementGrid;
