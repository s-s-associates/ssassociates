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
  Gavel,
  AssignmentTurnedIn,
  Construction,
  Policy,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const terms = [
  {
    icon: Gavel,
    title: "Scope of Services",
    content:
      "S&S Associates provides construction, renovation, and project management services as outlined in our written proposals and agreements. Any additional work outside the agreed scope will be discussed and approved before proceeding.",
  },
  {
    icon: AssignmentTurnedIn,
    title: "Proposals & Approvals",
    content:
      "All project details, including timelines, materials, and pricing, are documented in a formal proposal. Work begins only after written acceptance of the proposal and, where required, the receipt of an initial deposit.",
  },
  {
    icon: Construction,
    title: "Site Access & Safety",
    content:
      "Clients agree to provide safe and reasonable access to the project site. Our team follows strict safety procedures and local regulations to protect workers, visitors, and the surrounding environment.",
  },
  {
    icon: Policy,
    title: "Payments & Changes",
    content:
      "Invoices are issued in line with the agreed payment schedule. Variations requested during the project may affect the final cost or timeline and will be confirmed in writing before work continues.",
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

function TermsConditions() {
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
            Terms &amp; Conditions
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: textGrayDark,
              maxWidth: 640,
              mx: "auto",
            }}
          >
            These terms outline how we work with you on your construction and
            renovation projects at S&amp;S Associates.
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
          {terms.map((term) => {
            const Icon = term.icon;
            return (
              <Box
                key={term.title}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                sx={{
                  position: "relative",
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
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: btnRadius,
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    zIndex: 0,
                  },
                  "&:hover": {
                    boxShadow: boxShadowHover,
                    borderColor: primaryColor,
                    "&:before": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
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
                    {term.title}
                  </Box>
                </Box>
                <Box
                  component="p"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: textGrayDark,
                  }}
                >
                  {term.content}
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
            Acceptance of these terms
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
            By engaging S&amp;S Associates, you acknowledge that you have read
            and agreed to these Terms &amp; Conditions, along with any
            additional terms included in your project documentation.
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 13,
              color: textGrayDark,
            }}
          >
            These terms may be updated from time to time to reflect changes in
            our services or legal requirements.
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TermsConditions;

