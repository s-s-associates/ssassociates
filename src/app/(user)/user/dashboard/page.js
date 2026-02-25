"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineSportsEsports } from "react-icons/md";
import { TbFileText } from "react-icons/tb";

function getDisplayName(authUser, authEmail) {
  if (authUser?.firstName && authUser?.lastName) {
    return `${authUser.firstName} ${authUser.lastName}`.trim();
  }
  return authUser?.email || authEmail || "User";
}

const CARD_SHADOW = "0 1px 3px rgba(0,0,0,0.06)";
const ACTIVITY = [
  { text: "Uploaded Week 5 vs Tigers.csv", time: "2h" },
  { text: "Updated mappings for Varsity Team", time: "1d" },
  { text: "Viewed Formation Usage dashboard", time: "1d" },
];
const STATS_CONFIG = [
  { key: "teams", label: "Teams", image: "/images/teams.png" },
  { key: "games", label: "Games", image: "/images/games.png" },
  { key: "plays", label: "Plays", image: "/images/plays.png" },
];

export default function DashboardPage() {
  const { user: authUser, email: authEmail } = getAuth();
  const displayName = getDisplayName(authUser, authEmail);

  const stats = { teams: 0, games: 0, plays: 0 };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Welcome */}
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#000",
            m: 0,
            mb: 0.5,
          }}
        >
          Welcome back, {displayName}! 👋
        </Typography>
        <Typography sx={{ color: "rgba(21,21,29,0.6)", fontSize: 15 }}>
          Overview of your data and insights.
        </Typography>
      </Box>

      {/* Top row: Your Data card + Recent Activity */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 340px" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Your Data. Your Edge. */}
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            boxShadow: CARD_SHADOW,
          }}
        >
          {/* Blurred background image */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/images/data.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              transform: "scale(1.08)",
            }}
          />
          {/* Dark overlay for text readability */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          />
          {/* Content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 22, mb: 0.5 }}>
            Your Data. Your Edge.
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14, mb: 2 }}>
            Upload play data, explore insights, and manage teams from one powerful dashboard.
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/user/upload-data/new"
              variant="contained"
              startIcon={<FiUploadCloud size={18} />}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                py: 1,
                px: 2,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" },
              }}
            >
              Upload Game Data
            </Button>
          </Box>
          </Box>
        </Box>

        {/* Recent Activity */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: 2,
            p: 2.5,
            // boxShadow: CARD_SHADOW,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2 }}>
            Recent Activity
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {ACTIVITY.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: `1px solid ${bordergrayColor}`,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: 14, color: "#000" }}>{item.text}</Typography>
                <Typography sx={{ fontSize: 13, color: "rgba(21,21,29,0.5)" }}>{item.time}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Stats row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        {STATS_CONFIG.map(({ key, label, image }) => (
          <Box
            key={key}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              p: 2.5,
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", alignItems: "center", justifyContent: "center", top: 16, right: 16, bgcolor: bggrayColor, borderRadius: "100%", p: 1, display: "flex" }}>
              <Image src={image} alt={label} width={24} height={24} style={{ objectFit: "contain" }} />
            </Box>
            <Typography sx={{ fontSize: 32, fontWeight: 700, color: "#000" }}>{stats[key]}</Typography>
            <Typography sx={{ fontSize: 14, color: "rgba(21,21,29,0.6)" }}>{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
