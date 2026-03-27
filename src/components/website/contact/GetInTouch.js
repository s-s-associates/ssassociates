"use client";

import { primaryColor, primaryLight, secondaryDark, whiteColor } from "@/components/utils/Colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const contactItems = [
  {
    title: "Phone",
    icon: PhoneOutlinedIcon,
    lines: [
      { text: "+1 (234) 567-890", href: "tel:+1234567890" },
      { text: "+1 (234) 567-891", href: "tel:+1234567891" },
    ],
  },
  {
    title: "Email",
    icon: EmailOutlinedIcon,
    lines: [
      { text: "info@ssassociates.com", href: "mailto:info@ssassociates.com" },
      { text: "contact@ssassociates.com", href: "mailto:contact@ssassociates.com" },
    ],
  },
  {
    title: "Address",
    icon: LocationOnOutlinedIcon,
    lines: [{ text: "123 Construction Ave" }, { text: "Building City, BC 12345" }],
  },
  {
    title: "Working Hours",
    icon: AccessTimeIcon,
    lines: [{ text: "Mon - Sat: 8:00 AM - 6:00 PM" }, { text: "Sunday: Closed" }],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function GetInTouch() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: secondaryDark,
        py: { xs: 6, md: 9 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "-5%",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,134,30,0.12), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          maxWidth: 1200,
          mx: "auto",
          zIndex: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "stretch", lg: "flex-start" },
          gap: { xs: 5, lg: 8 },
        }}
      >
        {/* Left: copy */}
        <Box
          component={motion.div}
          variants={leftVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          sx={{
            flex: { lg: "0 1 42%" },
            maxWidth: { lg: 520 },
            pt: { lg: 1 },
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${primaryColor}, rgba(255,184,116,0.4))`,
              mb: 2.5,
            }}
          />
          <Typography
            component="h2"
            sx={{
              color: whiteColor,
              fontSize: { xs: 34, md: 44 },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.78)",
              fontSize: { xs: 17, md: 19 },
              lineHeight: 1.55,
              mb: 3,
            }}
          >
            We&apos;re here to answer your questions and discuss your project—whether you need a quote, a
            site visit, or a quick call.
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.55)",
              fontSize: { xs: 15, md: 16 },
              lineHeight: 1.65,
              mb: 3,
            }}
          >
            Reach us by phone or email, or stop by during business hours. Our team typically responds within
            one business day.
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              py: 1.25,
              px: 2,
              borderRadius: 2,
              border: "1px solid rgba(251,134,30,0.35)",
              bgcolor: "rgba(251,134,30,0.08)",
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: primaryColor,
                boxShadow: `0 0 12px ${primaryColor}`,
              }}
            />
            <Typography sx={{ color: primaryLight, fontWeight: 600, fontSize: 14 }}>
              Prefer email? We reply within 24 hours on weekdays.
            </Typography>
          </Box>
        </Box>

        {/* Right: contact boxes */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            flex: { lg: "1 1 58%" },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, md: 2.5 },
            alignContent: "start",
          }}
        >
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <Box
                key={item.title}
                component={motion.article}
                variants={cardVariants}
                whileHover={{
                  borderColor: "rgba(251,134,30,0.45)",
                  bgcolor: "rgba(255,255,255,0.06)",
                }}
                transition={{ duration: 0.2 }}
                sx={{
                  position: "relative",
                  borderRadius: 2.5,
                  p: 2.5,
                  border: "1px solid rgba(255,255,255,0.1)",
                  bgcolor: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(251,134,30,0.15)",
                      border: "1px solid rgba(251,134,30,0.25)",
                    }}
                  >
                    <Icon sx={{ fontSize: 22, color: primaryLight }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: whiteColor,
                        mb: 0.75,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      {item.lines.map((line) =>
                        line.href ? (
                          <Typography
                            key={line.text}
                            component="a"
                            href={line.href}
                            sx={{
                              fontSize: 14,
                              color: "rgba(255,255,255,0.82)",
                              textDecoration: "none",
                              lineHeight: 1.5,
                              wordBreak: "break-word",
                              transition: "color 0.2s ease",
                              "&:hover": { color: primaryLight },
                            }}
                          >
                            {line.text}
                          </Typography>
                        ) : (
                          <Typography
                            key={line.text}
                            sx={{
                              fontSize: 14,
                              color: "rgba(255,255,255,0.82)",
                              lineHeight: 1.5,
                            }}
                          >
                            {line.text}
                          </Typography>
                        ),
                      )}
                    </Box>
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

export default GetInTouch;
