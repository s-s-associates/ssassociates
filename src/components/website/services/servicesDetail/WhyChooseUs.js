"use client";

import { primaryColor, secondaryColor, whiteColor } from "@/components/utils/Colors";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, SectionHeading } from "./serviceDetailShared";

export default function WhyChooseUs({ extraBenefits }) {
  if (!extraBenefits.length) return null;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 9 },
        bgcolor: secondaryColor,
        color: whiteColor,
      }}
    >
      <Container maxWidth="lg">
        <motion.div {...fadeUp}>
          <SectionHeading kicker="Why choose us" title="Extra Benefits" light />
        </motion.div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: 2,
            rowGap: 2,
          }}
        >
          {extraBenefits.map((line, i) => (
            <Box
              key={i}
              component={motion.div}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              sx={{
                boxSizing: "border-box",
                width: {
                  xs: "100%",
                  sm: "calc((100% - 16px) / 2)",
                },
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "default",
                  transition:
                    "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    bgcolor: "rgba(255,255,255,0.12)",
                    borderColor: "rgba(251, 134, 30, 0.45)",
                    boxShadow: "0 14px 36px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(251, 134, 30, 0.2)",
                  },
                  "&:hover .benefit-star": {
                    transform: "scale(1.12) rotate(-6deg)",
                    color: "rgb(255, 184, 116)",
                    filter: "drop-shadow(0 2px 8px rgba(251, 134, 30, 0.55))",
                  },
                }}
              >
                <StarRoundedIcon
                  className="benefit-star"
                  sx={{
                    color: primaryColor,
                    fontSize: 26,
                    flexShrink: 0,
                    mt: 0.2,
                    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.35s ease, filter 0.35s ease",
                  }}
                />
                <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.92)" }}>{line}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
