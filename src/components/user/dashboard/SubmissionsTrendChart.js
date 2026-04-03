"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLOR = "#8B5CF6";

export default function SubmissionsTrendChart({ data }) {
  const chartData = data?.length ? data : [{ month: "—", value: 0 }];

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
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: `${COLOR}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLOR }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", lineHeight: 1.3 }}>Contact submissions trend</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.45)", lineHeight: 1.3 }}>By month (Jan–Jun)</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, pt: 2, pb: 1, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="submissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLOR} stopOpacity={0.22} />
                <stop offset="85%" stopColor={COLOR} stopOpacity={0} />
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
              formatter={(value) => [value, "Submissions"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={COLOR}
              strokeWidth={2.5}
              fill="url(#submissionsGradient)"
              dot={false}
              activeDot={{ r: 5, fill: COLOR, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
