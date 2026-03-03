"use client";

import { bordergrayColor } from "@/components/utils/Colors";
import { Box, Card, Typography } from "@mui/material";
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

export default function WebsiteContentChart({ data }) {
  const chartData = data?.length ? data : [{ name: "—", value: 0, fill: bordergrayColor }];

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
          Website content
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>
          Services, Testimonials, FAQs
        </Typography>
      </Box>
      <Box sx={{ p: 2, height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,0,0,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
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
              formatter={(value) => [value, "Count"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill || "#64748b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
