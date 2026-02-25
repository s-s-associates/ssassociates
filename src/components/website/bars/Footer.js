"use client";

import { grayColor, primaryColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Features", href: "/features" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Terms & Conditions", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, sm: 5 },
        bgcolor: "#fff",
        borderTop: "1px solid rgba(21, 21, 29, 0.08)",
        py: 6,
        // px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        component={motion.div}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        sx={{
        //   maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Left: Brand + Copyright */}
        <Box component={motion.div} variants={item} sx={{ flexShrink: 0 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 600,
              fontSize: 24,
              lineHeight: "100%",
              letterSpacing: 0,
              color: grayColor,
              textDecoration: "none",
              display: "block",
              mb: 1.5,
              transition: "color 0.2s ease",
              "&:hover": { color: primaryColor },
            }}
          >
            CoachScout
          </Box>
        
        </Box>

        {/* Right: Three columns */}
        <Box
          component={motion.div}
          variants={container}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 3, sm: 6, md: 8 },
          }}
        >
          {columns.map((col) => (
            <Box component={motion.div} key={col.heading} variants={item}>
              <Box
                sx={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: "24px",
                  color: grayColor,
                  mb: 1.5,
                }}
              >
                {col.heading}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {col.links.map((link) => (
                  <Box
                    key={link.label}
                    component={motion.div}
                    variants={item}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: "24px",
                        letterSpacing: "0%",
                        color: grayColor,
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = grayColor;
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "24px",
              letterSpacing: "0%",
              color: grayColor,
            }}
          >
            © 2026 CoachScout. All rights reserved.
          </Box>
    </Box>
  );
}

export default Footer;
