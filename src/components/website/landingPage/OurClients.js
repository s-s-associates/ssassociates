"use client";

import {
  primaryColor,
  primaryLight,
  primaryBg,
  secondaryColor,
  textGrayDark,
  textGrayLight,
  whiteColor,
} from "@/components/utils/Colors";
import { btnRadius, boxShadow, boxShadowHover, transition } from "@/components/utils/GlobalVariables";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const clients = [
  { name: "BuildPro", logo: "BP" },
  { name: "ConstructCo", logo: "CC" },
  { name: "Urban Developers", logo: "UD" },
  { name: "Metro Estates", logo: "ME" },
  { name: "Prime Properties", logo: "PP" },
  { name: "Skyline Group", logo: "SG" },
  { name: "Elite Constructions", logo: "EC" },
  { name: "NextGen Builders", logo: "NB" },
];

// Duplicate for infinite scroll effect
const duplicatedClients = [...clients, ...clients, ...clients];

function OurClients() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: whiteColor,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          mb: 5,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ textAlign: "center" }}
        >
          <Box
            component="h2"
            sx={{
              fontFamily:
                "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: { xs: 28, md: 32 },
              lineHeight: 1.2,
              color: secondaryColor,
              mb: 1.5,
            }}
          >
            Trusted by Industry Leaders
          </Box>
          <Box
            component="p"
            sx={{
              fontFamily:
                "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.6,
              color: textGrayDark,
            }}
          >
            Partnering with the best in the business
          </Box>
        </Box>
      </Box>

      <Box sx={{ position: "relative" }}>
        {/* Gradient overlays */}
        <Box
          sx={{
            position: "absolute",
            insetY: 0,
            left: 0,
            width: { xs: 40, sm: 64, md: 80 },
            background: `linear-gradient(to right, ${whiteColor}, rgba(255,255,255,0))`,
            zIndex: 10,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            insetY: 0,
            right: 0,
            width: { xs: 40, sm: 64, md: 80 },
            background: `linear-gradient(to left, ${whiteColor}, rgba(255,255,255,0))`,
            zIndex: 10,
          }}
        />

        {/* Scrolling container */}
        <Box
          component={motion.div}
          sx={{
            display: "flex",
            gap: { xs: 2.5, sm: 3 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedClients.map((client, index) => (
            <Box
              key={`${client.name}-${index}`}
              sx={{
                flexShrink: 0,
                width: 180,
                height: 120,
                backgroundColor: whiteColor,
                borderRadius: btnRadius,
                border: `2px solid ${textGrayLight}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow,
                transition,
                "&:hover": {
                  borderColor: primaryColor,
                  boxShadow: boxShadowHover,
                },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${primaryBg}, ${primaryLight})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                    transition,
                    ".client-card:hover &": {},
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontFamily:
                        "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 22,
                      color: primaryColor,
                    }}
                  >
                    {client.logo}
                  </Box>
                </Box>
                <Box
                  component="div"
                  sx={{
                    fontFamily:
                      "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: textGrayDark,
                  }}
                >
                  {client.name}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default OurClients;

