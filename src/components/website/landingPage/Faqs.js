"use client";

import {
  primaryColor,
  textGrayDark,
  textGrayLight,
  secondaryBg,
  whiteColor,
  primaryLight,
  secondaryDark,
  primaryBg,
} from "@/components/utils/Colors";
import { Box, CircularProgress, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EastIcon from "@mui/icons-material/East";
import React, { useEffect, useState } from "react";

function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [openIndex, setOpenIndex] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function loadFaqs() {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        if (!res.ok || !data.success || !Array.isArray(data.faqs)) {
          throw new Error(data.message || "Could not load FAQs");
        }
        const sorted = [...data.faqs].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );
        if (!cancelled) {
          setFaqs(sorted);
          setOpenIndex(sorted.length > 1 ? 1 : sorted.length > 0 ? 0 : -1);
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(err.message || "Something went wrong");
          setFaqs([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadFaqs();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 9 },
        px: { xs: 2, sm: 3, md: 5, lg: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.35fr" },
          gap: { xs: 4, md: 5, lg: 7 },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            maxWidth: 470,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.7,
              px: 1.3,
              py: 0.4,
              borderRadius: "999px",
              border: `1px solid ${textGrayLight}`,
              color: primaryColor,
              fontSize: 12,
              fontWeight: 500,
              mb: 2,
              bgcolor: primaryBg,
            }}
          >
            FAQs
          </Box>
          <Typography
            component="h2"
            sx={{
              m: 0,
              fontFamily: "var(--font-app)",
              fontWeight: 700,
              fontSize: { xs: 34, sm: 44, md: 50 },
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Got <Box component="span" sx={{ color: primaryColor }}>Questions?</Box>
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              mb: 1,
              color: textGrayDark,
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 420,
            }}
          >
            We&apos;ve compiled answers to the most common questions about our construction services. Can&apos;t find what
            you&apos;re looking for? Reach out to our team directly.
          </Typography>

          <Box
            sx={{
              borderRadius: 2.6,
              backgroundColor: secondaryDark,
              color: "#e7ecff",
              px: { xs: 2.2, sm: 2.8 },
              py: { xs: 2.2, sm: 2.5 },
              boxShadow: "0 14px 28px rgba(7,16,39,0.24)",
            }}
          >
            <Typography sx={{ color: whiteColor, fontWeight: 700, fontSize: 24, mb: 1 }}>
              Still have questions?
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: 1.65, color: "rgba(231,236,255,0.82)", mb: 2 }}>
              Our team is ready to help you with any specific project inquiries.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.2 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: 1.8,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LocalPhoneOutlinedIcon sx={{ color: primaryColor, fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: "rgba(231,236,255,0.95)" }}>
                +92 300 123 4567
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: 1.8,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailOutlineIcon sx={{ color: primaryColor, fontSize: 18 }} />
              </Box>
              <Typography sx={{ fontSize: 14, lineHeight: 1.7, color: "rgba(231,236,255,0.95)" }}>
                info@ssassociates.com
              </Typography>
            </Box>
            <Box
              component="button"
              type="button"
              sx={{
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
                bgcolor: "transparent",
                borderRadius: 1.6,
                px: 1.8,
                py: 0.9,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(255,142,46,0.12)",
                },
              }}
            >
              Contact Us <EastIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress size={36} sx={{ color: primaryColor }} />
            </Box>
          )}

          {!loading && fetchError && (
            <Typography
              sx={{
                color: textGrayDark,
                px: 2,
                py: 2,
                borderRadius: 2,
                border: `1px solid ${textGrayLight}`,
                bgcolor: "white",
              }}
            >
              {fetchError}
            </Typography>
          )}

          {!loading && !fetchError && faqs.length === 0 && (
            <Typography
              sx={{
                color: textGrayDark,
                px: 2,
                py: 2,
                borderRadius: 2,
                border: `1px solid ${textGrayLight}`,
                bgcolor: "white",
              }}
            >
              No questions have been added yet.
            </Typography>
          )}

          {!loading &&
            !fetchError &&
            faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const num = String(index + 1).padStart(2, "0");

              return (
                <Box
                  key={item._id}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2.4,
                    border: `1px solid ${isOpen ? primaryColor : "none"}`,
                    boxShadow: isOpen ? "0 8px 20px rgba(23,28,45,0.06)" : "none",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      alignItems: "center",
                      gap: 1.6,
                      px: { xs: 1.6, sm: 2.1 },
                      py: { xs: 1.4, sm: 1.6 },
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggle(index)}
                  >
                    <Box
                      sx={{
                        minWidth: 30,
                        height: 30,
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 11,
                        color: primaryColor,
                        bgcolor: primaryBg,
                      }}
                    >
                      {num}
                    </Box>
                    <Typography
                      component="h3"
                      sx={{
                        m: 0,
                        fontFamily: "var(--font-app)",
                        fontWeight: 700,
                        fontSize: { xs: 14.5, sm: 16 },
                        lineHeight: 1.45,
                        color: isOpen ? primaryColor : secondaryDark ,
                      }}
                    >
                      {item.question}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", color: isOpen ? "#c48444" : "#202432" }}>
                      {isOpen ? <KeyboardArrowUpIcon sx={{ fontSize: 20 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 340ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <Box
                      sx={{
                        overflow: "hidden",
                        px: { xs: 2, sm: 2.3 },
                        pb: isOpen ? { xs: 1.8, sm: 2.2 } : 0,
                        transition: "padding-bottom 280ms ease",
                      }}
                    >
                      <Typography
                        sx={{
                          pt: isOpen ? 0.5 : 0,
                          m: 0,
                          fontSize: 14,
                          lineHeight: 1.75,
                          color: textGrayDark,
                          maxWidth: "95%",
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                          transition: "opacity 220ms ease, transform 280ms ease, padding-top 280ms ease",
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default Faqs;

