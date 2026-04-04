"use client";

import { primaryColor, primaryLight, secondaryDark, whiteColor } from "@/components/utils/Colors";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const socialItems = [
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    href: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP,
    accent: "linear-gradient(135deg, rgba(255,166,92,0.3), rgba(255,255,255,0.04))",
  },
  {
    name: "Facebook",
    icon: FacebookRoundedIcon,
    href: process.env.NEXT_PUBLIC_COMPANY_FACEBOOK,
    accent: "linear-gradient(135deg, rgba(251,134,30,0.28), rgba(255,255,255,0.05))",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM,
    accent: "linear-gradient(135deg, rgba(231,100,0,0.36), rgba(255,255,255,0.05))",
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
    href: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN,
    accent: "linear-gradient(135deg, rgba(251,134,30,0.25), rgba(255,255,255,0.05))",
  },
  {
    name: "Email",
    icon: EmailRoundedIcon,
    href: `mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL || ""}`,
    accent: "linear-gradient(135deg, rgba(255,142,61,0.28), rgba(255,255,255,0.05))",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function SocialMediaSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: secondaryDark,
        py: { xs: 7, md: 9 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -90,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.34), transparent 70%)",
          filter: "blur(4px)",
          animation: "orbFloat 8s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: -100,
          bottom: -110,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(255,184,116,0.26), transparent 72%)",
          filter: "blur(6px)",
          animation: "orbFloatTwo 10s ease-in-out infinite",
        }}
      />

      <Box sx={{ position: "relative", maxWidth: 1200, mx: "auto", zIndex: 1 }}>
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65 }}
          sx={{
            textAlign: "center",
            color: whiteColor,
            fontSize: { xs: 38, md: 56 },
            fontWeight: 800,
            lineHeight: 1.05,
            mb: 1,
          }}
        >
          Follow Us
        </Typography>

        <Typography
          component={motion.p}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          sx={{
            textAlign: "center",
            color: "rgba(255,255,255,0.72)",
            fontSize: { xs: 16, md: 22 },
            mb: { xs: 4, md: 5.5 },
          }}
        >
          Stay connected with {process.env.NEXT_PUBLIC_COMPANY_NAME} across our social channels
        </Typography>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(5, 1fr)" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <Box
                key={item.name}
                component={motion.a}
                variants={cardVariants}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 3,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 3, md: 3.2 },
                  minHeight: { xs: 170, md: 195 },
                  textDecoration: "none",
                  color: whiteColor,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background:
                    "linear-gradient(140deg, rgba(15,18,26,0.9) 0%, rgba(24,29,40,0.9) 42%, rgba(42,35,26,0.88) 100%)",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: item.accent,
                    opacity: 0.95,
                    transition: "opacity 0.35s ease",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -80,
                    right: -60,
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.22), transparent 70%)",
                    opacity: 0.45,
                    transition: "transform 0.45s ease",
                  },
                  "&:hover::after": {
                    transform: "translate(-10px, 10px) scale(1.1)",
                  },
                  "&:hover .social-icon-wrap": {
                    transform: "translateY(-4px) rotate(-4deg)",
                  },
                  "&:hover .social-arrow": {
                    transform: "translateX(5px) translateY(-3px)",
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box
                    className="social-icon-wrap"
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(4px)",
                      transition: "transform 0.35s ease",
                      mb: 2.2,
                    }}
                  >
                    <Icon sx={{ fontSize: 33, color: whiteColor }} />
                  </Box>

                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 22, md: 28 }, lineHeight: 1.2 }}>
                    {item.name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.6,
                    color: primaryLight,
                    fontWeight: 700,
                    fontSize: 14,
                    mt: 1.5,
                  }}
                >
                  Connect now
                  <ArrowOutwardRoundedIcon className="social-arrow" sx={{ fontSize: 18, transition: "transform 0.25s ease" }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          "@keyframes orbFloat": {
            "0%, 100%": { transform: "translate(0px, 0px)" },
            "50%": { transform: "translate(18px, 22px)" },
          },
          "@keyframes orbFloatTwo": {
            "0%, 100%": { transform: "translate(0px, 0px)" },
            "50%": { transform: "translate(-16px, -20px)" },
          },
        }}
      />
    </Box>
  );
}

export default SocialMediaSection;
