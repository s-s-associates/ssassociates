"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
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
          background: "#fff",
          borderBottom: "1px solid rgba(21, 21, 29, 0.08)",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.25s ease",
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
                fontFamily: "var(--font-inter), Inter, sans-serif",
                fontWeight: 600,
                fontSize: 24,
                lineHeight: "100%",
                letterSpacing: 0,
                color: grayColor,
                width: { xs: "auto", md: 371.5 },
                height: 29,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                SsAssociates
              </Link>
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
              const isActive = pathname === link.href;
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
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 16,
                      lineHeight: "24px",
                      letterSpacing: "0%",
                      color: isActive ? primaryColor : grayColor,
                      textDecoration: "none",
                      minWidth: 99,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: primaryColor,
                      }}
                    />
                  )}
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
              gap: 2,
            }}
          >
            <Box component={motion.div} variants={item}>
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: grayColor,
                  textDecoration: "none",
                  padding: "6px 12px",
                }}
              >
                Log In
              </Link>
            </Box>
            <Box component={motion.div} variants={item}>
              <Link
                href="/contact"
                style={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#fff",
                  background: primaryColor,
                  textDecoration: "none",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Contact
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
                color: grayColor,
                borderRadius: "8px",
                transition: "color 0.2s ease, transform 0.2s ease",
                "&:hover": {
                  color: primaryColor,
                  backgroundColor: "rgba(138, 56, 245, 0.08)",
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
                    color: grayColor,
                    borderRadius: "8px",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      color: primaryColor,
                      backgroundColor: "rgba(138, 56, 245, 0.08)",
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
                  const isActive = pathname === link.href;
                  return (
                    <Box component={motion.div} key={link.label} variants={item}>
                      <Link
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        style={{
                          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: "24px",
                          color: isActive ? primaryColor : grayColor,
                          textDecoration: "none",
                          display: "block",
                          padding: "12px 16px",
                          borderLeft: isActive ? `3px solid ${primaryColor}` : "3px solid transparent",
                          marginLeft: 12,
                        }}
                      >
                        {link.label}
                      </Link>
                    </Box>
                  );
                })}
                <Box component={motion.div} variants={item} sx={{ mt: 2 }}>
                  <Link
                    href="/login"
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: 16,
                      color: grayColor,
                      textDecoration: "none",
                      display: "block",
                      padding: "12px 16px",
                    }}
                  >
                    Log In
                  </Link>
                </Box>
                <Box component={motion.div} variants={item}>
                  <Link
                    href="/contact"
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontSize: 16,
                      color: "#fff",
                      fontWeight: 700,
                      background: primaryColor,
                      textDecoration: "none",
                      display: "block",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      textAlign: "center",
                      margin: "0 16px",
                    }}
                  >
                    Contact
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
