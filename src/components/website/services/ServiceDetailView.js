"use client";

import { primaryColor, secondaryColor, whiteColor } from "@/components/utils/Colors";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SUB_ICONS = [LayersRoundedIcon, HandymanRoundedIcon, ApartmentRoundedIcon, EngineeringRoundedIcon];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

function SectionHeading({ kicker, title, light }) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
      <Typography
        component="p"
        sx={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: primaryColor,
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        {kicker}
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 28, sm: 34, md: 38 },
          fontWeight: 700,
          color: light ? whiteColor : "rgb(15, 23, 42)",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 56,
          height: 3,
          bgcolor: primaryColor,
          mx: "auto",
          mt: 2,
          borderRadius: 1,
        }}
      />
    </Box>
  );
}

export default function ServiceDetailView({ service }) {
  const heroSrc =
    service.imageUrl?.trim() ||
    "/images/projects/EY-Fit-Out-Thumbnail-min.webp";
  const whatYouGet = Array.isArray(service.whatYouGet) ? service.whatYouGet.filter(Boolean) : [];
  const subServices = Array.isArray(service.subServices) ? service.subServices : [];
  const extraBenefits = Array.isArray(service.extraBenefits) ? service.extraBenefits.filter(Boolean) : [];
  const conclusion =
    service.conclusion?.trim() ||
    "We deliver quality, transparency, and engineering rigor so your project stands on a solid foundation.";

  const scrollToDeliverables = () => {
    document.getElementById("what-you-get")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: "relative",
          minHeight: { xs: "72vh", md: "78vh" },
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
                "linear-gradient(105deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.55) 45%, rgba(15,23,42,0.75) 100%)",
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, py: { xs: 6, md: 10 } }}>
          <Link href="/services" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
                mb: 3,
                "&:hover": { color: primaryColor },
              }}
            >
              ← Back to Services
            </Typography>
          </Link>

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
                fontSize: { xs: 34, sm: 44, md: 52 },
                fontWeight: 800,
                lineHeight: 1.1,
                maxWidth: 900,
                mb: 2,
                fontFamily: "inherit",
              }}
            >
              {service.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 17 },
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.88)",
                maxWidth: 640,
                mb: 3,
              }}
            >
              {service.description || "Learn how we plan, build, and hand over with clarity at every stage."}
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
        </Container>
      </Box>

      {/* What You Get */}
      {whatYouGet.length > 0 && (
        <Box id="what-you-get" component="section" sx={{ py: { xs: 7, md: 9 }, bgcolor: "#fff" }}>
          <Container maxWidth="lg">
            <motion.div {...fadeUp}>
              <SectionHeading kicker="Deliverables" title="What You Get" />
            </motion.div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                columnGap: 2.5,
                rowGap: 2.5,
              }}
            >
              {whatYouGet.map((line, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  sx={{
                    boxSizing: "border-box",
                    width: {
                      xs: "100%",
                      sm: "calc((100% - 20px) / 2)",
                      md: "calc((100% - 40px) / 3)",
                    },
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      p: 2.5,
                      borderRadius: 2,
                      border: "1px solid rgba(15,23,42,0.08)",
                      bgcolor: "#fafafa",
                      display: "flex",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: primaryColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <CheckRoundedIcon sx={{ color: "#fff", fontSize: 22 }} />
                    </Box>
                    <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: "rgb(51, 65, 85)", fontWeight: 500 }}>
                      {line}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Sub-services */}
      {subServices.length > 0 && (
        <Box component="section" sx={{ py: { xs: 7, md: 9 }, bgcolor: "#f1f5f9" }}>
          <Container maxWidth="lg">
            <motion.div {...fadeUp}>
              <SectionHeading kicker="Breakdown" title="Our Sub-Services" />
            </motion.div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                columnGap: 3,
                rowGap: 3,
              }}
            >
              {subServices.map((sub, i) => {
                const Icon = SUB_ICONS[i % SUB_ICONS.length];
                const items = Array.isArray(sub.items) ? sub.items.filter(Boolean) : [];
                return (
                  <Box
                    key={i}
                    component={motion.div}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                    sx={{
                      boxSizing: "border-box",
                      width: {
                        xs: "100%",
                        sm: "calc((100% - 24px) / 2)",
                        md: "calc((100% - 48px) / 3)",
                      },
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        bgcolor: "#fff",
                        borderRadius: 3,
                        p: 3,
                        boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                        border: "1px solid rgba(15,23,42,0.06)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: "rgba(251, 134, 30, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ color: primaryColor, fontSize: 28 }} />
                      </Box>
                      <Typography sx={{ fontSize: 20, fontWeight: 800, color: "rgb(15, 23, 42)", mb: 1 }}>
                        {sub.title || `Phase ${i + 1}`}
                      </Typography>
                      {sub.description ? (
                        <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: "rgb(100, 116, 139)", mb: 2 }}>
                          {sub.description}
                        </Typography>
                      ) : null}
                      <Box component="ul" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                        {items.map((item, j) => (
                          <Box
                            key={j}
                            component="li"
                            sx={{
                              display: "flex",
                              gap: 1.25,
                              alignItems: "flex-start",
                              mb: 1.25,
                              fontSize: 14,
                              color: "rgb(51, 65, 85)",
                            }}
                          >
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: primaryColor,
                                mt: 0.85,
                                flexShrink: 0,
                              }}
                            />
                            {item}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>
      )}

      {/* Extra benefits */}
      {extraBenefits.length > 0 && (
        <Box
          component="section"
          sx={{
            py: { xs: 7, md: 9 },
            bgcolor: secondaryColor,
            color: whiteColor,
          }}
        >
          <Container maxWidth="lg">
            <motion.div {...fadeUp}>
              <SectionHeading kicker="Why choose us" title="Extra Benefits" light />
            </motion.div>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                columnGap: 2,
                rowGap: 2,
              }}
            >
              {extraBenefits.map((line, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  sx={{
                    boxSizing: "border-box",
                    width: {
                      xs: "100%",
                      sm: "calc((100% - 16px) / 2)",
                    },
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      p: 2.5,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <StarRoundedIcon sx={{ color: primaryColor, fontSize: 26, flexShrink: 0, mt: 0.2 }} />
                    <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.92)" }}>{line}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Closing CTA */}
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
    </Box>
  );
}
