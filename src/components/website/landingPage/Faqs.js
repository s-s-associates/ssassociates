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
import { Box, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useState } from "react";

function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

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
          setOpenIndex(sorted.length > 0 ? 0 : -1);
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
        backgroundColor: secondaryBg,
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Box
          component="h2"
          sx={{
            fontFamily:
              "var(--font-app)",
            fontWeight: 700,
            fontSize: { xs: 28, md: 32 },
            lineHeight: 1.2,
            color: secondaryColor,
            mb: 1.5,
          }}
        >
          Frequently Asked Questions
        </Box>
        <Box
          component="p"
          sx={{
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.6,
            color: textGrayDark,
            maxWidth: 520,
            mx: "auto",
            mb: 4,
          }}
        >
          Find answers to common questions about our services.
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={36} sx={{ color: primaryColor }} />
        </Box>
      )}

      {!loading && fetchError && (
        <Typography
          sx={{
            textAlign: "center",
            color: textGrayDark,
            maxWidth: 520,
            mx: "auto",
            mb: 2,
          }}
        >
          {fetchError}
        </Typography>
      )}

      {!loading && !fetchError && faqs.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            color: textGrayDark,
            maxWidth: 520,
            mx: "auto",
          }}
        >
          No questions have been added yet.
        </Typography>
      )}

      <Box 
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {!loading &&
          faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <Box
              key={item._id}
              sx={{
                backgroundColor: whiteColor,
                borderRadius: btnRadius,
                boxShadow: isOpen ? boxShadowHover : boxShadow,
                transition,
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => handleToggle(index)}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1.75, sm: 2 },
                  gap: 2,
                }}
              >
                <Box
                  component="h3"
                  sx={{
                    m: 0,
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 600,
                    fontSize: { xs: 15, sm: 16 },
                    lineHeight: 1.4,
                    color: isOpen ? primaryColor : secondaryColor,
                    textAlign: "left",
                  }}
                >
                  {item.question}
                </Box>
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "999px",
                    border: `1px solid ${textGrayLight}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isOpen ? whiteColor : primaryColor,
                    backgroundColor: isOpen ? primaryColor : "transparent",
                    transition,
                  }}
                >
                  {isOpen ? (
                    <RemoveIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <AddIcon sx={{ fontSize: 20 }} />
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  borderTop: isOpen
                    ? `1px solid ${primaryColor}`
                    : `1px solid ${whiteColor}`,
                  px: { xs: 2, sm: 3 },
                  pb: isOpen ? { xs: 2, sm: 2.5 } : 0,
                  maxHeight: isOpen ? 2400 : 0,
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "border-color 0.2s ease, max-height 0.25s ease, opacity 0.25s ease, padding-bottom 0.25s ease",
                }}
              >
                <Box
                  component="p"
                  sx={{
                    mt: 0,
                    fontFamily:
                      "var(--font-app)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: textGrayDark,
                    textAlign: "left",
                  }}
                >
                  {item.answer}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Faqs;

