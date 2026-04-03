"use client";

import {
  primaryColor,
  secondaryColor,
  textGrayLight,
  whiteColor,
  secondaryBg,
  secondaryDark,
} from "@/components/utils/Colors";
import {
  btnRadius,
  boxShadow,
  boxShadowHover,
  transition,
  sectionRadius,
} from "@/components/utils/GlobalVariables";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useWebsiteNavigationLoading } from "./WebsiteNavigationLoaderProvider";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0 },
};

// Animated underline for nav links: line enters from left to right
const underlineFromLeft = {
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: 2,
    background: primaryColor,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.25s ease",
  },
};
const underlineFromLeftHover = {
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: 2,
    background: primaryColor,
    transform: "scaleX(1)",
    transformOrigin: "left",
    transition: "transform 0.25s ease",
  },
};

function PakistanFlagIcon({ size = 20 }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 48 36"
      aria-hidden
      sx={{
        width: size,
        height: Math.round((size * 3) / 4),
        display: "inline-block",
        borderRadius: "2px",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
      }}
    >
      <rect width="48" height="36" fill="#01411C" />
      <rect width="12" height="36" fill="#fff" />
      <circle cx="30" cy="18" r="8.5" fill="#fff" />
      <circle cx="32.2" cy="17.2" r="7.8" fill="#01411C" />
      <path
        d="M36.1 11.2l1.4 3.1 3.3.3-2.5 2.2.8 3.2-3-1.8-2.9 1.8.8-3.2-2.5-2.2 3.2-.3 1.4-3.1z"
        fill="#fff"
      />
    </Box>
  );
}

function Navbar() {
  const pathname = usePathname();
  const { startNavigation } = useWebsiteNavigationLoading();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <Box
        component="header"
        mx={1}
        sx={{
          position: "fixed",
          top: scrolled ? 6 : 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: scrolled
            ? "rgba(8, 12, 20, 0.67)" // secondaryDark with 0.3 alpha
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderRadius: 3,
          transition,
        }}
      >
        <Box
          component="nav"
          sx={{
            // maxWidth: 1200,
            margin: "0 auto",
            px: { xs: 2, sm: 3 },
            py: 1.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 56,
          }}
        >
          <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component={motion.div}
              variants={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 1,
                  overflow: "hidden",
                  // bgcolor: secondaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // mr: { xs: 0, md: 0.5 },
                }}
              >
                <Link href="/" style={{ display: "inline-flex" }}>
                  <Image
                    src="/logo.png"
                    alt={COMPANY_NAME}
                    width={50}
                    height={50}
                    priority
                    fetchPriority="high"
                    style={{ objectFit: "contain" }}
                  />
                </Link>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
              >
                <Link
                  href="/"
                  onClick={() => startNavigation("/")}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    fontSize={[18, 20]}
                    fontWeight={700}
                    component="span"
                    sx={{
                      ...underlineFromLeft,
                      color: primaryColor,
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: primaryColor,
                        ...underlineFromLeftHover,
                      },
                    }}
                  >
                    {COMPANY_NAME}
                  </Box>
                </Link>
                <Box
                  component="span"
                  fontSize={[10, 12]}
                  sx={{
                    fontWeight: 400,
                    color: whiteColor,
                    mt: 0.25,
                  }}
                >
                  Building Excellence
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Center nav - desktop */}
          <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Box
                  component={motion.div}
                  key={link.label}
                  variants={item}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => startNavigation(link.href)}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      component="span"
                      sx={{
                        ...underlineFromLeft,
                        fontFamily: "var(--font-app)",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        color: isActive ? primaryColor : whiteColor,
                        px: 0.5,
                        transition: "color 0.2s ease",
                        ...(isActive ? underlineFromLeftHover : {}),
                        "&:hover": {
                          color: primaryColor,
                          ...underlineFromLeftHover,
                        },
                      }}
                    >
                      {link.label}
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>

          {/* Right: Log In + Sign Up - desktop */}
          <Box
            component={motion.div}
            variants={container}
            initial="hidden"
            animate="show"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box component={motion.div} variants={item}>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.7,
                  px: 1.15,
                  py: 0.55,
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: whiteColor,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                }}
              >
                <PakistanFlagIcon size={18} />
                Pakistan
              </Box>
            </Box>
            <Box component={motion.div} variants={item}>
              <Link
                href="/contact"
                onClick={() => startNavigation("/contact")}
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: whiteColor,
                  border: `1px solid ${whiteColor}`,
                  background: "transparent",
                  textDecoration: "none",
                  padding: "10px 24px",
                  borderRadius: btnRadius,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow,
                  transition,
                }}
              >
                Get a Quote
              </Link>
            </Box>
          </Box>

          {/* Mobile right side: Pakistan badge + menu button */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            sx={{ display: { md: "none" }, alignItems: "center", gap: 1 }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                px: 0.95,
                py: 0.45,
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: whiteColor,
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              <PakistanFlagIcon size={12} />
              Pakistan
            </Box>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              sx={{
                color: primaryColor,
                borderRadius: "8px",
                transition: "color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  color: primaryColor,
                  backgroundColor: secondaryBg,
                  transform: "scale(1.06)",
                },
                "&:hover .MuiTouchRipple-root": { borderRadius: "8px" },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(6, 10, 18, 0.42)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                zIndex: 1200,
              }}
            />
            <Box
              component={motion.div}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.28,
                ease: [0.32, 0.72, 0, 1],
              }}
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 280,
                // maxWidth: "vw",
                bgcolor: "rgba(14, 20, 33, 0.74)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderLeft: "1px solid rgba(255,255,255,0.14)",
                zIndex: 1201,
                boxShadow: "-12px 0 32px rgba(0,0,0,0.42)",
                py: 3,
                px: 2,
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: -80,
                  right: -90,
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at center, rgba(251,134,30,0.32), transparent 70%)",
                  filter: "blur(4px)",
                  pointerEvents: "none",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  sx={{
                    color: whiteColor,
                    borderRadius: "8px",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      color: primaryColor,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "scale(1.06)",
                    },
                    "&:hover .MuiTouchRipple-root": { borderRadius: "8px" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box
                component={motion.div}
                variants={container}
                initial="hidden"
                animate="show"
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Box
                      component={motion.div}
                      key={link.label}
                      variants={item}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          startNavigation(link.href);
                          setDrawerOpen(false);
                        }}
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        <Box
                          component="span"
                          sx={{
                            ...underlineFromLeft,
                            display: "block",
                            fontFamily: "var(--font-app)",
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: "24px",
                            color: isActive
                              ? primaryColor
                              : "rgba(255,255,255,0.9)",
                            px: 2,
                            py: 1.5,
                            ml: 1,
                            mr: 1,
                            borderLeft: "none",
                            borderRadius: 2,
                            border: isActive
                              ? `1px solid rgba(251,134,30,0.45)`
                              : "1px solid rgba(255,255,255,0.08)",
                            backgroundColor: isActive
                              ? "rgba(251,134,30,0.12)"
                              : "rgba(255,255,255,0.03)",
                            backdropFilter: "blur(2px)",
                            transition,
                            ...(isActive ? underlineFromLeftHover : {}),
                            "&:hover": {
                              color: primaryColor,
                              backgroundColor: "rgba(251,134,30,0.12)",
                              borderColor: "rgba(251,134,30,0.38)",
                              ...underlineFromLeftHover,
                            },
                          }}
                        >
                          {link.label}
                        </Box>
                      </Link>
                    </Box>
                  );
                })}
                <Box
                  component={motion.div}
                  variants={item}
                  sx={{ mt: 1.25, mx: 2 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.8,
                      px: 1.2,
                      py: 0.55,
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.22)",
                      backgroundColor: "rgba(255, 255, 255, 0.09)",
                      color: whiteColor,
                      fontWeight: 600,
                      fontSize: 12,
                      lineHeight: 1,
                    }}
                  >
                    <PakistanFlagIcon size={14} />
                    Pakistan
                  </Box>
                </Box>
                <Box component={motion.div} variants={item} sx={{ mt: 2 }}>
                  <Link
                    href="/contact"
                    onClick={() => {
                      startNavigation("/contact");
                      setDrawerOpen(false);
                    }}
                    style={{
                      fontFamily: "var(--font-app)",
                      fontSize: 16,
                      color: whiteColor,
                      fontWeight: 700,
                      background: primaryColor,
                      textDecoration: "none",
                      display: "block",
                      padding: "12px 20px",
                      borderRadius: btnRadius,
                      textAlign: "center",
                      margin: "0 16px",
                      boxShadow,
                      transition,
                    }}
                  >
                    Get a Quote
                  </Link>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so content is not under fixed navbar */}
      <Box sx={{ height: 0 }} />
    </>
  );
}

export default Navbar;
