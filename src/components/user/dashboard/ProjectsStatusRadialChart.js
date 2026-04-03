"use client";

import { primaryColor, statusGreen, statusRed, statusYellow } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Cell, Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

const ACCENT = "#6366F1";

function getStatusColor(name) {
  if (name === "Completed") return statusGreen;
  if (name === "Ongoing") return statusYellow;
  return statusRed;
}

export default function ProjectsStatusRadialChart({ data }) {
  const total = data?.reduce((acc, d) => acc + (d.value || 0), 0) || 1;
  const chartData = (data?.length ? data : [{ name: "—", value: 0 }]).map((d) => ({
    name: d.name,
    value: total ? Math.round(((d.value || 0) / total) * 100) : 0,
    count: d.value || 0,
    fill: getStatusColor(d.name) || primaryColor,
  }));

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
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", lineHeight: 1.3 }}>Status radial</Typography>
          <Typography sx={{ fontSize: 12, color: "rgba(15,23,42,0.45)", lineHeight: 1.3 }}>Completed, Ongoing, Upcoming — % of total</Typography>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, pt: 2, pb: 1, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="88%"
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background={{ fill: "rgba(0,0,0,0.04)" }}
              dataKey="value"
              cornerRadius={8}
              label={{ position: "insideStart", fill: "#fff", fontSize: 12, fontWeight: 700 }}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </RadialBar>
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: 13, padding: "10px 14px" }}
              labelStyle={{ color: "#64748b", fontWeight: 700, marginBottom: 4, fontSize: 12 }}
              itemStyle={{ color: "#0f172a" }}
              formatter={(value, name, props) => [props.payload?.count ?? value, "Count"]}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 10, fontSize: 12, color: "#64748b" }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
