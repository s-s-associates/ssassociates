"use client";

import {
  primaryColor,
  primaryBg,
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
  Security,
  Visibility,
  MailOutline,
  DeleteSweep,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const sections = [
  {
    icon: Security,
    title: "Information We Collect",
    content:
      "We collect only the information necessary to provide our construction services and respond to your enquiries. This may include your name, contact details, project requirements, and any files or drawings you choose to share with us.",
  },
  {
    icon: Visibility,
    title: "How We Use Your Information",
    content:
      "Your information is used to prepare proposals, manage ongoing projects, improve our services, and communicate important updates. We never sell your personal data or share it with third parties for unrelated marketing.",
  },
  {
    icon: MailOutline,
    title: "Communication & Updates",
    content:
      "We may contact you by email or phone to share project updates, appointment reminders, or relevant service information. You can ask us to limit certain communications at any time.",
  },
  {
    icon: DeleteSweep,
    title: "Data Protection & Retention",
    content:
      "We store your information in secure systems and keep it only for as long as required for legal, accounting, or project-related reasons. When no longer needed, your data is safely deleted or anonymised.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function PrivacyPolicy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: whiteColor,
      }}
    >
      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          sx={{ textAlign: "center", mb: 4 }}
        >
          <Box
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 26, md: 30 },
              color: secondaryColor,
              mb: 1,
            }}
          >
            Privacy Policy
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: textGrayDark,
              maxWidth: 620,
              mx: "auto",
            }}
          >
            We respect your privacy and are committed to protecting the
            information you share with S&amp;S Associates.
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
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Box
                key={section.title}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                sx={{
                  backgroundColor: secondaryBg,
                  borderRadius: btnRadius,
                  boxShadow,
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  border: `1px solid ${secondaryBg}`,
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
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: primaryBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: primaryColor,
                    }}
                  >
                    <Icon sx={{ fontSize: 22 }} />
                  </Box>
                  <Box
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: secondaryColor,
                    }}
                  >
                    {section.title}
                  </Box>
                </Box>
                <Box
                  component="p"
                  sx={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: textGrayDark,
                  }}
                >
                  {section.content}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            borderRadius: btnRadius,
            backgroundColor: secondaryBg,
            border: `1px dashed ${textGrayLight}`,
            px: 2.5,
            py: 2.25,
            boxShadow,
          }}
        >
          <Box
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: 15,
              color: secondaryColor,
              mb: 0.5,
            }}
          >
            Your privacy choices
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              lineHeight: 1.7,
              color: textGrayDark,
              mb: 1,
            }}
          >
            If you have questions about how we handle your information, or if
            you would like to update, correct, or delete your details, please
            contact our team. We will review your request and respond within a
            reasonable timeframe.
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 13,
              color: textGrayDark,
            }}
          >
            This policy may be updated occasionally to reflect changes in our
            services or applicable regulations.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PrivacyPolicy;

