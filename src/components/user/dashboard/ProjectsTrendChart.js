"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartCard({ title, subtitle, accentColor, children, height = 300 }) {
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
      <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: `${accentColor}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: accentColor }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", lineHeight: 1.3 }}>{title}</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.45)", lineHeight: 1.3 }}>{subtitle}</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, pt: 2, pb: 1, height }}>{children}</Box>
    </Box>
  );
}

export default function ProjectsTrendChart({ data }) {
  const chartData = data?.length ? data : [{ month: "—", value: 0 }];

  return (
    <ChartCard
      title="Projects trend"
      subtitle="Overview over last months"
      accentColor={primaryColor}
      height={340}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.28} />
              <stop offset="85%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(0,0,0,0.05)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }} axisLine={false} tickLine={false} dy={6} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, padding: "10px 14px" }}
            labelStyle={{ color: "#64748b", fontWeight: 700, marginBottom: 4, fontSize: 12 }}
            itemStyle={{ color: "#0f172a" }}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
            formatter={(value) => [value, "Projects"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={primaryColor}
            strokeWidth={2.5}
            fill="url(#projectsGradient)"
            dot={false}
            activeDot={{ r: 5, fill: primaryColor, stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
