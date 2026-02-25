"use client";

import { grayColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ_BG = "rgba(236, 236, 237, 1)";

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There’s no contract. You can cancel your subscription anytime from your account settings. After you cancel, you keep access until the end of your current billing period and won’t be charged again.",
  },
  {
    question: "What CSV formats do you support?",
    answer:
      "We support standard CSV exports from Hudl, JustPlay, and other common play-tracking tools. We auto-detect headers and formation/play columns, and you can map or rename columns during setup so your data lines up correctly with our dashboards.",
  },
  {
    question: "How many teams can I track?",
    answer:
      "The Starter plan includes one team. You can upload unlimited CSVs for that team and use all 10 dashboards. To track multiple teams or programs, you can upgrade to a higher plan or contact us for a custom setup.",
  },
  {
    question: "Do you offer team/school discounts?",
    answer:
      "Yes. We offer volume discounts for clubs, schools, and organizations running multiple teams or programs. Contact us with your number of teams and we’ll send a tailored quote.",
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: { xs: 24, sm: 28, md: 32 },
          lineHeight: 1.2,
          color: grayColor,
          textAlign: "center",
          mb: 4,
        }}
      >
        Frequently Ask Questions
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Box
              key={index}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              sx={{
                backgroundColor: FAQ_BG,
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  color: grayColor,
                }}
              >
                {item.question}
                <Box
                  component={motion.span}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  sx={{ color: grayColor, display: "flex", alignItems: "center" }}
                >
                  <FiChevronDown size={20} />
                </Box>
              </Box>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box
                      sx={{
                        px: 3,
                        pb: 2,
                        pt: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "rgba(21, 21, 29, 0.75)",
                      }}
                    >
                      {item.answer}
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Faqs;
