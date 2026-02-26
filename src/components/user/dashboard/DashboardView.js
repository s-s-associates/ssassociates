"use client";

import { bggrayColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Box } from "@mui/material";
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSkeleton from "./DashboardSkeleton";
import KPICards from "./KPICards";
import ProjectsByCategoryChart from "./ProjectsByCategoryChart";
import ProjectsByStatusChart from "./ProjectsByStatusChart";
import ProjectsTrendChart from "./ProjectsTrendChart";
import { useDashboardData } from "./useDashboardData";

function getDisplayName(authUser, authEmail) {
  if (authUser?.name?.trim()) return authUser.name;
  if (authUser?.firstName && authUser?.lastName)
    return `${authUser.firstName} ${authUser.lastName}`.trim();
  return authUser?.email || authEmail || "User";
}

export default function DashboardView() {
  const { user: authUser, email: authEmail } = getAuth();
  const displayName = getDisplayName(authUser, authEmail);
  const { loading, counts, trendData, projectsByCategory, projectsByStatus } =
    useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 1400,
        mx: "auto",
        bgcolor: bggrayColor,
        minHeight: "100vh",
      }}
    >
      <DashboardHeader displayName={displayName} />
      <KPICards counts={counts} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr" }, gap: 2, mb: 3 }}>
        <ProjectsTrendChart data={trendData} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <ProjectsByStatusChart data={projectsByStatus} />
        <ProjectsByCategoryChart data={projectsByCategory} />
      </Box>
    </Box>
  );
}
