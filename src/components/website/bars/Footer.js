"use client";

import {
  primaryColor,
  secondaryDark,
  textGrayLight,
  whiteColor,
} from "@/components/utils/Colors";
import LocationOn from "@mui/icons-material/LocationOn";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import AccessTime from "@mui/icons-material/AccessTime";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SubscriberForm from "@/components/website/subscriber/SubscriberForm";
import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@ssassociates.com";
const COMPANY_PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE || "+923008414733";
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Ayub, 67 Trade Centre Block, Johar Town, Lahore, Pakistan";
const COMPANY_HOURS = process.env.NEXT_PUBLIC_WORKING_HOURS || "Mon - Sat: 9:00 AM - 6:00 PM";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];


const socialLinks = [
  { Icon: FaWhatsapp, href: process.env.NEXT_PUBLIC_COMPANY_WHATSAPP },
  { Icon: FaFacebookF, href: process.env.NEXT_PUBLIC_COMPANY_FACEBOOK },
  { Icon: FaInstagram, href: process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM },
  { Icon: FaLinkedinIn, href: process.env.NEXT_PUBLIC_COMPANY_LINKEDIN },
  { Icon: MdEmail, href: `mailto:${COMPANY_EMAIL}` },
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
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setServices(data.services);
      })
      .catch(() => {});
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: secondaryDark,
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
                borderRadius: 100,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/logo.png"
                alt={COMPANY_NAME}
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
                  fontFamily: "var(--font-app)",
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
                {COMPANY_NAME}
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "var(--font-app)",
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
              fontFamily: "var(--font-app)",
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
              fontFamily: "var(--font-app)",
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
                      fontFamily: "var(--font-app)",
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
              fontFamily: "var(--font-app)",
              fontWeight: 600,
              fontSize: 18,
              color: whiteColor,
              mb: 2,
            }}
          >
            Our Services
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            {services.length === 0
              ? // skeleton placeholders while loading
                Array.from({ length: 4 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      height: 14,
                      borderRadius: 1,
                      bgcolor: "rgba(255,255,255,0.08)",
                      width: `${60 + (i % 3) * 15}%`,
                    }}
                  />
                ))
              : services.map((service) => (
                  <Box
                    key={service._id}
                    sx={{
                      "&:hover span": {
                        color: primaryColor,
                        ...underlineFromLeftHover,
                      },
                    }}
                  >
                    <Link
                      href={`/services/${service._id}`}
                      style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <KeyboardArrowRight sx={{ color: primaryColor, fontSize: 20 }} />
                      <Box
                        component="span"
                        sx={{
                          ...underlineFromLeft,
                          fontFamily: "var(--font-app)",
                          fontWeight: 400,
                          fontSize: 14,
                          color: textGrayLight,
                          transition: "color 0.2s",
                        }}
                      >
                        {service.title}
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
              fontFamily: "var(--font-app)",
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
                  fontFamily: "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  lineHeight: 1.5,
                  transition: "color 0.2s",
                }}
              >
                {COMPANY_ADDRESS}
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
                  fontFamily: "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                {COMPANY_PHONE}
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
                  fontFamily: "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                {COMPANY_EMAIL}
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
                  fontFamily: "var(--font-app)",
                  fontWeight: 400,
                  fontSize: 14,
                  color: textGrayLight,
                  transition: "color 0.2s",
                }}
              >
                {COMPANY_HOURS}
              </Box>
            </Box>
          </Box>

          <SubscriberForm />
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
              fontFamily: "var(--font-app)",
              fontWeight: 400,
              fontSize: 14,
              color: textGrayLight,
            }}
          >
            © 2026 {COMPANY_NAME}. All rights reserved. Built with excellence.
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
                  fontFamily: "var(--font-app)",
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
                  fontFamily: "var(--font-app)",
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
