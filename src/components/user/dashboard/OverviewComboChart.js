"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 12,
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    fontSize: 13,
    padding: "10px 14px",
  },
  labelStyle: { color: "#64748b", fontWeight: 700, marginBottom: 4, fontSize: 12 },
  itemStyle: { color: "#0f172a", padding: "2px 0" },
  cursor: { fill: "rgba(0,0,0,0.03)" },
};

function ChartCard({ title, subtitle, accentColor, children, height = 320 }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1.5,
            bgcolor: `${accentColor}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: accentColor }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.45)", lineHeight: 1.3 }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, pt: 2, pb: 1, height }}>{children}</Box>
    </Box>
  );
}

export default function OverviewComboChart({ data }) {
  const chartData = data?.length ? data : [{ month: "—", projects: 0, submissions: 0, subscribers: 0 }];

  return (
    <ChartCard
      title="Overview (combo)"
      subtitle="Projects, submissions & subscribers by month"
      accentColor={primaryColor}
      height={340}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="comboArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.22} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend
            wrapperStyle={{ paddingTop: 14, fontSize: 12, color: "#64748b" }}
            iconType="circle"
            iconSize={8}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="projects"
            name="Projects"
            fill="url(#comboArea)"
            stroke={primaryColor}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: primaryColor, stroke: "#fff", strokeWidth: 2 }}
          />
          <Bar
            dataKey="submissions"
            name="Submissions"
            fill="#8B5CF6"
            radius={[5, 5, 0, 0]}
            maxBarSize={22}
            fillOpacity={0.85}
          />
          <Bar
            dataKey="subscribers"
            name="Subscribers"
            fill="#EC4899"
            radius={[5, 5, 0, 0]}
            maxBarSize={22}
            fillOpacity={0.85}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
