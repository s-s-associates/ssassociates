"use client";

import {
  FiBarChart2,
  FiChevronDown,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiRefreshCw,
  FiUploadCloud,
} from "react-icons/fi";
import { clearAuth } from "@/lib/auth-storage";
import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const SIDEBAR_BG = "#1A1A1A";
const MENU_ITEM_ACTIVE_BG = "#FFFFFF";
const MENU_ITEM_ACTIVE_COLOR = "#15151D";
const LOGOUT_BG = "rgba(255, 255, 255, 0.08)";

const menuItems = [
  { label: "Dashboard", href: "/user/dashboard", Icon: FiGrid },
  { label: "Analytics", href: "/user/analytics", Icon: FiBarChart2, hasSubmenu: true },
  { label: "Mappings", href: "/user/mappings", Icon: FiRefreshCw },
];

const analyticsChildren = [
  { label: "Analytics", href: "/user/analytics" },
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#8A38F5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully.",
          confirmButtonColor: "#8A38F5",
        }).then(() => {
          router.replace("/login");
        });
      }
    });
  };

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        maxWidth: 280,
        height: "100vh",
        background: SIDEBAR_BG,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <Box
        component={Link}
        href="/user/dashboard"
        sx={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.08em",
          color: "#fff",
          textDecoration: "none",
          mb: 4,
          px: 1.5,
        }}
      >
        COACHSCOUT
      </Box>

      {/* MENU label */}
      <Box
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: "rgba(255, 255, 255, 0.5)",
          mb: 2,
          px: 1.5,
        }}
      >
        MENU
      </Box>

      {/* Nav items */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
        {menuItems.map(({ label, href, Icon, hasSubmenu }) => {
          const isActive = !hasSubmenu && pathname === href;

          if (hasSubmenu && label === "Analytics") {
            return (
              <Box key={label}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => setAnalyticsOpen((o) => !o)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.25,
                    px: 1.5,
                    borderRadius: "8px",
                    border: "none",
                    background: "transparent",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      color: "#fff",
                    },
                  }}
                >
                  <Box component="span" sx={{ display: "flex", alignItems: "center", color: "inherit" }}>
                    <Icon size={20} />
                  </Box>
                  <Box component="span" sx={{ flex: 1 }}>{label}</Box>
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      color: "inherit",
                      transform: analyticsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <FiChevronDown size={18} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    maxHeight: analyticsOpen ? 200 : 0,
                    opacity: analyticsOpen ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.25s ease",
                  }}
                >
                  <Box
                    sx={{
                      pl: 4,
                      pr: 1,
                      py: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.25,
                    }}
                  >
                    {analyticsChildren.map(({ label: childLabel, href: childHref }) => {
                      const isChildActive = pathname === childHref;
                      return (
                        <Box
                          key={childHref}
                          component={Link}
                          href={childHref}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            py: 1,
                            px: 1.5,
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: isChildActive ? MENU_ITEM_ACTIVE_COLOR : "rgba(255, 255, 255, 0.85)",
                            backgroundColor: isChildActive ? MENU_ITEM_ACTIVE_BG : "transparent",
                            fontWeight: 500,
                            fontSize: 14,
                            "&:hover": {
                              backgroundColor: isChildActive ? MENU_ITEM_ACTIVE_BG : "rgba(255, 255, 255, 0.06)",
                              color: isChildActive ? MENU_ITEM_ACTIVE_COLOR : "#fff",
                            },
                          }}
                        >
                          {childLabel}
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            );
          }

          return (
            <Box
              key={label}
              component={Link}
              href={href}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                py: 1.25,
                px: 1.5,
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive ? MENU_ITEM_ACTIVE_COLOR : "#fff",
                backgroundColor: isActive ? MENU_ITEM_ACTIVE_BG : "transparent",
                fontWeight: 500,
                fontSize: 15,
                "&:hover": {
                  backgroundColor: isActive ? MENU_ITEM_ACTIVE_BG : "rgba(255, 255, 255, 0.06)",
                  color: isActive ? MENU_ITEM_ACTIVE_COLOR : "#fff",
                },
              }}
            >
              <Box component="span" sx={{ display: "flex", alignItems: "center", color: "inherit" }}>
                <Icon size={20} />
              </Box>
              <Box component="span" sx={{ flex: 1 }}>
                {label}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Log Out */}
      <Box
        component="button"
        type="button"
        onClick={handleLogout}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          py: 1.25,
          px: 1.5,
          borderRadius: "8px",
          backgroundColor: LOGOUT_BG,
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 500,
          fontSize: 15,
          mt: 2,
          width: "100%",
          textAlign: "left",
          fontFamily: "inherit",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            color: "#fff",
          },
        }}
      >
        <FiLogOut size={20} />
        Log Out
      </Box>
    </Box>
  );
}

export default Sidebar;
