"use client";

import {
  primaryColor,
  primaryBg,
  primaryGradient,
  secondaryColor,
  textGrayDark,
  textGrayLight,
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
  Security,
  AccessTime,
  Handshake,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { motion, useInView, animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: Engineering,
    title: "Expert Craftsmanship",
    description:
      "Our team combines technical precision with attention to detail to deliver structures that are built to last.",
  },
  {
    icon: Security,
    title: "Safety & Compliance",
    description:
      "We strictly follow safety standards and local building codes, ensuring every project is compliant and secure.",
  },
  {
    icon: AccessTime,
    title: "On-Time Delivery",
    description:
      "Smart planning, clear communication, and disciplined execution keep your project on schedule.",
  },
  {
    icon: Handshake,
    title: "Transparent Partnership",
    description:
      "From the first consultation to final handover, we keep you informed with honest, proactive communication.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

function AnimatedNumber({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
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
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function WhyChooseUs() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundImage: 'url("/images/about/why-choose-us-bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.65))",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1.4fr" },
          gap: { xs: 4, md: 6 },
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: copy */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              mb: 2,
              borderRadius: 999,
              backgroundColor: primaryBg,
              color: whiteColor,
              border: "1px solid rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              fontFamily:
                "var(--font-app)",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            Why Choose S&amp;S Associates
          </Box>

          <Box
            component="h2"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 28, md: 32 },
              lineHeight: 1.2,
              color: whiteColor,
              mb: 1.5,
            }}
          >
            Building with precision, integrity, and care.
          </Box>

          <Box
            component="p"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.7,
              color: textGrayLight,
              mb: 3,
            }}
          >
            We treat every project as a partnership. Our experienced team blends
            engineering expertise with clear communication so your vision turns
            into a space you are proud of.
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                minWidth: 160,
                px: 2,
                py: 1.5,
                borderRadius: btnRadius,
                backgroundColor: primaryColor,
                color: whiteColor,
                border: "1px solid rgba(255, 255, 255, 0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow,
              }}
            >
              <Box
                component="div"
                sx={{
                  fontFamily:
                    "var(--font-app)",
                  fontWeight: 700,
                  fontSize: 20,
                  mb: 0.5,
                }}
              >
                <AnimatedNumber value={Number(process.env.NEXT_PUBLIC_COMPANY_EXPERIENCE)} suffix="+ years" />
              </Box>
              <Box
                component="div"
                sx={{
                  fontFamily:
                    "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 13,
                }}
              >
                of hands-on construction experience
              </Box>
            </Box>
            <Box
              sx={{
                minWidth: 160,
                px: 2,
                py: 1.5,
                borderRadius: btnRadius,
                backgroundColor: "rgba(15, 23, 42, 0.45)",
                border: "1px solid rgba(148, 163, 184, 0.7)",
                color: whiteColor,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <Box
                component="div"
                sx={{
                  fontFamily:
                    "var(--font-app)",
                  fontWeight: 700,
                  fontSize: 20,
                  mb: 0.5,
                  color: whiteColor,
                }}
              >
                <AnimatedNumber value={100} suffix="% focus" />
              </Box>
              <Box
                component="div"
                sx={{
                  fontFamily:
                    "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 13,
                  color: textGrayLight,
                }}
              >
                on quality, safety, and timelines
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right: feature grid */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Box
                key={feature.title}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                sx={{
                  backgroundColor: "rgba(15, 23, 42, 0.36)",
                  borderRadius: btnRadius,
                  boxShadow,
                  border: "2px solid rgba(148, 163, 184, 0.8)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  cursor: "default",
                  transition,
                  "&:hover": {
                    boxShadow: boxShadowHover,
                    borderColor: primaryColor,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: primaryColor,
                  }}
                >
                  <Icon sx={{ fontSize: 34 }} />
                </Box>
                <Box
                  component="h3"
                  sx={{
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 600,
                    fontSize: 16,
                    color: whiteColor,
                  }}
                >
                  {feature.title}
                </Box>
                <Box
                  component="p"
                  sx={{
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: textGrayLight,
                  }}
                >
                  {feature.description}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default WhyChooseUs;

