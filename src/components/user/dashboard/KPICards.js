"use client";

import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { FiFolder, FiLayers, FiUsers } from "react-icons/fi";

const CARDS_CONFIG = [
  { label: "Projects", key: "projects", icon: FiFolder, color: primaryColor },
  { label: "Categories", key: "categories", icon: FiLayers, color: "#0EA5E9" },
  { label: "Admins", key: "admins", icon: FiUsers, color: "#10B981" },
];

export default function KPICards({ counts }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 2,
        mb: 3,
      }}
    >
      {CARDS_CONFIG.map(({ label, key, icon: Icon, color }) => (
        <Card
          key={key}
          elevation={0}
          sx={{
            borderRadius: 2.5,
            border: `1px solid ${bordergrayColor}`,
            overflow: "hidden",
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": {
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(15,23,42,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    mb: 0.5,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {counts[key] ?? 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${color}14`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={24} color={color} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
