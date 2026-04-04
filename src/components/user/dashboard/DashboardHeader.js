"use client";

import { Box, Typography } from "@mui/material";
import React from "react";

export default function DashboardHeader({ displayName }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: 22, sm: 26 },
          fontWeight: 800,
          color: "#0f172a",
          m: 0,
          mb: 0.4,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        Welcome,{" "}
        <Box
          component="span"
          sx={{
            background: "linear-gradient(135deg, #fb861e 0%, #f97316 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {displayName}
        </Box>
      </Typography>
      <Typography
        sx={{ color: "rgba(15,23,42,0.5)", fontSize: 14, fontWeight: 500 }}
      >
        Here's what's happening across your workspace.
      </Typography>
    </Box>
  );
}
