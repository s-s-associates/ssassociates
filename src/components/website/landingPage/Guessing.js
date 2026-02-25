"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

function Guessing() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        // maxWidth: 1200,
        margin: "0 auto",
        px: { xs: 2, sm: 5 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          position: "relative",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          minHeight: { xs: 320, md: 380 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src="/images/guess.jpg"
            alt="Football action"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            py: { xs: 5, md: 6 },
            px: { xs: 2, sm: 4 },
          }}
        >
       
          <Box
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: { xs: 24, sm: 28, md: 36 },
              lineHeight: 1.25,
              mb: 1.5,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            Ready to Stop Guessing and Start Knowing?
          </Box>

          {/* Sub-headline */}
          <Box
            sx={{
              color: "white",
              fontWeight: 400,
              fontSize: { xs: 15, sm: 16, md: 18 },
              lineHeight: 1.5,
              mb: 3,
              maxWidth: 560,
              margin: "0 auto",
              textShadow: "0 1px 8px rgba(0,0,0,0.25)",
            }}
          >
            Join coaches who are already using data-driven insights to win more games
          </Box>

      
          <Box sx={{ mb: 2 }}>
            <Box
              component={Link}
              href="/signup"
              sx={{
                display: "inline-block",
                background: `linear-gradient(to right, rgba(138, 56, 245, 1), rgba(110, 49, 189, 1))`,
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                py: 1.5,
                px: 3.5,
                my:3,
                borderRadius: 2,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(138, 56, 245, 0.4)",
                transition: "opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  opacity: 0.95,
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 24px rgba(138, 56, 245, 0.5)",
                },
              }}
            >
              Start Your Free Trial
            </Box>
          </Box>

          {/* Disclaimer */}
          <Box
            sx={{
              color: "white",
              fontSize: 14,
            }}
          >
            No credit card required
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Guessing;
