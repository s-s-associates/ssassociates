"use client";

import { bggrayColor } from "@/components/utils/Colors";
import { Box, Skeleton } from "@mui/material";
import React from "react";

export default function DashboardSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 1400, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Skeleton variant="text" width={320} height={40} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={240} height={24} sx={{ mb: 3 }} />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, mb: 3 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={120} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
      <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2, mb: 2 }} />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
      </Box>
    </Box>
  );
}
