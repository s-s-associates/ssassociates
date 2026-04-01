"use client";

import { grayColor, primaryColor } from "@/components/utils/Colors";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Ayub, 67 Trade Centre Block, Johar Town, Lahore, Pakistan";

function Map() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        bgcolor: "#f4f5f7",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          component="h2"
          sx={{
            textAlign: "center",
            color: grayColor,
            fontWeight: 700,
            fontSize: { xs: 34, md: 46 },
            lineHeight: 1.15,
            mb: 1,
          }}
        >
          Visit Our Office
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "rgba(21, 21, 29, 0.62)",
            fontSize: { xs: 15, md: 20 },
            mb: 4,
          }}
        >
          Find us at our headquarters
        </Typography>

        <Box
          sx={{
            position: "relative",
            height: { xs: 340, md: 430 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 14px 34px rgba(15, 23, 42, 0.14)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
          }}
        >
          <Box
            component="iframe"
            title={`${COMPANY_NAME} location map`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4569.376874268435!2d74.2577622482634!3d31.456842727345006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919012785b30b73%3A0x2a59b81a0e9bff74!2sS%26S%20Associates%20Lahore!5e0!3m2!1sen!2s!4v1774520890394!5m2!1sen!2s"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            sx={{
              width: "100%",
              height: "100%",
              border: 0,
              filter: "grayscale(25%) contrast(95%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(39, 39, 39, 0.7) 0%, rgba(18, 18, 18, 0.76) 100%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                bgcolor: "rgba(255,255,255,0.88)",
                px: { xs: 3, md: 5 },
                py: { xs: 3, md: 4 },
                borderRadius: 3,
                border: "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
                maxWidth: 520,
                width: "100%",
              }}
            >
              <LocationOnOutlinedIcon
                sx={{ color: primaryColor, fontSize: 46, mb: 0.5 }}
              />

              <Typography
                sx={{ color: grayColor, fontWeight: 700, fontSize: { xs: 18, md: 20 } , mb:1}}
              >
                {COMPANY_ADDRESS}
              </Typography>

              <Button
                component="a"
                href="https://maps.google.com/?q=S%26S+Associates+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  bgcolor: primaryColor,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: primaryColor,
                    opacity: 0.92,
                  },
                }}
              >
                Open in Google Maps
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Map;
