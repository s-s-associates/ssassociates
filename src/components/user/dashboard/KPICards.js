"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  FiFolder,
  FiGlobe,
  FiHelpCircle,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { MdPeopleOutline } from "react-icons/md";

const CARDS_CONFIG = [
  { label: "Projects",            key: "projects",           icon: FiFolder,         color: primaryColor },
  { label: "Categories",          key: "categories",         icon: FiLayers,         color: "#0EA5E9" },
  { label: "Admins",              key: "admins",             icon: FiUsers,          color: "#10B981" },
  { label: "Clients",             key: "clients",            icon: MdPeopleOutline,  color: "#F59E0B" },
  { label: "Contact submissions", key: "contactSubmissions", icon: FiMail,           color: "#8B5CF6" },
  { label: "Subscribers",         key: "subscribers",        icon: FiUserPlus,       color: "#EC4899" },
  { label: "Services",            key: "services",           icon: FiGlobe,          color: "#06B6D4" },
  { label: "Testimonials",        key: "testimonials",       icon: FiMessageCircle,  color: "#14B8A6" },
  { label: "FAQs",                key: "faqs",               icon: FiHelpCircle,     color: "#6366F1" },
];

export default function KPICards({ counts }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: 1.5,
        mb: 3,
      }}
    >
      {CARDS_CONFIG.map(({ label, key, icon: Icon, color }) => (
        <Box
          key={key}
          sx={{
            borderRadius: 2.5,
            bgcolor: "#fff",
            border: "1px solid rgba(0,0,0,0.06)",
            borderLeft: `4px solid ${color}`,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background: `linear-gradient(135deg, ${color}0d 0%, #fff 55%)`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "default",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 28px ${color}22, 0 2px 8px rgba(0,0,0,0.06)`,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(15,23,42,0.45)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 0.75,
              }}
            >
              {label}
            </Typography>
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 800,
                color: "#0f172a",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {counts[key] ?? 0}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              bgcolor: `${color}15`,
              border: `1px solid ${color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={24} color={color} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
