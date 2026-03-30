"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp } from "./serviceDetailShared";

export default function ServiceCTA({ conclusion }) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#f8fafc" }}>
      <Container maxWidth="md">
        <motion.div {...fadeUp}>
          <Box
            sx={{
              textAlign: "center",
              px: { xs: 3, sm: 5 },
              py: { xs: 5, sm: 6 },
              borderRadius: 4,
              background: "linear-gradient(145deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)",
              boxShadow: "0 24px 60px rgba(15,23,42,0.25)",
              border: "1px solid rgba(251, 134, 30, 0.25)",
            }}
          >
            <Box sx={{ width: 40, height: 3, bgcolor: primaryColor, mx: "auto", mb: 3, borderRadius: 1 }} />
            <Typography
              sx={{
                fontSize: { xs: 18, sm: 22 },
                lineHeight: 1.55,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.95)",
                mb: 4,
                fontWeight: 500,
              }}
            >
              “{conclusion}”
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                textTransform: "none",
                fontWeight: 800,
                fontSize: 16,
                px: 4,
                py: 1.4,
                borderRadius: 2,
                "&:hover": { bgcolor: "rgb(231, 100, 0)" },
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
