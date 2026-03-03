"use client";

import {
  primaryColor,
  secondaryColor,
  textGrayDark,
  textGrayLight,
  whiteColor,
  secondaryBg,
} from "@/components/utils/Colors";
import {
  btnRadius,
  boxShadow,
  boxShadowHover,
  transition,
} from "@/components/utils/GlobalVariables";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

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

function Navbar() {
  const pathname = usePathname();
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
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: whiteColor,
          borderBottom: `1px solid ${secondaryBg}`,
          boxShadow: scrolled ? boxShadowHover : boxShadow,
          transition,
        }}
      >
        <Box
          component="nav"
          sx={{
            // maxWidth: 1200,
            margin: "0 auto",
            px: { xs: 2, sm: 3 },
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 56,
          }}
        >
          {/* Logo - SsAssociates */}
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
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  overflow: "hidden",
                  bgcolor: secondaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: { xs: 0, md: 0.5 },
                }}
              >
                <Link href="/" style={{ display: "inline-flex" }}>
                  <Image
                    src="/ss-logo.png"
                    alt="S&S Associates"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </Link>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <Link href="/" style={{ textDecoration: "none" }}>
                  <Box
                    component="span"
                    sx={{
                      ...underlineFromLeft,
                      fontFamily:
                        "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 20,
                      color: primaryColor,
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: primaryColor,
                        ...underlineFromLeftHover,
                      },
                    }}
                  >
                    S&S Associates
                  </Box>
                </Link>
                <Box
                  component="span"
                  sx={{
                    fontFamily:
                      "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: 12,
                    color: textGrayDark,
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
                  <Link href={link.href} style={{ textDecoration: "none" }}>
                    <Box
                      component="span"
                      sx={{
                        ...underlineFromLeft,
                        fontFamily:
                          "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        color: isActive ? primaryColor : textGrayDark,
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
              gap: 3,
            }}
          >
            <Box component={motion.div} variants={item}>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: whiteColor,
                  background: primaryColor,
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

          {/* Mobile menu button */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            sx={{ display: { md: "none" } }}
          >
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              sx={{
                  color: textGrayDark,
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
                bgcolor: "rgba(0,0,0,0.4)",
                zIndex: 1200,
              }}
            />
            <Box
              component={motion.div}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              sx={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 280,
                // maxWidth: "vw",
                bgcolor: "#fff",
                zIndex: 1201,
                boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
                py: 3,
                px: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  sx={{
                    color: textGrayDark,
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
                    <Box component={motion.div} key={link.label} variants={item}>
                      <Link
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        <Box
                          component="span"
                          sx={{
                            ...underlineFromLeft,
                            display: "block",
                            fontFamily:
                              "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: "24px",
                            color: isActive ? primaryColor : textGrayDark,
                            px: 2,
                            py: 1.5,
                            ml: 1.5,
                            borderLeft: isActive
                              ? `3px solid ${primaryColor}`
                              : "3px solid transparent",
                            transition,
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
                <Box component={motion.div} variants={item} sx={{ mt: 2 }}>
                  <Link
                    href="/contact"
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
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
      <Box sx={{ height: 56 }} />
    </>
  );
}

export default Navbar;
