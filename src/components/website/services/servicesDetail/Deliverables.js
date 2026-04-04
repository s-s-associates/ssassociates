"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, SectionHeading } from "./serviceDetailShared";

export default function Deliverables({ whatYouGet }) {
  if (!whatYouGet.length) return null;

  return (
    <Box
      id="what-you-get"
      component="section"
      sx={{
        py: { xs: 7, md: 11 },
        bgcolor: "#fff",
        position: "relative",
        overflow: "hidden",
        // ambient glow
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,134,30,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp}>
          <SectionHeading kicker="Deliverables" title="What You Get" />
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
          {whatYouGet.map((line, i) => (
            <Box
              key={i}
              component={motion.div}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.07 }}
              maxWidth={350}
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
                  height: "100%",
                  p: 3,
                  borderRadius: "16px",
                  border: "1px solid rgba(15,23,42,0.08)",
                  bgcolor: "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  transition:
                    "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease",
                  // animated top border
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${primaryColor}, #ffa94d)`,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                    borderRadius: "16px 16px 0 0",
                  },
                  "&:hover": {
                    transform: "translateY(-6px)",
                    bgcolor: "#fff",
                    borderColor: "rgba(251,134,30,0.18)",
                    boxShadow:
                      "0 20px 60px rgba(15,23,42,0.1), 0 0 0 1px rgba(251,134,30,0.1)",
                  },
                  "&:hover::before": { transform: "scaleX(1)" },
                  "&:hover .wyg-icon": {
                    transform: "scale(1.1) rotate(-4deg)",
                    boxShadow: "0 8px 24px rgba(251,134,30,0.45)",
                  },
                }}
              >
                {/* Icon badge */}
                <Box
                  className="wyg-icon"
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${primaryColor} 0%, #ffa94d 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(251,134,30,0.3)",
                    transition:
                      "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "rgb(51,65,85)",
                    fontWeight: 500,
                  }}
                >
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
