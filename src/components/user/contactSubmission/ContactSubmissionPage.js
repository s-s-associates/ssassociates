"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function ContactSubmissionPage() {
  return (
    <Box sx={{ p: 3, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Typography
        component="h1"
        sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0, mb: 3 }}
      >
        Contact submissions
      </Typography>
      <Box
        bgcolor="white"
        borderRadius={2}
        p={3}
        sx={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: `1px solid ${bordergrayColor}`,
        }}
      >
        <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: 15, mb: 2 }}>
          Contact form submissions will appear here. Add a contact form on your site and an API to save submissions to view them here.
        </Typography>
        <Typography sx={{ fontSize: 14, color: primaryColor, fontWeight: 600 }} component={Link} href="/user/dashboard">
          ← Back to Dashboard
        </Typography>
      </Box>
    </Box>
  );
}
