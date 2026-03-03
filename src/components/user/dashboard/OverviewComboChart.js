"use client";

import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Card, Typography } from "@mui/material";
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

export default function OverviewComboChart({ data }) {
  const chartData = data?.length ? data : [{ month: "—", projects: 0, submissions: 0, subscribers: 0 }];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2.5,
        border: `1px solid ${bordergrayColor}`,
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${bordergrayColor}` }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>
          Overview (combo)
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>
          Projects, submissions & subscribers by month
        </Typography>
      </Box>
      <Box sx={{ p: 2, height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="comboArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primaryColor} stopOpacity={0.35} />
                <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${bordergrayColor}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="projects"
              name="Projects"
              fill="url(#comboArea)"
              stroke={primaryColor}
              strokeWidth={2}
            />
            <Bar dataKey="submissions" name="Submissions" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Bar dataKey="subscribers" name="Subscribers" fill="#EC4899" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
