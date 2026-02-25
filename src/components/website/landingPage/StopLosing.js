"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};
const fadeUpTransition = { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] };

const cards = [
  {
    image: "/images/sl1.png",
    title: "Manual Spreadsheet Analysis",
    description:
      "Spending hours manually tracking formations and tendencies",
  },
  {
    image: "/images/sl2.png",
    title: "No Clear Insights",
    description:
      "Can't see patterns in your play calling until it's too late",
  },
  {
    image: "/images/sl3.png",
    title: "Wasted Film Time",
    description:
      "Less time coaching, more time crunching numbers",
  },
];

function StopLosing() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor:"#F9F9F9",
        py:6,
        px: { xs: 2, sm: 5 },
       
        my:[4,6,8],
        // mr:-12,
        width: "100%",
        // maxWidth: 1440,
        // margin: "0 auto",
        // borderRadius:"16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // padding: { xs: "60px 24px", sm: "80px 48px", md: "120px 80px" },
        gap: "60px",
      }}
    >
      {/* Main title */}
      <Box
        component={motion.div}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        variants={fadeUp}
        transition={{ ...fadeUpTransition, delay: 0.05 }}
        sx={{
          fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: { xs: 28, sm: 32, md: 40 },
          lineHeight: 1.2,
          letterSpacing: "0%",
          color: grayColor,
          textAlign: "center",
        }}
      >
        Stop Losing Hours to Excel
      </Box>

      {/* Three cards - horizontal on desktop */}
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
          alignItems: "stretch",
          justifyContent: "center",
          gap: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        {cards.map(({ image, title, description }, i) => (
          <Box
            key={title}
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 + i * 0.06 }}
            sx={{
              flex: { xs: "none", md: "1 1 0" },
              background: "#fff",
              borderRadius: 2,
              boxShadow: "0 2px 12px rgba(0,0,0,0.01)",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              cursor: "pointer",
              transition: "background 0.35s ease",
              "&:hover": {
                background: primaryColor,
                "& .icon-box": {
                  backgroundColor: "#fff",
                },
                "& .card-title, & .card-desc": {
                  color: "#fff",
                  cursor:"pointer"
                },
              },
            }}
          >
            {/* Image */}
            <Box
              className="icon-box"
              sx={{
                width: 72,
                height: 72,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#8A38F51A",
                // p:1,
                transition: "background-color 0.35s ease",
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

            {/* H4 */}
            <Box
              className="card-title"
              sx={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                lineHeight: "34px",
                letterSpacing: "0%",
                color: grayColor,
                maxWidth: 346.67,
                minHeight: 34,
                display: "flex",
                alignItems: "center",
                transition: "color 0.35s ease",
              }}
            >
              {title}
            </Box>

            {/* Body Text 3 */}
            <Box
              className="card-desc"
              sx={{
                fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: 18,
                lineHeight: "28px",
                letterSpacing: "0%",
                color: grayColor,
                opacity: 0.88,
                maxWidth: 346.67,
                minHeight: 56,
                transition: "color 0.35s ease",
                cursor:"pointer"
              }}
            >
              {description}
            </Box>
          </Box>
        ))}
      </Box>

    </Box>
  );
}

export default StopLosing;
