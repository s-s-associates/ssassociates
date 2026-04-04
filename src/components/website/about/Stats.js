"use client";

import {
  primaryColor,
  primaryBg,
  primaryLight,
  secondaryColor,
  secondaryBg,
  textGrayDark,
  whiteColor,
  bordergrayColor,
} from "@/components/utils/Colors";
import { btnRadius, boxShadow } from "@/components/utils/GlobalVariables";
import { Engineering, Apartment, EmojiPeople, Verified } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { motion, useInView, animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Engineering,
    label: "Projects Delivered",
    value: Number(process.env.NEXT_PUBLIC_PROJECTS_COMPLETED),
    suffix: "+",
    hint: "Residential & commercial builds",
  },
  {
    icon: Apartment,
    label: "Sq. Ft. Constructed",
    value: 1,
    suffix: "M+",
    hint: "Across diverse property types",
  },
  {
    icon: EmojiPeople,
    label: "Happy Clients",
    value: Number(process.env.NEXT_PUBLIC_HAPPY_CLIENTS),
    suffix: "+",
    hint: "Client satisfaction rating",
  },
  {
    icon: Verified,
    label: "On-Time Completion",
    value: 95,
    suffix: "%",
    hint: "Projects delivered on schedule",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      sx={{
        bgcolor: whiteColor,
        borderRadius: "16px",
        border: `1px solid ${bordergrayColor}`,
        boxShadow: "0 2px 16px rgba(16,24,40,0.06)",
        p: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1.5,
        cursor: "default",
        transition: "box-shadow 0.22s, border-color 0.22s, transform 0.22s",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(251,134,30,0.14)",
          borderColor: primaryColor,
        },
      }}
    >
      {/* Icon */}
      <Box
        component={motion.div}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          width: { xs: 52, sm: 60 },
          height: { xs: 52, sm: 60 },
          borderRadius: "50%",
          bgcolor: primaryBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: primaryColor,
          flexShrink: 0,
        }}
      >
        <Icon sx={{ fontSize: { xs: 26, sm: 30 } }} />
      </Box>

      {/* Number */}
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: 34, sm: 40, md: 44 },
          lineHeight: 1,
          color: secondaryColor,
          letterSpacing: "-0.02em",
        }}
      >
        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
      </Typography>

      {/* Divider accent */}
      <Box
        sx={{
          width: 32,
          height: 3,
          borderRadius: 2,
          bgcolor: primaryColor,
          opacity: 0.7,
        }}
      />

      {/* Label */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 13, sm: 14 },
          color: secondaryColor,
          lineHeight: 1.35,
        }}
      >
        {stat.label}
      </Typography>

      {/* Hint */}
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: { xs: 12, sm: 13 },
          color: primaryColor,
          lineHeight: 1.4,
        }}
      >
        {stat.hint}
      </Typography>
    </Box>
  );
}

function Stats() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs:1.5, sm: 3, md: 4 },
        bgcolor: whiteColor,
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          borderRadius: { xs: "20px", md: "24px" },
          bgcolor: secondaryBg,
          px: { xs: 1, sm: 4, md: 5 },
          py: { xs: 5, sm: 5, md: 5 },
          boxShadow,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background accent */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(251,134,30,0.07) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(251,134,30,0.05) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <Box sx={{ maxWidth: 600, mx: "auto", mb: { xs: 3.5, md: 4.5 }, position: "relative", zIndex: 1 }}>
          <Typography
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 22, sm: 26, md: 30 },
              color: secondaryColor,
              lineHeight: 1.25,
              mb: 1.5,
            }}
          >
            Proven results you can measure.
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: { xs: 13, sm: 14 },
              lineHeight: 1.65,
              color: textGrayDark,
            }}
          >
            From first sketch to final inspection, our numbers reflect the trust clients place in S&amp;S Associates.
          </Typography>
        </Box>

        {/* Cards grid */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1, sm: 2.5, md: 3 },
            position: "relative",
            zIndex: 1,
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Stats;
