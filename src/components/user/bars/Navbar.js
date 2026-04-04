"use client";

import { getAuth, clearAuth } from "@/lib/auth-storage";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiLogOut, FiMenu } from "react-icons/fi";
import Swal from "sweetalert2";
import { menuItems, projectPagesChildren } from "./sidebarMenuConfig";
import { primaryColor } from "@/components/utils/Colors";

const DRAWER_WIDTH = 280;
const SIDEBAR_BG = "#1A1A1A";
const MENU_ITEM_ACTIVE_BG = "#FFFFFF";
const MENU_ITEM_ACTIVE_COLOR = "#15151D";
const USER_CARD_BG = "rgba(255, 255, 255, 0.08)";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectPagesOpen, setProjectPagesOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  useEffect(() => {
    if (projectPagesChildren.some((c) => pathname === c.href)) setProjectPagesOpen(true);
  }, [pathname]);

  const { user: authUser, email: authEmail } = getAuth();
  const displayName =
    authUser?.name?.trim() ||
    (authUser?.firstName && authUser?.lastName
      ? `${authUser.firstName} ${authUser.lastName}`.trim()
      : null) ||
    authUser?.email ||
    authEmail ||
    "User";
  const displayEmail = authUser?.email || authEmail || "";

  const closeDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Log Out?",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAuth();
        setDrawerOpen(false);
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully.",
          confirmButtonColor: primaryColor,
        }).then(() => {
          router.replace("/login");
        });
      }
    });
  };

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        minHeight: 56,
        px: { xs: 1.5, sm: 2, md: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        background: "#fff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Mobile menu button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, minWidth: 0 }}>
        <IconButton
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#000",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <FiMenu size={24} />
        </IconButton>
      </Box>

      {/* Mobile sidebar drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            maxWidth: "85vw",
            boxSizing: "border-box",
            background: SIDEBAR_BG,
            border: "none",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            py: 3,
            px: 2,
          }}
        >
          <Box
            component={Link}
            href="/user/dashboard"
            onClick={closeDrawer}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              mb: 4,
              px: 1.5,
            }}
          >
            <Image
              src="/logo.png"
              alt={process.env.NEXT_PUBLIC_COMPANY_NAME}
              width={36}
              height={36}
              style={{ objectFit: "contain", width: 36, height: 36, flexShrink: 0 }}
              priority
            />
            <Box
              component="span"
              sx={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.03em", color: "#fff", lineHeight: 1.2 }}
            >
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </Box>
          </Box>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
            {menuItems.map(({ label, href, Icon, hasSubmenu }) => {
              const isActive = !hasSubmenu && pathname === href;

              if (hasSubmenu && label === "Project pages") {
                return (
                  <Box key={label}>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setProjectPagesOpen((o) => !o)}
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
                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#fff" },
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
                          transform: projectPagesOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <FiChevronDown size={18} />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        overflow: "hidden",
                        maxHeight: projectPagesOpen ? 200 : 0,
                        opacity: projectPagesOpen ? 1 : 0,
                        transition: "max-height 0.3s ease, opacity 0.25s ease",
                      }}
                    >
                      <Box sx={{ pl: 4, pr: 1, py: 0.5, display: "flex", flexDirection: "column", gap: 0.25 }}>
                        {projectPagesChildren.map(({ label: childLabel, href: childHref }) => {
                          const isChildActive = pathname === childHref;
                          return (
                            <Box
                              key={childHref}
                              component={Link}
                              href={childHref}
                              onClick={closeDrawer}
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
                  onClick={closeDrawer}
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

          {/* User card */}
          <Box
            component="button"
            type="button"
            onClick={(e) => setUserMenuAnchor(e.currentTarget)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              py: 1.25,
              px: 1.5,
              mt: 2,
              borderRadius: "10px",
              backgroundColor: USER_CARD_BG,
              border: "none",
              cursor: "pointer",
              color: "#fff",
              fontFamily: "inherit",
              textAlign: "left",
              width: "100%",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: primaryColor,
                fontSize: 14,
                fontWeight: 700,
                borderRadius: "8px",
                flexShrink: 0,
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ fontWeight: 600, fontSize: 13, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                {displayName}
              </Box>
              <Box sx={{ fontSize: 11, color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
                {displayEmail}
              </Box>
            </Box>
            <Box
              component="span"
              sx={{
                display: "flex",
                color: "rgba(255,255,255,0.5)",
                flexShrink: 0,
                transform: userMenuAnchor ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <FiChevronDown size={16} />
            </Box>
          </Box>

          <Menu
            anchorEl={userMenuAnchor}
            open={!!userMenuAnchor}
            onClose={() => setUserMenuAnchor(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            slotProps={{ paper: { sx: { minWidth: 160, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" } } }}
          >
            <MenuItem
              onClick={() => { setUserMenuAnchor(null); handleLogout(); }}
              sx={{ gap: 1.5, py: 1.25, px: 2, color: "#dc2626", fontWeight: 600, fontSize: 14, "&:hover": { bgcolor: "rgba(220,38,38,0.06)" } }}
            >
              <FiLogOut size={17} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
