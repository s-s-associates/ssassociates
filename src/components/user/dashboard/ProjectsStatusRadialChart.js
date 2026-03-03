"use client";

import {
  bordergrayColor,
  primaryColor,
  statusGreen,
  statusRed,
  statusYellow,
} from "@/components/utils/Colors";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import {
  Cell,
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
          Projects by status (radial)
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>
          Completed, Ongoing, Upcoming
        </Typography>
      </Box>
      <Box sx={{ p: 2, height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background
              dataKey="value"
              cornerRadius={8}
              label={{ position: "insideStart", fill: "#fff", fontSize: 12, fontWeight: 600 }}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </RadialBar>
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${bordergrayColor}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
              formatter={(value, name, props) => [props.payload?.count ?? value, "Count"]}
            />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 12 }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
