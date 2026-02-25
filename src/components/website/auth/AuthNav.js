"use client";

import { grayColor } from "@/components/utils/Colors";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";

function AuthNav() {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        background: "#fff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        minHeight: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        component={Link}
        href="/"
        sx={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontWeight: 700,
          fontSize: 24,
          color: grayColor,
          textDecoration: "none",
        }}
      >
        CoachScout
      </Box>
      <IconButton
        component={Link}
        href="/"
        aria-label="Cancel / Close"
        sx={{
          position: "absolute",
          right: 8,
          color: grayColor,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default AuthNav;
