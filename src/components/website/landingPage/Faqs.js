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
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useState } from "react";

const faqs = [
  {
    question: "What types of construction services do you offer?",
    answer:
      "We offer a comprehensive range of construction services including residential construction, commercial building, interior design, renovation and remodeling, project management, and consultation services. Our experienced team can handle projects of any size and complexity.",
  },
  {
    question: "How long does a typical construction project take?",
    answer:
      "Project timelines vary based on scope, size, and complexity. After an initial consultation and site assessment, we provide a detailed schedule outlining each phase of the project so you know exactly what to expect.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes. We offer free, no-obligation estimates. We review your requirements, discuss options, and provide a transparent cost breakdown so you can make informed decisions before moving forward.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. S&S Associates is fully licensed and insured. We adhere to all local building codes, safety regulations, and industry standards to ensure your project is completed to the highest quality.",
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

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
              "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
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

      <Box 
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <Box
              key={item.question}
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
                      "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
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
                  maxHeight: isOpen ? 220 : 0,
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
                      "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
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

