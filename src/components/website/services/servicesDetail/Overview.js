"use client";

import { primaryColor, secondaryColor, whiteColor } from "@/components/utils/Colors";
import { Box, Container, Typography } from "@mui/material";

export default function Overview({ fullDescForHero }) {
  return (
    <Box
      id="service-overview"
      component="section"
      sx={{
        bgcolor: secondaryColor,
        textAlign: "center",
        py: { xs: 4, md: 5 },
        scrollMarginTop: { xs: 10, sm: 11 },
        color: whiteColor,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            pl: { xs: 2.5, sm: 3 },
            py: { xs: 0.5, sm: 0 },
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: primaryColor,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Overview
          </Typography>
          <Typography
            component="div"
            sx={{
              color: whiteColor,
              fontSize: { xs: 15, sm: 16 },
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {fullDescForHero}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
