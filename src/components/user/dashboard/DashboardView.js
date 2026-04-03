"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Box, Button, Divider, Typography } from "@mui/material";
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

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, mt: 1 }}>
      <Box
        sx={{
          width: 4,
          height: 16,
          borderRadius: 1,
          background: `linear-gradient(180deg, ${primaryColor}, #f97316)`,
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(15,23,42,0.45)",
        }}
      >
        {children}
      </Typography>
      <Divider sx={{ flex: 1, borderColor: bordergrayColor }} />
    </Box>
  );
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

  if (loading) return <DashboardSkeleton />;

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
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <DashboardHeader displayName={displayName} />
        <Button
          startIcon={<FiRefreshCw size={15} />}
          onClick={() => refresh()}
          disabled={loading}
          variant="outlined"
          size="small"
          sx={{
            borderColor: bordergrayColor,
            color: "#334155",
            textTransform: "none",
            fontWeight: 600,
            fontSize: 13,
            borderRadius: 2,
            px: 2,
            "&:hover": {
              borderColor: primaryColor,
              color: primaryColor,
              bgcolor: "rgba(251,134,30,0.05)",
            },
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* KPI Cards */}
      <KPICards counts={counts} />

      {/* Overview */}
      <SectionLabel>Analytics overview</SectionLabel>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "3fr 2fr" }, gap: 2, mb: 2 }}>
        <OverviewComboChart data={overviewComboData} />
        <ProjectsTrendChart data={trendData} />
      </Box>

      {/* Projects */}
      <SectionLabel>Project breakdown</SectionLabel>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 2 }}>
        <ProjectsByStatusChart data={projectsByStatus} />
        <ProjectsByCategoryChart data={projectsByCategory} />
      </Box>

      {/* Engagement */}
      <SectionLabel>Engagement trends</SectionLabel>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 2 }}>
        <SubmissionsTrendChart data={submissionsTrend} />
        <SubscribersTrendChart data={subscribersTrend} />
      </Box>

      {/* Content */}
      <SectionLabel>Website content</SectionLabel>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }, gap: 2, mb: 2 }}>
        <WebsiteContentChart data={websiteContent} />
        <WebsiteContentDonutChart data={websiteContent} />
        <ProjectsStatusRadialChart data={projectsByStatus} />
      </Box>
    </Box>
  );
}
