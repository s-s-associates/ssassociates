"use client";

import { primaryColor, primaryLight, secondaryDark, whiteColor } from "@/components/utils/Colors";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiAward, FiStar } from "react-icons/fi";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function MessageFromCEO() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: secondaryDark,
        overflow: "hidden",
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background decorations */}
      <Box sx={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, rgba(251,134,30,0.10) 0%, transparent 70%)`, pointerEvents: "none" }} />
      <Box sx={{ position: "absolute", bottom: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(251,134,30,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Subtle grid overlay */}
      <Box sx={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(251,134,30,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,134,30,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

        {/* Section label */}
        <Box
          component={motion.div}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography sx={{
            fontSize: 11, fontWeight: 800, letterSpacing: "0.22em",
            textTransform: "uppercase", color: primaryColor, mb: 1.5,
          }}>
            About Us
          </Typography>
          <Box sx={{ width: 36, height: 3, borderRadius: 2, mx: "auto", mb: 2.5, background: `linear-gradient(90deg, ${primaryColor}, rgba(251,134,30,0.25))` }} />
          <Typography component="h2" sx={{
            fontWeight: 800, fontSize: { xs: 28, sm: 36, md: 44 },
            color: whiteColor, lineHeight: 1.1, letterSpacing: "-0.02em", mb: 1.5,
          }}>
            Message From CEO
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "rgba(255,255,255,0.55)",  mx: "auto", lineHeight: 1.7 }}>
            A word from the leader driving every project with vision, integrity, and excellence.
          </Typography>
        </Box>

        {/* Main card */}
        <Box
          component={motion.div}
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: { xs: "center", md: "stretch" },
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "24px",
            overflow: "hidden",
            backdropFilter: "blur(8px)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Left — CEO image */}
          <Box sx={{
            position: "relative",
            flexShrink: 0,
            width: { xs: "100%", md: 320, lg: 380 },
            minHeight: { xs: 320, sm: 400, md: "auto" },
          }}>
            <Image
              src="/images/about/ceo.jpg"
              alt="Muhammad Safdar – CEO, S&S Associates"
              fill
              sizes="(max-width: 900px) 100vw, 380px"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            {/* Bottom gradient on image */}
            <Box sx={{
              position: "absolute", inset: 0,
              background: {
                xs: "linear-gradient(to top, rgba(8,12,20,0.85) 0%, transparent 50%)",
                md: "linear-gradient(to right, transparent 60%, rgba(8,12,20,0.6) 100%)",
              },
              pointerEvents: "none",
            }} />

            {/* Orange accent bar */}
            <Box sx={{
              position: "absolute", top: 0, left: 0,
              width: { xs: "100%", md: 4 }, height: { xs: 4, md: "100%" },
              background: `linear-gradient(${primaryColor}, rgba(251,134,30,0.3))`,
            }} />

            {/* Name badge over image (mobile) */}
            <Box sx={{
              display: { xs: "flex", md: "none" },
              position: "absolute", bottom: 20, left: 20,
              flexDirection: "column",
            }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: whiteColor, lineHeight: 1.2 }}>
                Muhammad Safdar
              </Typography>
              <Typography sx={{ fontSize: 12, color: primaryColor, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", mt: 0.5 }}>
                Chief Executive Officer
              </Typography>
            </Box>
          </Box>

          {/* Right — content */}
          <Box sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 4, md: 5 },
          }}>
            {/* Big quote icon */}
            <Box sx={{
              width: 52, height: 52, borderRadius: "14px",
              bgcolor: `rgba(251,134,30,0.12)`,
              border: `1px solid rgba(251,134,30,0.25)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              mb: 3,
            }}>
              <FormatQuoteRoundedIcon sx={{ fontSize: 28, color: primaryColor }} />
            </Box>

            {/* Eyebrow */}
            <Typography sx={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: primaryColor, mb: 1,
            }}>
              Where Vision Meets Reality
            </Typography>

            {/* Quote */}
            <Typography sx={{
              fontSize: { xs: 15, sm: 16, md: 17 },
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.85,
              fontStyle: "italic",
              mb: 3,
              borderLeft: `3px solid ${primaryColor}`,
              pl: 2.5,
              py: 0.5,
            }}>
              "Our mission is to transform your dreams into reality through meticulous planning, expert craftsmanship, and unwavering dedication. We take pride in our commitment to delivering projects that not only meet but exceed your expectations. Every nail, every beam, and every detail of our work reflects our passion for constructing remarkable structures."
            </Typography>

            {/* CEO name — desktop */}
            <Box sx={{ display: { xs: "none", md: "block" }, mb: 3 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 20, color: whiteColor, lineHeight: 1.2 }}>
                Muhammad Safdar
              </Typography>
              <Typography sx={{ fontSize: 12, color: primaryColor, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", mt: 0.5 }}>
                Chief Executive Officer · S&amp;S Associates
              </Typography>
            </Box>

            {/* Stats row */}
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              pt: 3,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}>
              {[
                { Icon: FiAward, value: `${process.env.NEXT_PUBLIC_COMPANY_EXPERIENCE}`, label: "Years Experience" },
                { Icon: FiStar,  value: `${process.env.NEXT_PUBLIC_PROJECTS_COMPLETED}`, label: "Projects Delivered" },
              ].map(({ Icon, value, label }) => (
                <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{
                    width: 38, height: 38, borderRadius: "10px",
                    bgcolor: "rgba(251,134,30,0.12)",
                    border: "1px solid rgba(251,134,30,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: primaryColor, flexShrink: 0,
                  }}>
                    <Icon size={16} strokeWidth={2.2} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 18, color: whiteColor, lineHeight: 1 }}>
                      {value}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.5)", mt: 0.25 }}>
                      {label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
