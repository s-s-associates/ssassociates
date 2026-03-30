"use client";
import { primaryColor, primaryHover } from "@/components/utils/Colors";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ProjectCTA() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, sm: 7, md: 8 },
        px: { xs: 2, sm: 3 },
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: '"Times New Roman", Georgia, serif',
            fontWeight: 700,
            fontSize: { xs: 40, sm: 52, md: 62 },
            lineHeight: 1.06,
            color: "#111827",
            letterSpacing: "-0.02em",
            mb: 1.2,
          }}
        >
          Interested in a <Box component="span" sx={{ color: primaryColor }}>similar project?</Box>
        </Typography>

        <Typography
          sx={{
            color: "rgba(17,24,39,0.72)",
            fontSize: { xs: 15, sm: 18 },
            lineHeight: 1.7,
            maxWidth: 640,
            mx: "auto",
            mb: 3,
          }}
        >
          Let&apos;s discuss how we can bring your vision to life with the same level of quality and dedication.
        </Typography>

        <Button
          component={Link}
          href="/contact"
          variant="contained"
          endIcon={<FiArrowRight size={16} />}
          sx={{
            bgcolor: primaryColor,
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: { xs: 14, sm: 15 },
            px: { xs: 3, sm: 3.8 },
            py: 1.15,
            borderRadius: 2,
            minWidth: { xs: 170, sm: 200 },
            boxShadow: "none",
            "&:hover": { bgcolor: primaryHover, boxShadow: "none" },
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );
}
