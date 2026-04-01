"use client";

import {
  primaryColor,
  primaryBg,
  primaryLight,
  secondaryColor,
  secondaryDark,
  secondaryLight,
  textGrayLight,
  whiteColor,
} from "@/components/utils/Colors";
import {
  btnRadius,
  boxShadow,
  boxShadowHover,
  transition,
} from "@/components/utils/GlobalVariables";
import {
  Flag,
  Visibility,
  FavoriteBorder,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const principleCards = [
  {
    icon: Flag,
    label: "Our Mission",
    title: "Deliver reliable spaces that stand the test of time.",
    description:
      "We are committed to turning ideas into durable, functional spaces by combining engineering expertise, quality materials, and disciplined project management.",
  },
  {
    icon: Visibility,
    label: "Our Vision",
    title: "Shape the future skyline with integrity.",
    description:
      "We aim to be the trusted construction partner for ambitious residential and commercial projects, known for transparency, innovation, and craftsmanship.",
  },
  {
    icon: FavoriteBorder,
    label: "Our Values",
    title: "Built on trust, safety, and respect.",
    description:
      "Every decision we make is guided by safety, accountability, and respect—for our clients, our teams, and the communities we build in.",
  },
];

const cardContainerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.02 },
};

const cardBorderTopVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const cardBorderRightVariants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
};

const cardBorderBottomVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const cardBorderLeftVariants = {
  rest: { scaleY: 0 },
  hover: { scaleY: 1 },
};

function OurPrinciples() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 9 },
        px: { xs: 2, sm: 3, md: 4 },
        background: secondaryDark,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          sx={{ textAlign: "center", mb: 4 }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1.5,
              py: 0.75,
              mb: 1.5,
              borderRadius: 999,
              backgroundColor: primaryBg,
              border: "1px solid rgba(251,134,30,0.28)",
              color: primaryColor,
              fontFamily:
                "var(--font-app)",
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            Our Principles
          </Box>
          <Box
            component="h2"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 26, md: 30 },
              color: whiteColor,
              mb: 1,
            }}
          >
            The foundation behind every project.
          </Box>
          <Box
            component="p"
            sx={{
              fontFamily:
                "var(--font-app)",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 560,
              mx: "auto",
            }}
          >
            Our core principles guide how we plan, communicate, and build—so you
            experience a smooth process and a dependable result.
          </Box>
        </Box>

        <Box
          component={motion.div}
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 2.5, md: 3 },
            mt: 3,
          }}
        >
          {principleCards.map((card) => {
            const Icon = card.icon;
            return (
              <Box
                key={card.label}
                component={motion.div}
                variants={cardItemVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.2 }}
                sx={{
                  position: "relative",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: btnRadius,
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow,
                  px: 2.5,
                  py: 2.5,
                  overflow: "hidden",
                  cursor: "default",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  transition,
                  "&:hover": {
                    boxShadow: `${boxShadowHover}, 0 16px 36px rgba(251, 134, 30, 0.28), 0 0 48px rgba(251, 134, 30, 0.2)`,
                  },
                }}
              >
                {/* Animated border segments */}
                <Box
                  component={motion.div}
                  variants={cardBorderTopVariants}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: primaryColor,
                    transformOrigin: "left center",
                    zIndex: 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
                <Box
                  component={motion.div}
                  variants={cardBorderRightVariants}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 2,
                    backgroundColor: primaryColor,
                    transformOrigin: "center top",
                    zIndex: 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut", delay: 0.08 }}
                />
                <Box
                  component={motion.div}
                  variants={cardBorderBottomVariants}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: primaryColor,
                    transformOrigin: "right center",
                    zIndex: 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut", delay: 0.16 }}
                />
                <Box
                  component={motion.div}
                  variants={cardBorderLeftVariants}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 2,
                    backgroundColor: primaryColor,
                    transformOrigin: "center bottom",
                    zIndex: 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut", delay: 0.24 }}
                />

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: primaryBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        fontFamily:
                          "var(--font-app)",
                        fontWeight: 600,
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      {card.label}
                    </Box>
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
                    {card.title}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      fontFamily:
                        "var(--font-app)",
                      fontWeight: 400,
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    {card.description}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default OurPrinciples;

