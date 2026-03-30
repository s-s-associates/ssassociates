"use client";

import { primaryColor } from "@/components/utils/Colors";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp, SectionHeading } from "./serviceDetailShared";

const SUB_ICONS = [LayersRoundedIcon, HandymanRoundedIcon, ApartmentRoundedIcon, EngineeringRoundedIcon];

export default function SubService({ subServices }) {
  if (!subServices.length) return null;

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 9 }, bgcolor: "#f1f5f9" }}>
      <Container maxWidth="lg">
        <motion.div {...fadeUp}>
          <SectionHeading kicker="Breakdown" title="Our Sub-Services" />
        </motion.div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: 3,
            rowGap: 3,
          }}
        >
          {subServices.map((sub, i) => {
            const Icon = SUB_ICONS[i % SUB_ICONS.length];
            const items = Array.isArray(sub.items) ? sub.items.filter(Boolean) : [];
            return (
              <Box
                key={i}
                component={motion.div}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                sx={{
                  boxSizing: "border-box",
                  width: {
                    xs: "100%",
                    sm: "calc((100% - 24px) / 2)",
                    md: "calc((100% - 48px) / 3)",
                  },
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    bgcolor: "#fff",
                    borderRadius: 3,
                    p: 3,
                    boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                    border: "1px solid rgba(15,23,42,0.06)",
                    cursor: "default",
                    transition:
                      "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "rgba(251, 134, 30, 0.28)",
                      boxShadow:
                        "0 22px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(251, 134, 30, 0.15)",
                    },
                    "&:hover .sub-icon-wrap": {
                      bgcolor: "rgba(251, 134, 30, 0.28)",
                      transform: "scale(1.06)",
                    },
                    "&:hover .sub-icon-wrap svg": {
                      color: "rgb(231, 100, 0)",
                    },
                  }}
                >
                  <Box
                    className="sub-icon-wrap"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "rgba(251, 134, 30, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      transition:
                        "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease",
                    }}
                  >
                    <Icon sx={{ color: primaryColor, fontSize: 28, transition: "color 0.35s ease" }} />
                  </Box>
                  <Typography sx={{ fontSize: 20, fontWeight: 800, color: "rgb(15, 23, 42)", mb: 1 }}>
                    {sub.title || `Phase ${i + 1}`}
                  </Typography>
                  {sub.description ? (
                    <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: "rgb(100, 116, 139)", mb: 2 }}>
                      {sub.description}
                    </Typography>
                  ) : null}
                  <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                    {items.map((item, j) => (
                      <Box
                        key={j}
                        component="li"
                        sx={{
                          display: "flex",
                          gap: 1.25,
                          alignItems: "flex-start",
                          mb: 1.25,
                          fontSize: 14,
                          color: "rgb(51, 65, 85)",
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: primaryColor,
                            mt: 0.85,
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
