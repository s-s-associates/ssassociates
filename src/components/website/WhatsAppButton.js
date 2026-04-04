"use client";

import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { primaryColor } from "@/components/utils/Colors";

const WA_URL = process.env.NEXT_PUBLIC_COMPANY_WHATSAPP;

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2C8.268 2 2 8.268 2 16c0 2.49.65 4.83 1.79 6.86L2 30l7.34-1.76A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
        fill="#fff"
      />
      <path
        d="M16 3.5C9.096 3.5 3.5 9.096 3.5 16c0 2.3.618 4.455 1.698 6.312L3.5 28.5l6.37-1.67A12.45 12.45 0 0016 28.5c6.904 0 12.5-5.596 12.5-12.5S22.904 3.5 16 3.5z"
        fill="#25D366"
      />
      <path
        d="M21.84 18.76c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.24-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.35.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
        fill="#fff"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 20, sm: 28 },
        right: { xs: 16, sm: 24 },
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1.25,
      }}
    >
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <Box
            component={motion.button}
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            sx={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              bgcolor: primaryColor,
              border: "1.5px solid rgba(0,0,0,0.1)",
              boxShadow: "0 4px 18px rgba(0,0,0,0.13)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              mr: "6px",
              transition: "box-shadow 0.2s ease",
              "&:hover": {
                boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
              },
            }}
          >
            <ArrowUpIcon />
          </Box>
        )}
      </AnimatePresence>

      {/* WhatsApp */}
      {WA_URL && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {/* Label */}
          <AnimatePresence>
            {waHovered && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 10, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.92 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                sx={{
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: "10px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Chat with us
              </Box>
            )}
          </AnimatePresence>

          {/* Button */}
          <Box
            component={motion.a}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            onHoverStart={() => setWaHovered(true)}
            onHoverEnd={() => setWaHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 1,
            }}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 4px 20px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
              textDecoration: "none",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Pulse ring */}
            <Box
              component={motion.span}
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "rgba(37,211,102,0.45)",
                pointerEvents: "none",
              }}
            />
            <WhatsAppIcon />
          </Box>
        </Box>
      )}
    </Box>
  );
}
