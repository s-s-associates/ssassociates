"use client";

import {
  primaryColor,
  primaryBg,
  secondaryColor,
  textGrayDark,
  textGrayLight,
} from "@/components/utils/Colors";
import { boxShadow, boxShadowHover, transition } from "@/components/utils/GlobalVariables";
import {
  Favorite,
  EmojiEvents,
  Groups,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const values = [
  {
    icon: Favorite,
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty and transparency in all our dealings.",
  },
  {
    icon: EmojiEvents,
    title: "Excellence",
    description:
      "We strive for excellence in every project, never settling for mediocrity.",
  },
  {
    icon: Groups,
    title: "Collaboration",
    description:
      "We believe in working together with clients and partners to achieve shared goals.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description:
      "We embrace new technologies and methods to deliver cutting-edge solutions.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function CoreValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      component="section"
      ref={ref}
      sx={{
        py: { xs: 7, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: "#f7f8fa",
      }}
    >
      {/* Heading block */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
        sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}
      >
        <Typography
          component="span"
          sx={{
            display: "inline-block",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: primaryColor,
            mb: 1.5,
          }}
        >
          What Drives Us
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-app)",
            fontWeight: 800,
            fontSize: { xs: 28, sm: 34, md: 42 },
            lineHeight: 1.2,
            color: secondaryColor,
            mb: 2,
          }}
        >
          The Values Behind Every Build
        </Typography>

        <Typography
          component="p"
          sx={{
            fontSize: { xs: 15, md: 16 },
            color: textGrayDark,
            lineHeight: 1.7,
            maxWidth: 560,
            mx: "auto",
          }}
        >
          Our principles are not just words they shape every decision we make
          and every structure we create.
        </Typography>
      </Box>

      {/* Cards grid */}
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 3, md: 3.5 },
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {values.map(({ icon: Icon, title, description }) => (
          <Box
            key={title}
            component={motion.div}
            variants={cardVariants}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 3,
              px: 3,
              pt: 4,
              pb: 3.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxShadow,
              border: "1px solid rgba(0,0,0,0.05)",
              transition,
              cursor: "default",
              "&:hover": {
                boxShadow: boxShadowHover,
                transform: "translateY(-6px)",
                borderColor: primaryColor,
              },
            }}
          >
            {/* Icon circle */}
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: primaryBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2.5,
              }}
            >
              <Icon sx={{ color: primaryColor, fontSize: 26 }} />
            </Box>

            <Typography
              component="h3"
              sx={{
                fontFamily: "var(--font-app)",
                fontWeight: 700,
                fontSize: 16,
                color: secondaryColor,
                mb: 1.25,
              }}
            >
              {title}
            </Typography>

            <Typography
              component="p"
              sx={{
                fontSize: 14,
                color: textGrayDark,
                lineHeight: 1.65,
              }}
            >
              {description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CoreValues;
