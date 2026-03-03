"use client";

import { bordergrayColor } from "@/components/utils/Colors";
import { Box, Card, Typography } from "@mui/material";
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

const FILL_COLOR = "#EC4899";

export default function SubscribersTrendChart({ data }) {
  const chartData = data?.length ? data : [{ month: "—", value: 0 }];

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
          Subscribers trend
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>
          By month (Jan–Jun)
        </Typography>
      </Box>
      <Box sx={{ p: 2, height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="subscribersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={FILL_COLOR} stopOpacity={0.4} />
                <stop offset="100%" stopColor={FILL_COLOR} stopOpacity={0} />
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
              formatter={(value) => [value, "Subscribers"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={FILL_COLOR}
              strokeWidth={2.5}
              fill="url(#subscribersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
