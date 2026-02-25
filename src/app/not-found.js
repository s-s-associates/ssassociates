"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)",
      }}
    >
      <Box
        sx={{
          fontSize: { xs: 80, sm: 120 },
          fontWeight: 800,
          color: primaryColor,
          lineHeight: 1,
          mb: 1,
          fontFamily: "var(--font-inter), Inter, sans-serif",
        }}
      >
        404
      </Box>
      <Box
        sx={{
          fontSize: { xs: 20, sm: 24 },
          fontWeight: 600,
          color: grayColor,
          mb: 2,
          textAlign: "center",
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
        }}
      >
        Page not found
      </Box>
      <Box
        sx={{
          fontSize: 15,
          color: "rgba(21, 21, 29, 0.65)",
          textAlign: "center",
          maxWidth: 360,
          mb: 4,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Box>
      <Box
        component={Link}
        href="/"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: primaryColor,
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          py: 1.5,
          px: 4,
          borderRadius: 2,
          textDecoration: "none",
          "&:hover": { bgcolor: "#7A2FE5" },
        }}
      >
        Back to home
      </Box>
    </Box>
  );
}
