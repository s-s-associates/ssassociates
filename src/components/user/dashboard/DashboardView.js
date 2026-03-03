"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Box, Button } from "@mui/material";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import DashboardHeader from "./DashboardHeader";
import DashboardSkeleton from "./DashboardSkeleton";
import KPICards from "./KPICards";
import OverviewComboChart from "./OverviewComboChart";
import ProjectsByCategoryChart from "./ProjectsByCategoryChart";
import ProjectsByStatusChart from "./ProjectsByStatusChart";
import ProjectsStatusRadialChart from "./ProjectsStatusRadialChart";
import ProjectsTrendChart from "./ProjectsTrendChart";
import SubmissionsTrendChart from "./SubmissionsTrendChart";
import SubscribersTrendChart from "./SubscribersTrendChart";
import WebsiteContentChart from "./WebsiteContentChart";
import WebsiteContentDonutChart from "./WebsiteContentDonutChart";
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
  const {
    loading,
    counts,
    trendData,
    projectsByCategory,
    projectsByStatus,
    websiteContent,
    submissionsTrend,
    subscribersTrend,
    overviewComboData,
    refresh,
  } = useDashboardData();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: 1400,
        mx: "auto",
        bgcolor: bggrayColor,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <DashboardHeader displayName={displayName} />
        <Button
          startIcon={<FiRefreshCw size={18} />}
          onClick={() => refresh()}
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{
            borderColor: bordergrayColor,
            color: "#000",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: primaryColor,
              color: primaryColor,
              bgcolor: "rgba(239,71,0,0.06)",
            },
          }}
        >
          Refresh
        </Button>
      </Box>
      <KPICards counts={counts} />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr" }, gap: 2, mb: 2 }}>
        <OverviewComboChart data={overviewComboData} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr" }, gap: 2, mb: 2 }}>
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <SubmissionsTrendChart data={submissionsTrend} />
        <SubscribersTrendChart data={subscribersTrend} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <WebsiteContentChart data={websiteContent} />
        <WebsiteContentDonutChart data={websiteContent} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr" }, gap: 2, mb: 2 }}>
        <ProjectsStatusRadialChart data={projectsByStatus} />
      </Box>
    </Box>
  );
}
