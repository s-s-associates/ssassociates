"use client";

import {
  primaryColor,
  secondaryColor,
  textGrayLight,
  whiteColor,
} from "@/components/utils/Colors";
import LocationOn from "@mui/icons-material/LocationOn";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import AccessTime from "@mui/icons-material/AccessTime";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Residential Construction",
  "Commercial Construction",
  "Interior Design",
  "Renovation & Remodeling",
  "Project Management",
  "Consultation",
];

const socialLinks = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaWhatsapp, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
];

// Animated underline: line enters from left to right on hover
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
    transition: "transform 0.3s ease",
  },
};
const underlineFromLeftHover = {
  "&::after": {
    transform: "scaleX(1)",
  },
};

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: secondaryColor,
        color: textGrayLight,
        pt: 6,
        pb: 0,
      }}
    >
      {/* Main content - 4 columns */}
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          px: { xs: 2, sm: 3, md: 4 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          columnGap: { xs: 4, md: 4 },
          rowGap: { xs: 4, md: 3 },
          pb: 4,
        }}
      >
        {/* Column 1: Company info + logo + social */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                flexShrink: 0,
                borderRadius: 1.5,
                overflow: "hidden",
                bgcolor: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/ss-logo.png"
                alt="S&S Associates"
                width={70}
                height={70}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box
                component={Link}
                href="/"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  color: whiteColor,
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": {
                    color: primaryColor,
                    ...underlineFromLeftHover,
                  },
                }}
              >
                S&S Associates
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                }}
              >
                Building Excellence
              </Box>
          </Box>
          <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 1.6,
              color: textGrayLight,
              maxWidth: 320,
            }}
          >
            We are a leading construction company committed to delivering
            exceptional quality and innovative solutions for all your
            construction needs.
          </Box>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {socialLinks.map(({ Icon, href }, idx) => (
              <Box
                key={idx}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                  border: `1px solid ${textGrayLight}`,
                  color: whiteColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  textDecoration: "none",
                  transition: "background-color 0.2s, border-color 0.2s",
                  "&:hover": {
                    bgcolor: primaryColor,
                    borderColor: primaryColor,
                  },
                }}
              >
                <Icon />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Column 2: Quick Links */}
        <Box>
          <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: whiteColor,
              mb: 2,
            }}
          >
            Quick Links
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            {quickLinks.map((link) => (
              <Box
                key={link.label}
                sx={{
                  "&:hover span": {
                    color: primaryColor,
                    ...underlineFromLeftHover,
                  },
                }}
              >
                <Link
                  href={link.href}
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <KeyboardArrowRight sx={{ color: primaryColor, fontSize: 20 }} />
                  <Box
                    component="span"
                    sx={{
                      ...underlineFromLeft,
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: textGrayLight,
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Column 3: Our Services */}
        <Box>
          <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: whiteColor,
              mb: 2,
            }}
          >
            Our Services
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            {services.map((name) => (
              <Box
                key={name}
                sx={{
                  "&:hover span": {
                    color: primaryColor,
                    ...underlineFromLeftHover,
                  },
                }}
              >
                <Link
                  href="/services"
                  style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                >
                  <KeyboardArrowRight sx={{ color: primaryColor, fontSize: 20 }} />
                  <Box
                    component="span"
                    sx={{
                      ...underlineFromLeft,
                      fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                      color: textGrayLight,
                      transition: "color 0.2s",
                    }}
                  >
                    {name}
                  </Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Column 4: Contact Us */}
        <Box>
          <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              color: whiteColor,
              mb: 2,
            }}
          >
            Contact Us
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                cursor: "default",
                "&:hover .contact-text": {
                  color: primaryColor,
                  ...underlineFromLeftHover,
                },
              }}
            >
              <LocationOn sx={{ color: primaryColor, fontSize: 20, mt: 0.25, flexShrink: 0 }} />
              <Box
                className="contact-text"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  lineHeight: 1.5,
                  transition: "color 0.2s",
                }}
              >
                123 Construction Ave, Building City, BC 12345
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "default",
                "&:hover .contact-text": {
                  color: primaryColor,
                  ...underlineFromLeftHover,
                },
              }}
            >
              <Phone sx={{ color: primaryColor, fontSize: 20, flexShrink: 0 }} />
              <Box
                className="contact-text"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                +1 (234) 567-890
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "default",
                "&:hover .contact-text": {
                  color: primaryColor,
                  ...underlineFromLeftHover,
                },
              }}
            >
              <Phone sx={{ color: primaryColor, fontSize: 20, flexShrink: 0 }} />
              <Box
                className="contact-text"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                +1 (234) 567-891
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "default",
                "&:hover .contact-text": {
                  color: primaryColor,
                  ...underlineFromLeftHover,
                },
              }}
            >
              <Email sx={{ color: primaryColor, fontSize: 20, flexShrink: 0 }} />
              <Box
                className="contact-text"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                info@ssassociates.com
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "default",
                "&:hover .contact-text": {
                  color: primaryColor,
                  ...underlineFromLeftHover,
                },
              }}
            >
              <AccessTime sx={{ color: primaryColor, fontSize: 20, flexShrink: 0 }} />
              <Box
                className="contact-text"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                Mon - Sat: 8:00 AM - 6:00 PM
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box
        sx={{
          borderTop: `1px solid rgba(255, 255, 255, 0.08)`,
          py: 2,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: textGrayLight,
            }}
          >
            © 2026 S&S Associates. All rights reserved. Built with excellence.
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <Link
              href="/privacy-policy"
              style={{ textDecoration: "none" }}
            >
              <Box
                component="span"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                  "&:hover": {
                    color: primaryColor,
                    ...underlineFromLeftHover,
                  },
                }}
              >
                Privacy Policy
              </Box>
            </Link>
            <Link
              href="/terms-&-conditions"
              style={{ textDecoration: "none" }}
            >
              <Box
                component="span"
                sx={{
                  ...underlineFromLeft,
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                  "&:hover": {
                    color: primaryColor,
                    ...underlineFromLeftHover,
                  },
                }}
              >
                Terms of Service
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
