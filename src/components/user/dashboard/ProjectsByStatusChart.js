"use client";

import { primaryColor, statusGreen, statusRed, statusYellow } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ACCENT = "#10B981";

function getStatusColor(name) {
  if (name === "Completed") return statusGreen;
  if (name === "Ongoing") return statusYellow;
  return statusRed;
}

function CustomBar(props) {
  const { x, y, width, height, fill } = props;
  const radius = 6;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={radius} ry={radius} fill={fill} fillOpacity={0.9} />
      <rect x={x} y={y + height - radius} width={width} height={radius} fill={fill} fillOpacity={0.9} />
    </g>
  );
}

export default function ProjectsByStatusChart({ data }) {
  const chartData = data?.length ? data : [{ name: "—", value: 0 }];

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
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: `${ACCENT}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: ACCENT }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", lineHeight: 1.3 }}>Projects by status</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.45)", lineHeight: 1.3 }}>Completed, Ongoing, Upcoming</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, pt: 2, pb: 1, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 24, left: 64, bottom: 8 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(0,0,0,0.05)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 13, fill: "#334155", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, padding: "10px 14px" }}
              labelStyle={{ color: "#64748b", fontWeight: 700, marginBottom: 4, fontSize: 12 }}
              itemStyle={{ color: "#0f172a" }}
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              formatter={(value) => [value, "Projects"]}
            />
            <Bar dataKey="value" shape={<CustomBar />} maxBarSize={32}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={getStatusColor(entry.name) || primaryColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
