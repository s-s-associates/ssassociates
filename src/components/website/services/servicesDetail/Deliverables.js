"use client";

import { primaryColor } from "@/components/utils/Colors";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, SectionHeading } from "./serviceDetailShared";

export default function Deliverables({ whatYouGet }) {
  if (!whatYouGet.length) return null;

  return (
    <Box id="what-you-get" component="section" sx={{ py: { xs: 7, md: 9 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <motion.div {...fadeUp}>
          <SectionHeading kicker="Deliverables" title="What You Get" />
        </motion.div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: 2.5,
            rowGap: 2.5,
          }}
        >
          {whatYouGet.map((line, i) => (
            <Box
              key={i}
              component={motion.div}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              sx={{
                boxSizing: "border-box",
                width: {
                  xs: "100%",
                  sm: "calc((100% - 20px) / 2)",
                  md: "calc((100% - 40px) / 3)",
                },
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  p: 2.5,
                  borderRadius: 2,
                  border: "1px solid rgba(15,23,42,0.08)",
                  bgcolor: "#fafafa",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  cursor: "default",
                  transition:
                    "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s ease, background-color 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    bgcolor: "#fff",
                    borderColor: "rgba(251, 134, 30, 0.32)",
                    boxShadow:
                      "0 16px 40px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(251, 134, 30, 0.12)",
                  },
                  "&:hover .wyg-check": {
                    transform: "scale(1.08)",
                    bgcolor: "rgb(231, 100, 0)",
                    boxShadow: "0 6px 18px rgba(251, 134, 30, 0.45)",
                  },
                }}
              >
                <Box
                  className="wyg-check"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: primaryColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition:
                      "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease, box-shadow 0.35s ease",
                  }}
                >
                  <CheckRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
                </Box>
                <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: "rgb(51, 65, 85)", fontWeight: 500 }}>
                  {line}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
