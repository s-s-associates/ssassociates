"use client";

import { primaryColor, whiteColor } from "@/components/utils/Colors";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Breadcrumbs, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { fadeUp } from "./serviceDetailShared";
import { bannerHeadingSize, bannerSubHeadingSize, mainHeadingSize, mainSubHeadingSize } from "@/components/utils/Sizes";

export default function Banner({ service, heroSrc, heroBannerDescription }) {
  const scrollToDeliverables = () => {
    document.getElementById("what-you-get")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "80vh" ,
        maxHeight: "80vh",
        display: "flex",
        alignItems: "flex-end",
        color: whiteColor,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
            "linear-gradient(135deg, rgba(8,12,20,0.82) 0%, rgba(8,12,20,0.55) 60%, rgba(8, 12, 20, 0.55) 100%)",
          }}
        />
      </Box>

      <Box mx={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 10 }} sx={{ position: "relative", zIndex: 1, py: { xs: 6, md: 10 } }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            mb: 3,
            color: "rgba(255,255,255,0.82)",
            "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.45)" },
            maxWidth: "100%",
            "& a": {
              transition: "color 0.2s ease",
            },
            "& a:hover": {
              color: primaryColor,
            },
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "inherit",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <FiHome size={14} />
            Home
          </Link>
          <Link
            href="/services"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Services
          </Link>
          <Typography
            component="span"
            title={service.title || "Service"}
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 600,
              fontSize: 13,
              maxWidth: { xs: "10rem", sm: "20rem", md: "28rem" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {service.title || "Service"}
          </Typography>
        </Breadcrumbs>

        <motion.div {...fadeUp}>
          <Box
            sx={{
              display: "inline-flex",
              px: 1.75,
              py: 0.5,
              borderRadius: 10,
              bgcolor: "rgba(251, 134, 30, 0.2)",
              border: "1px solid rgba(251, 134, 30, 0.45)",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: 0.5 }}>
              Our Services
            </Typography>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontSize: bannerHeadingSize.fontSize,
              fontWeight: bannerHeadingSize.fontWeight,
              lineHeight: bannerHeadingSize.lineHeight,
              maxWidth: 900,
              mb: 2,
              fontFamily: "inherit",
            }}
          >
            {service.title}
          </Typography>
          <Typography
            sx={{
              fontSize: bannerSubHeadingSize.fontSize,
                fontWeight: bannerSubHeadingSize.fontWeight,
                lineHeight: bannerSubHeadingSize.lineHeight,
              color: "rgba(255,255,255,0.88)",
              maxWidth: 800,
              mb: 3,
              wordBreak: "break-word",
            }}
          >
            {heroBannerDescription}
          </Typography>
          <Button
            onClick={scrollToDeliverables}
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              bgcolor: primaryColor,
              color: "#fff",
              textTransform: "none",
              fontWeight: 700,
              fontSize: 15,
              px: 2.5,
              py: 1.2,
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(251, 134, 30, 0.35)",
              "&:hover": { bgcolor: "rgb(231, 100, 0)" },
            }}
          >
            Explore Details
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
