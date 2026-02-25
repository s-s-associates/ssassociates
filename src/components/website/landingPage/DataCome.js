"use client";

import { grayColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

function DataCome() {
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
      {/* Heading */}
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          fontWeight: 600,
          fontSize: { xs: 28, sm: 32, md: 40 },
          lineHeight: 1.2,
          color: grayColor,
          textAlign: "center",
          mb: { xs: 4, md: 5 },
        }}
      >
        See Your Data Come to Life
      </Box>

      {/* Image container - large, rounded corners */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ ...fadeUpTransition, delay: 0.12 }}
        sx={{
          width: "100%",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            maxHeight: { xs: 320, sm: 400, md: 520 },
          }}
        >
          <Image
            src="/images/data.jpg"
            alt="Your data visualized - football insights"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DataCome;
