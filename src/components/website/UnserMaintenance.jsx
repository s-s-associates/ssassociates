"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import {
  primaryColor,
  primaryGradient,
  secondaryDark,
  textGrayLight,
} from "@/components/utils/Colors";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "S&S Associates";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@ssassociates.pk";

const PARTICLES = [
  { w: 3, h: 3, l: 5,  t: 15, dur: 7,  del: 0   },
  { w: 5, h: 5, l: 15, t: 60, dur: 9,  del: 1.2 },
  { w: 2, h: 2, l: 25, t: 30, dur: 6,  del: 0.5 },
  { w: 4, h: 4, l: 40, t: 75, dur: 11, del: 2   },
  { w: 3, h: 3, l: 58, t: 20, dur: 8,  del: 0.8 },
  { w: 6, h: 6, l: 70, t: 50, dur: 10, del: 1.5 },
  { w: 2, h: 2, l: 80, t: 85, dur: 7,  del: 0.3 },
  { w: 4, h: 4, l: 88, t: 38, dur: 9,  del: 1.8 },
  { w: 3, h: 3, l: 94, t: 12, dur: 6,  del: 0.6 },
  { w: 5, h: 5, l: 33, t: 90, dur: 12, del: 2.5 },
];

const INFO_CARDS = [
  { icon: BuildRoundedIcon,      label: "Status",        value: "In Progress"  },
  { icon: AccessTimeRoundedIcon, label: "Est. Downtime", value: "A Few Hours"  },
  { icon: WifiOffRoundedIcon,    label: "Affected",      value: "Website Only" },
];

export default function UnderMaintenance() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let offset = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const sp = 52;
      ctx.strokeStyle = "rgba(251,134,30,0.055)";
      ctx.lineWidth = 1;
      for (let x = offset % sp; x < width; x += sp) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = offset % sp; y < height; y += sp) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      offset += 0.18;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Dialog
      open
      fullScreen
      disableEscapeKeyDown
      // No onClose → backdrop click is also a no-op
      keepMounted
      aria-labelledby="maintenance-title"
      sx={{
        zIndex: 1205,
        "& .MuiDialog-paper": {
          background: "transparent",
          boxShadow: "none",
          overflow: "hidden",
        },
        "& .MuiBackdrop-root": { display: "none" },
      }}
    >
      {/* ── Animated backdrop ── */}
      <Box sx={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 90% 55% at 50% -5%,  rgba(251,134,30,0.14) 0%, transparent 65%),
          radial-gradient(ellipse 55% 70% at 95% 110%, rgba(251,134,30,0.08) 0%, transparent 55%),
          ${secondaryDark}
        `,
        zIndex: 0,
      }} />

      {/* Moving grid canvas */}
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Box key={i} sx={{
          position: "absolute",
          width: p.w, height: p.h,
          borderRadius: "50%",
          background: primaryColor,
          left: `${p.l}%`, top: `${p.t}%`,
          opacity: 0,
          animation: `maintFloatUp ${p.dur}s ${p.del}s ease-in-out infinite`,
          pointerEvents: "none",
          zIndex: 1,
        }} />
      ))}

      {/* Ghost watermark */}
      <Box aria-hidden sx={{
        position: "absolute",
        bottom: "-8%", right: "-1%",
        fontSize: { xs: "28vw", md: "22vw" },
        fontWeight: 900, lineHeight: 1, letterSpacing: "-0.04em",
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(251,134,30,0.05)",
        userSelect: "none", pointerEvents: "none", zIndex: 1,
      }}>
        S&amp;S
      </Box>

      {/* ── Dialog content ── */}
      <DialogContent
        sx={{
          position: "relative",
        my:5,
        py:5,
        zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          "&.MuiDialogContent-root": { p: 0 },
          overflow: "",
        }}
      >
        {/* Inner dialog card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 800, margin: "0 auto", padding: "0 16px" }}
        >
          <Box sx={{
            width: "100%",
            borderRadius: { xs: "20px", sm: "24px" },
            background: "rgba(16,24,40,0.78)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(251,134,30,0.18)",
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.04),
              0 32px 80px rgba(0,0,0,0.55),
              0 0 60px rgba(251,134,30,0.08)
            `,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* ── Title bar ── */}
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2.5, sm: 4 },
              py: 2,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}>
              <Box
                component={Link}
                href="/home"
                sx={{
                  display: "flex", alignItems: "center", gap: 1.5,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.75 },
                }}
              >
                <Image
                  src="/logo.png"
                  alt={COMPANY_NAME}
                  width={34} height={34}
                  priority
                  style={{ objectFit: "contain" }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "0.01em" }}>
                  {COMPANY_NAME}
                </Typography>
              </Box>

              {/* Decorative traffic-light dots */}
              <Box sx={{ display: "flex", gap: 0.8 }}>
                {["rgba(255,95,87,0.7)", "rgba(255,189,46,0.7)", "rgba(39,201,63,0.7)"].map((c) => (
                  <Box key={c} sx={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
                ))}
              </Box>
            </Box>

            {/* ── Body ── */}
            <Box sx={{
              px: { xs: 2.5, sm: 5 },
              pt: { xs: 3.5, sm: 4.5 },
              pb: { xs: 3, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}>

              {/* Status badge */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  px: 2, py: 0.7,
                  borderRadius: "100px",
                  background: "rgba(251,134,30,0.1)",
                  border: "1px solid rgba(251,134,30,0.28)",
                  mb: 3,
                }}>
                  <Box sx={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: primaryColor,
                    animation: "maintPulse 2s ease-in-out infinite",
                  }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: primaryColor, letterSpacing: "0.13em", textTransform: "uppercase" }}>
                    Scheduled Maintenance
                  </Typography>
                </Box>
              </motion.div>

              {/* Heading */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
                <Typography
                  component="h1"
                  id="maintenance-title"
                  sx={{
                    fontSize: { xs: "1.9rem", sm: "2.6rem", md: "3rem" },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  We&apos;re{" "}
                  <Box component="span" sx={{
                    backgroundImage: primaryGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Upgrading
                  </Box>{" "}
                  Our Platform
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
                <Typography sx={{
                  fontSize: { xs: 14, sm: 15 },
                  color: textGrayLight,
                  lineHeight: 1.75,
                  maxWidth: 480,
                  mx: "auto",
                  mb: 4,
                }}>
                  {COMPANY_NAME} is currently undergoing scheduled maintenance to deliver
                  a better experience. We&apos;ll be back online very shortly — thank you
                  for your patience.
                </Typography>
              </motion.div>

              {/* Progress bar */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }} style={{ width: "100%", maxWidth: 440 }}>
                <Box sx={{ width: "100%", maxWidth: 440, mx: "auto", mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography sx={{ fontSize: 11, color: textGrayLight, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                      Maintenance Progress
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: primaryColor, fontWeight: 700 }}>85%</Typography>
                  </Box>
                  <Box sx={{ height: 5, borderRadius: "100px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.6, delay: 0.75, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        borderRadius: "100px",
                        background: "linear-gradient(90deg, rgb(251,134,30), rgb(255,184,116))",
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>

              <Divider sx={{ width: "100%", borderColor: "rgba(255,255,255,0.06)", mb: 4 }} />

             
            </Box>

            {/* ── Footer / actions ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <Box sx={{
                px: { xs: 2.5, sm: 5 },
                py: { xs: 2.5, sm: 3 },
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}>
                <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.22)", letterSpacing: "0.04em" }}>
                  © {new Date().getFullYear()} {COMPANY_NAME}
                </Typography>

                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                  <Box
                    component="a"
                    href={`mailto:${CONTACT_EMAIL}`}
                    sx={{
                      display: "inline-flex", alignItems: "center", gap: 0.75,
                      px: 2.5, py: 1,
                      borderRadius: "9px",
                      border: "1.5px solid rgba(251,134,30,0.3)",
                      color: textGrayLight,
                      fontWeight: 600, fontSize: 13,
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      "&:hover": { border: `1.5px solid ${primaryColor}`, color: "#fff", background: "rgba(251,134,30,0.08)" },
                    }}
                  >
                    <EmailRoundedIcon sx={{ fontSize: 15 }} />
                    Contact Us
                  </Box>

                 
                </Box>
              </Box>
            </motion.div>

          </Box>
        </motion.div>
      </DialogContent>

      <style>{`
        @keyframes maintFloatUp {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: 0.55; }
          80%  { opacity: 0.25; }
          100% { opacity: 0; transform: translateY(-80px) scale(0.5); }
        }
        @keyframes maintPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }
      `}</style>
    </Dialog>
  );
}
