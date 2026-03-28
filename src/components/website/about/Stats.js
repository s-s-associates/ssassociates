"use client";

import {
  primaryColor,
  primaryBg,
  secondaryColor,
  textGrayDark,
  whiteColor,
  secondaryBg,
} from "@/components/utils/Colors";
import {
  btnRadius,
  boxShadow,
  boxShadowHover,
  transition,
} from "@/components/utils/GlobalVariables";
import {
  Engineering,
  Apartment,
  EmojiPeople,
  Verified,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
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
      onUpdate: (latest) => {
        setCurrent(Math.floor(latest));
      },
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
    value: 150,
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
    value: 98,
    suffix: "%",
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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function Stats() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: whiteColor,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          borderRadius: btnRadius,
          backgroundColor: secondaryBg,
          p: { xs: 3, md: 4 },
          boxShadow,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 640,
            mx: "auto",
            mb: 3,
          }}
        >
          <Box
            component="h2"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 24, md: 28 },
              color: secondaryColor,
              mb: 1,
            }}
          >
            Proven results you can measure.
          </Box>
          <Box
            component="p"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.6,
              color: textGrayDark,
            }}
          >
            From first sketch to final inspection, our numbers reflect the trust
            clients place in S&amp;S Associates.
          </Box>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 2.5, md: 3 },
            alignItems: "stretch",
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Box
                key={stat.label}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                sx={{
                  backgroundColor: whiteColor,
                  borderRadius: btnRadius,
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1.25,
                  boxShadow,
                  border: `1px solid ${secondaryBg}`,
                  cursor: "default",
                  transition,
                  "&:hover": {
                    boxShadow: boxShadowHover,
                    borderColor: primaryColor,
                  },
                }}
              >
                <Stack 
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                  sx={{
                    gap: 1.25,
                    mb: 0.5,
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      fontWeight: 700,
                      fontSize: 40,
                      color: secondaryColor,
                    }}
                  >
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </Box>
                  <Box
                    component={motion.div}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: primaryBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: primaryColor,
                    }}
                  >
                    <Icon sx={{ fontSize: 34 }} />
                  </Box>
                </Stack>
                <Box
                  component="div"
                  sx={{
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 500,
                    fontSize: 14,
                    color: secondaryColor,
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </Box>
                <Box
                  component="div"
                  sx={{
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 400,
                    fontSize: 12,
                    color: textGrayDark,
                    textAlign: "center",
                  }}
                >
                  {stat.hint}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Stats;

