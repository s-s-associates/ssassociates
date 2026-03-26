"use client";

import { primaryColor, primaryLight, secondaryDark, whiteColor } from "@/components/utils/Colors";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const whyChooseUsItems = [
  "25+ years of industry experience",
  "500+ successful projects completed",
  "Award-winning construction team",
  "Licensed and fully insured",
  "Competitive pricing and financing options",
  "24/7 customer support",
];

function CTASection({
  bgElementScale = 1,
  bgGlowScale = 1,
}) {
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300 * bgGlowScale, md: 520 * bgGlowScale },
          height: { xs: 300 * bgGlowScale, md: 520 * bgGlowScale },
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(251,134,30,0.52) 0%, rgba(251,134,30,0.34) 30%, rgba(251,134,30,0.16) 52%, rgba(251,134,30,0.05) 66%, transparent 76%)",
          filter: "blur(20px)",
          animation: "ctaOrbA 12s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1120,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
          gap: { xs: 2.5, md: 10 },
          alignItems: "stretch",
          borderRadius: 4,
          border: "1px solid rgba(255,255,255,0.12)",
          background:
            "linear-gradient(145deg, rgba(12, 16, 24, 0) 0%, rgba(24, 30, 41, 0.13) 52%, rgba(45, 34, 24, 0.16) 100%)",
          boxShadow: "0 22px 44px rgba(0, 0, 0, 0.36)",
          p: { xs: 2.2, sm: 2.8, md: 3.2 },
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              color: primaryColor,
              fontSize: { xs: 30, md: 42 },
              lineHeight: 1.03,
              fontWeight: 800,
              maxWidth: 560,
              mb: 1.5,
              textShadow: "0 8px 18px rgba(0,0,0,0.28)",
            }}
          >
            Ready to Start Your
            <br />
            Project?
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: { xs: 14, md: 17 },
              lineHeight: 1.55,
              maxWidth: 560,
              mb: 2.4,
            }}
          >
            Our team of experts is ready to bring your construction vision to
            life. Contact us today for a free consultation and let&apos;s discuss
            how we can help you achieve your goals.
          </Typography>

          <Box sx={{ display: "grid", gap: 1.2 }}>
            <Box
              component={motion.div}
              whileHover={{ x: 5 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.8,
                borderRadius: 2.5,
                p: 0.9,
                border: "1px solid rgba(255,255,255,0.09)",
                bgcolor: "rgba(255,255,255,0.07)",
                "&:hover .contact-value": {
                  color: primaryColor,
                },
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "rgba(251,134,30,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(251,134,30,0.38)",
                }}
              >
                <CallOutlinedIcon sx={{ color: whiteColor, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
                  Call us anytime
                </Typography>
                <Typography
                  className="contact-value"
                  component="a"
                  href="tel:+1234567890"
                  sx={{
                    color: whiteColor,
                    fontSize: { xs: 15, md: 18 },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    transition: "color 0.3s ease",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  +1 (234) 567-890
                </Typography>
              </Box>
            </Box>

            <Box
              component={motion.div}
              whileHover={{ x: 5 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.8,
                borderRadius: 2.5,
                p: 0.9,
                border: "1px solid rgba(255,255,255,0.09)",
                bgcolor: "rgba(255,255,255,0.07)",
                "&:hover .contact-value": {
                  color: primaryColor,
                },
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  bgcolor: "rgba(251,134,30,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(251,134,30,0.38)",
                }}
              >
                <EmailOutlinedIcon sx={{ color: whiteColor, fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
                  Email us at
                </Typography>
                <Typography
                  className="contact-value"
                  component="a"
                  href="mailto:info@ssassociates.com"
                  sx={{
                    color: whiteColor,
                    fontSize: { xs: 15, md: 18 },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    transition: "color 0.3s ease",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  info@ssassociates.com
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.08)",
            borderRadius: 3,
            px: { xs: 2.2, md: 2.8 },
            py: { xs: 2.2, md: 2.8 },
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            component="h3"
            sx={{
              color: primaryColor,
              fontSize: { xs: 23, md: 30 },
              fontWeight: 800,
              mb: 1.4,
            }}
          >
            Why Choose Us?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.1,
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            {whyChooseUsItems.map((item, index) => (
              <Box
                component={motion.div}
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                sx={{ display: "flex", alignItems: "center", gap: 1.4 }}
              >
                <CheckCircleRoundedIcon sx={{ color: primaryColor, fontSize: 18 }} />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.95)",
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 1.35,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          "@keyframes ctaOrbA": {
            "0%, 100%": { transform: "translate(-50%, -50%)" },
            "50%": { transform: "translate(-50%, calc(-50% - 10px))" },
          },
        }}
      />
    </Box>
  );
}

export default CTASection;
