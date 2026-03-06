"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import {
  primaryColor,
  primaryLight,
  primaryBg,
  primaryGradient,
  secondaryColor,
  secondaryDark,
  secondaryBg,
  whiteColor,
  textGrayLight,
} from "@/components/utils/Colors";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${secondaryDark} 0%, ${secondaryColor} 45%, ${secondaryDark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 5, md: 3 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 18% 22%, ${primaryBg}, transparent 32%), radial-gradient(circle at 82% 18%, rgba(239, 139, 0, 0.12), transparent 28%), radial-gradient(circle at 50% 78%, ${primaryBg}, transparent 36%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 100, md: 180 },
          height: { xs: 100, md: 180 },
          borderRadius: "50%",
          top: { xs: "8%", md: "10%" },
          left: { xs: "-12%", md: "-4%" },
          background: primaryBg,
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 240, md: 420 },
          height: { xs: 240, md: 420 },
          borderRadius: "50%",
          bottom: { xs: "-6%", md: "-10%" },
          right: { xs: "-18%", md: "-5%" },
          background: primaryBg,
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1100,
          borderRadius: { xs: "24px", md: "32px" },
          border: `1px solid ${secondaryBg}`,
          background: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
          backdropFilter: "blur(18px)",
          boxShadow: "0 40px 120px rgba(0, 0, 0, 0.45)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${primaryBg}, transparent 35%, transparent 65%, ${primaryBg})`,
            pointerEvents: "none",
          }}
        />

        <Stack
          spacing={4}
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 3, sm: 4, md: 7 },
            py: { xs: 5, sm: 6, md: 8 },
            alignItems: "flex-start",
          }}
        >
          <Chip
            icon={<SearchOffRoundedIcon />}
            label="404 | Route Not Found"
            sx={{
              height: 38,
              color: primaryLight,
              backgroundColor: primaryBg,
              border: `1px solid ${primaryColor}`,
              "& .MuiChip-icon": {
                color: primaryColor,
              },
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 5 }}
            sx={{ width: "100%", alignItems: { xs: "flex-start", md: "center" } }}
          >
            <Typography
              sx={{
                fontSize: { xs: "50px", sm: "70px", md: "100px" },
                lineHeight: 0.9,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                color: whiteColor,
                textShadow: `0 0 40px ${primaryBg}`,
              }}
            >
              404
            </Typography>

            <Stack spacing={2.2} sx={{ maxWidth: 560 }}>
              <Typography
                component="h1"
                sx={{
                  color: whiteColor,
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                The page vanished into the digital void.
              </Typography>

              <Typography
                sx={{
                  color: textGrayLight,
                  fontSize: { xs: "1rem", md: "1rem" },
                  lineHeight: 1.8,
                  maxWidth: 520,
                }}
              >
                The route you requested does not exist, may have moved, or was never
                published. Jump back into S&amp;S Associates and continue browsing from a
                working page.
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Button
              component={Link}
              href="/"
              variant="contained"
              startIcon={<HomeRoundedIcon />}
              sx={{
                minWidth: 150,
                height: 40,
                borderRadius: 999,
                px: 3,
                background: primaryGradient,
                color: whiteColor,
                fontWeight: 700,
                boxShadow: `0 18px 45px ${primaryBg}`,
                "&:hover": {
                  background: primaryGradient,
                  opacity: 0.92,
                },
              }}
            >
              Go To Home
            </Button>

            <Button
              component={Link}
              href="/projects"
              variant="outlined"
              endIcon={<ArrowOutwardRoundedIcon />}
              sx={{
                minWidth: 150,
                height: 40,
                borderRadius: 999,
                px: 3,
                color: whiteColor,
                borderColor: textGrayLight,
                backgroundColor: secondaryBg,
                "&:hover": {
                  borderColor: primaryColor,
                  backgroundColor: primaryBg,
                },
              }}
            >
              Explore Projects
            </Button>
          </Stack>

          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 2,
              pt: { xs: 1, md: 2 },
            }}
          >
            {[
              {
                title: "Need the homepage?",
                href: "/",
                label: "Open Home",
              },
              {
                title: "Want to see our work?",
                href: "/projects",
                label: "Open Projects",
              },
              {
                title: "Need to contact us?",
                href: "/contact",
                label: "Open Contact",
              },
            ].map((item) => (
              <Box
                key={item.href}
                sx={{
                  p: 2.5,
                  borderRadius: "20px",
                  border: `1px solid ${secondaryBg}`,
                  backgroundColor: secondaryBg,
                  "&:hover": {
                    backgroundColor: primaryBg,
                    borderColor: primaryColor,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: whiteColor,
                    fontWeight: 600,
                    fontSize: "1rem",
                    mb: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Button
                  component={Link}
                  href={item.href}
                  endIcon={<ArrowOutwardRoundedIcon />}
                  sx={{
                    p: 0,
                    minWidth: 0,
                    color: primaryColor,
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: primaryLight,
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}