"use client";

import { getAuth, clearAuth } from "@/lib/auth-storage";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiFileText,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiUploadCloud,
} from "react-icons/fi";
import Swal from "sweetalert2";

const DRAWER_WIDTH = 280;
const SIDEBAR_BG = "#1A1A1A";
const MENU_ITEM_ACTIVE_BG = "#FFFFFF";
const MENU_ITEM_ACTIVE_COLOR = "#15151D";
const LOGOUT_BG = "rgba(255, 255, 255, 0.08)";

const menuItems = [
  { label: "Dashboard", href: "/user/dashboard", Icon: FiGrid },
  { label: "Upload Data", href: "/user/upload-data", Icon: FiUploadCloud },
  { label: "Uploads", href: "/user/uploads", Icon: FiFileText },
  { label: "Category", href: "/user/category", Icon: FiFolder },
  { label: "Projects", href: "/user/projects", Icon: FiFolder },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [me, setMe] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user: authUser, email: authEmail, token } = getAuth();
  const displayName =
    authUser?.name?.trim() ||
    (authUser?.firstName && authUser?.lastName
      ? `${authUser.firstName} ${authUser.lastName}`.trim()
      : null) ||
    authUser?.email ||
    authEmail ||
    "User";
  const displayEmail = authUser?.email || authEmail || "";

  const fetchMe = useCallback(() => {
    if (!token) return;
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => data.success && setMe(data))
      .catch(() => {});
  }, [token]);

  const openMenu = (e) => {
    setMenuAnchor(e.currentTarget);
    fetchMe();
  };
  const closeMenu = () => setMenuAnchor(null);

  const closeDrawer = () => setDrawerOpen(false);

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
        setDrawerOpen(false);
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
      {/* Left: Mobile menu */}
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

      {/* Right: Notifications + Profile */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, flexShrink: 0 }}>
        <IconButton
          size="medium"
          aria-label="Notifications"
          sx={{
            color: "#000",
            position: "relative",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <FiBell size={22} />
          <Box
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              minWidth: 18,
              height: 18,
              borderRadius: "50%",
              bgcolor: "#dc2626",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 0.5,
            }}
          >
            2
          </Box>
        </IconButton>

        <Box
          onClick={openMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && openMenu(e)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pl: { xs: 0.5, sm: 1 },
            cursor: "pointer",
            borderRadius: 2,
            py: 0.75,
            px: 1,
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <Avatar
            src="/images/avatar-placeholder.png"
            alt={displayName}
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              borderRadius: "10px",
              bgcolor: "#e0e0e0",
              fontSize: 16,
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0, maxWidth: 180, display: { xs: "none", sm: "block" } }}>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: 15,
                color: "#000",
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </Box>
            <Box
              sx={{
                fontSize: 13,
                color: "rgba(21, 21, 29, 0.65)",
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayEmail}
            </Box>
          </Box>
          <FiChevronDown size={20} sx={{ color: "#000", flexShrink: 0, display: { xs: "none", sm: "block" } }} />
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            minWidth: 280,
            mt: 1.5,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
        slotProps={{ list: { dense: true, disablePadding: false } }}
      >
        <MenuItem disabled sx={{ py: 1.25, cursor: "default", color: "#000" }}>
          <ListItemText
            primary={displayName}
            secondary={displayEmail}
            primaryTypographyProps={{ fontWeight: 700, fontSize: 15, color: "#000" }}
            secondaryTypographyProps={{ fontSize: 13, color: "#000" }}
          />
        </MenuItem>
      </Menu>

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
            SsAssociates
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
            {menuItems.map(({ label, href, Icon }) => {
              const isActive = pathname === href;
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
      </Drawer>

    </Box>
  );
}

export default Navbar;
