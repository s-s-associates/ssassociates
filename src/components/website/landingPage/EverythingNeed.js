"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

const features = [
  {
    image: "/images/en1.png",
    title: "10 Ready Dashboards",
    description:
      "Formation usage, personnel breakdown, concept analysis, and more.",
  },
  {
    image: "/images/en2.png",
    title: "Smart Data Normalization",
    description: "AI-assisted mapping handles different CSV formats.",
  },
  {
    image: "/images/en3.png",
    title: "Formation & Personnel Breakdown",
    description: "See exactly what you're running and how often.",
  },
  {
    image: "/images/en4.png",
    title: "Down & Distance Tendencies",
    description: "Identify your patterns before opponents do.",
  },
  {
    image: "/images/en5.png",
    title: "Explosive Play Analysis",
    description: "Track what's working and what's not.",
  },
  {
    image: "/images/en6.png",
    title: "Red Zone Efficiency",
    description: "Optimize your scoring zone playcalling.",
  },
];

function EverythingNeed() {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        // maxWidth: 1440,
        bgcolor:"#F9F9F9",
        margin: "0 auto",
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      {/* Section title */}
     

   
      <Grid
        container
        spacing={2}
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.1 }}
        sx={{
          // display: "grid",
          // gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          // gap: { xs: 4, md: 6 },
          // alignItems: "stretch",
        //   maxWidth: 1200,
        //   margin: "0 auto",
        }}
      >
        {/* Left: Image - height matches right cards */}
    <Grid  size={{ xs: 12, md: 4 }} >
    <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: { xs: 28, sm: 32, md: 40 },
          lineHeight: 1.2,
          color: grayColor,
          textAlign: "center",
          mb: { xs: 2, md: 2 },
        }}
      >
        Everything You Need
      </Box>
    <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            order: { xs: 2, md: 1 },
          }}
        >
          <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: { xs: 280, md: 480 },
            aspectRatio: { xs: "4/3", md: "auto" },
          }}
          >
            <Image
              src="/images/everything.jpg"
              alt="Football analysis dashboard"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", transform: "scaleX(-1)" }}
            />
          </Box>
        </Box>
    </Grid>

      <Grid size={{ xs: 12, md: 8 }} >
      <Grid
        container
        spacing={2}
          sx={{
            // display: "grid",
            // gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            // gap: 2,
            // order: { xs: 1, md: 2 },
          }}
        >
          {features.map(({ image, title, description }, i) => (
            <Grid
            size={{ xs: 12, md: 6 }}
            item
            key={title}
            component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.12 + i * 0.04,
              }}
              sx={{
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                p: 2.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1.5,
                cursor: "pointer",
                transition: "background 0.35s ease",
                "&:hover": {
                  background: primaryColor,
                  "& .icon-box": {
                    backgroundColor: "#fff",
                    color: "#fff",
                  },
                  "& .card-title, & .card-desc": {
                    color: "#fff",
                  },
                },
              }}
            >
              <Box
                className="icon-box"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "12px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  transition: "background-color 0.35s ease",
                }}
              >
                <Image
                  src={image}
                  alt={title}
                  width={32}
                  height={32}
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Box
                className="card-title"
                sx={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1.3,
                  color: grayColor,
                  transition: "color 0.35s ease",
                }}
              >
                {title}
              </Box>
              <Box
                className="card-desc"
                sx={{
                  fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: grayColor,
                  opacity: 0.88,
                  transition: "color 0.35s ease",
                }}
              >
                {description}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
      </Grid>
    </Box>
  );
}

export default EverythingNeed;
