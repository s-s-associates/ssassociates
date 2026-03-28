"use client";

import {
  primaryColor,
  primaryLight,
  secondaryDark,
  whiteColor,
} from "@/components/utils/Colors";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

function initialsFromTitle(title) {
  const t = String(title || "").trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

const cardSx = {
  flexShrink: 0,
  // width: { xs: 260, sm: 280 },
  background:
    "linear-gradient(145deg, rgba(18, 22, 32, 0.96) 0%, rgba(12, 16, 24, 0.98) 50%, rgba(22, 18, 14, 0.94) 100%)",
  borderRadius: 3,
  border: "1px solid rgba(255, 255, 255, 0.12)",
  overflow: "hidden",
  boxShadow: "0 14px 40px rgba(0, 0, 0, 0.45)",
  transition: "box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease",
  "&:hover": {
    borderColor: "rgba(251, 134, 30, 0.45)",
    boxShadow: "0 22px 50px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(251, 134, 30, 0.12)",
    transform: "translateY(-6px)",
  },
};

const logoWellSx = {
  position: "relative",
  width: 150,
  height: { xs: 110, sm: 150 },
  mx: "auto",
  borderRadius: 2,
  bgcolor: "rgba(255, 255, 255, 0.06)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  overflow: "hidden",
};

function ClientCard({ client }) {
  const href = client.url && String(client.url).trim() ? String(client.url).trim() : null;
  const hasImage = client.imageUrl && String(client.imageUrl).trim();

  const inner = (
    <Box
      className="client-card"
      sx={{
        ...cardSx,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2.25, pb: 1.75 }}>
        <Box sx={logoWellSx}>
          {hasImage ? (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                zIndex: 0,
              }}
            >
              <Image
                src={client.imageUrl}
                alt={client.title || "Client"}
                sizes="(max-width: 600px) 220px, 260px"
                width={220}
                height={120}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 0,
                background:
                  "linear-gradient(145deg, rgba(251,134,30,0.22), rgba(255,184,116,0.1), rgba(8,12,20,0.4))",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 28,
                  color: primaryLight,
                  letterSpacing: "-0.02em",
                }}
              >
                {initialsFromTitle(client.title)}
              </Typography>
            </Box>
          )}
          {href ? (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                zIndex: 2,
                width: 30,
                height: 30,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(8, 12, 20, 0.62)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                pointerEvents: "none",
              }}
            >
              <OpenInNewRoundedIcon sx={{ fontSize: 18, color: primaryLight }} />
            </Box>
          ) : null}
        </Box>
      </Box>

      <Box
        sx={{
          px: 2.25,
          pb: 2.25,
          pt: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-app)",
            fontWeight: 700,
            fontSize: { xs: 15, sm: 16 },
            color: whiteColor,
            textAlign: "center",
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            transition: "color 0.25s ease",
            ".client-card:hover &": {
              color: primaryColor,
            },
          }}
        >
          {client.title || "Client"}
        </Typography>
        {client.description && String(client.description).trim() ? (
          <Typography
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 500,
              fontSize: 13,
              color: "rgba(255, 255, 255, 0.62)",
              textAlign: "center",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {client.description}
          </Typography>
        ) : (
          <Box sx={{ minHeight: 8 }} />
        )}
      </Box>
    </Box>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        {inner}
      </Link>
    );
  }

  return inner;
}

function OurClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError(null);
      try {
        const res = await fetch("/api/clients", { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;
        if (data.success && Array.isArray(data.clients)) {
          setClients(data.clients);
        } else {
          setError(data.message || "Could not load clients");
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load clients");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const marqueeItems = useMemo(() => {
    if (!clients.length) return [];
    return [...clients, ...clients, ...clients];
  }, [clients]);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 11 },
        overflow: "hidden",
        bgcolor: secondaryDark,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -120,
          left: -90,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.28), transparent 70%)",
          filter: "blur(2px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: -80,
          bottom: -90,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.32), rgba(255,184,116,0.12) 45%, transparent 70%)",
          filter: "blur(3px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-5%", md: "3%" },
          bottom: { xs: "5%", md: "8%" },
          width: { xs: 200, md: 260 },
          height: { xs: 200, md: 260 },
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(251,134,30,0.18), transparent 65%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 5, md: 6 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            sx={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: primaryColor,
              mb: 1.5,
            }}
          >
            Our partners
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${primaryColor}, rgba(255,184,116,0.45))`,
              mx: "auto",
              mb: 2.5,
            }}
          />
          <Box
            component="h2"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 800,
              fontSize: { xs: 30, md: 40 },
              lineHeight: 1.12,
              color: whiteColor,
              letterSpacing: "-0.02em",
              mb: 2,
            }}
          >
            Trusted by industry leaders
          </Box>
          <Typography
            component="p"
            sx={{
              fontFamily: "var(--font-app)",
              fontWeight: 400,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.65,
              color: "rgba(255, 255, 255, 0.72)",
              maxWidth: 560,
              mx: "auto",
            }}
          >
            A curated network of clients who rely on us for quality, clarity, and delivery—project after project.
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: primaryColor }} size={44} thickness={4} />
        </Box>
      ) : error ? (
        <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.55)", px: 2, position: "relative", zIndex: 1 }}>
          {error}
        </Typography>
      ) : clients.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "rgba(255,255,255,0.65)", px: 2, position: "relative", zIndex: 1 }}>
          No clients to show yet.
        </Typography>
      ) : (
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: { xs: 56, sm: 88, md: 120 },
              background: `linear-gradient(to right, ${secondaryDark}, rgba(8, 12, 20, 0))`,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              width: { xs: 56, sm: 88, md: 120 },
              background: `linear-gradient(to left, ${secondaryDark}, rgba(8, 12, 20, 0))`,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          <Box
            component={motion.div}
            sx={{
              display: "flex",
              gap: { xs: 2.5, sm: 3.5 },
              px: { xs: 2, sm: 3, md: 4 },
              width: "max-content",
            }}
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: Math.max(28, clients.length * 5),
                ease: "linear",
              },
            }}
          >
            {marqueeItems.map((client, index) => (
              <ClientCard key={`${client._id}-${index}`} client={client} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default OurClients;
