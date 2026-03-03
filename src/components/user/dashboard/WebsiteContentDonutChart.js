"use client";

import { bordergrayColor } from "@/components/utils/Colors";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function WebsiteContentDonutChart({ data }) {
  const hasData = data?.length && data.some((d) => d.value > 0);
  const chartData = hasData ? data : [{ name: "No data", value: 1, fill: bordergrayColor }];

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
          Website content (donut)
        </Typography>
        <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,0.5)" }}>
          Services, Testimonials, FAQs
        </Typography>
      </Box>
      <Box sx={{ p: 2, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={hasData ? 2 : 0}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => (percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : null)}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: `1px solid ${bordergrayColor}`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
