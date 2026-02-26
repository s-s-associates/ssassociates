"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

export default function DashboardHeader({ displayName }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: 26,
          fontWeight: 800,
          color: "#0f172a",
          m: 0,
          mb: 0.5,
          letterSpacing: "-0.02em",
        }}
      >
        Welcome back, {displayName}
      </Typography>
      <Typography sx={{ color: "rgba(15,23,42,0.6)", fontSize: 15, fontWeight: 500 }}>
        Here’s what’s happening across your workspace.
      </Typography>
    </Box>
  );
}
