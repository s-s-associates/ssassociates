"use client";

import { grayColor, primaryColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

const steps = [
  {
    num: 1,
    image: "/images/i1.png",
    title: "Upload CSV",
    description: "Upload your Hudl/ JustPlay export",
  },
  {
    num: 2,
    image: "/images/i2.png",
    title: "Map Data",
    description: "Review & adjust formation names & concepts",
  },
  {
    num: 3,
    image: "/images/i3.png",
    title: "View Insights",
    description: "10 pre-built dashboards ready to analyze",
  },
];

function Insights() {
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
      {/* Heading */}
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          fontWeight: 700,
          fontSize: { xs: 28, sm: 34, md: 44 },
          lineHeight: 1.2,
          color: grayColor,
          textAlign: "center",
          mb: { xs: 5, md: 6 },
        }}
      >
        Get Insights in 3 Steps
      </Box>

      {/* Steps row with arrows */}
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.12 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 2 },
          flexWrap: "wrap",
        }}
      >
        {steps.map(({ num, image, title, description }, i) => (
          <React.Fragment key={num}>
            {/* Step card */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flex: { xs: "none", md: "1 1 0" },
                maxWidth: { md: 260 },
                position: "relative",
              }}
            >
              <Box
                sx={{
                //   position: "absolute",
                  textAlign:"center",
                  top: -8,
                  ml:2,
                  mb:2,
                  left: { xs: "50%", md: "calc(50% - 52px)" },
                  transform: { xs: "translateX(-50%)", md: "translateX(-100%)" },
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(0,0,0,0.25)",
                }}
              >
                {num}
              </Box>

              {/* Image */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <Image
                  src={image}
                  alt={title}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </Box>

              {/* Title */}
              <Box
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: 18, md: 20 },
                  lineHeight: 1.3,
                  color: grayColor,
                  mb: 0.5,
                }}
              >
                {title}
              </Box>

              {/* Description */}
              <Box
                sx={{
                  fontSize: { xs: 15, md: 16 },
                  lineHeight: 1.45,
                  color: "rgba(21, 21, 29, 0.7)",
                }}
              >
                {description}
              </Box>
            </Box>

            {i < steps.length - 1 && (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "0 0 auto",
                  px: 1,
                }}
              >
                <Image
                  src={i === 0 ? "/images/arrow1.png" : "/images/arrow2.png"}
                  alt=""
                  width={68}
                  height={52}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default Insights;
