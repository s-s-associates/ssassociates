"use client";

import {
  primaryColor,
  primaryHover,
  secondaryDark,
  whiteColor,
} from "@/components/utils/Colors";
import SendIcon from "@mui/icons-material/Send";
import { Box, CircularProgress, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

const API_URL = "/api/subscribers";

/**
 * Newsletter signup — same visual design as the footer block.
 * POSTs { email } to /api/subscribers.
 */
export default function SubscriberForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageTone, setMessageTone] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setMessageTone("error");
      setMessage("Please enter your email address.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (data.success) {
        setMessageTone("success");
        setMessage(data.message || "Thank you for subscribing.");
        setEmail("");
      } else if (data.alreadySubscribed) {
        setMessageTone("error");
        setMessage(data.message || "This email is already subscribed.");
      } else {
        setMessageTone("error");
        setMessage(data.message || "Could not subscribe. Please try again.");
      }
    } catch {
      setMessageTone("error");
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      mt={1}
    >
      <Typography
        sx={{
          fontFamily: "var(--font-app)",
          fontWeight: 600,
          fontSize: 18,
          color: whiteColor,
          mb: 1,
        }}
      >
        Subscribe to Newsletter
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
        }}
      >
        <TextField
          type="email"
          name="newsletter-email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loading}
          size="small"
          sx={{
            flex: 1,
            minWidth: 0,
            "& .MuiOutlinedInput-root": {
              fontFamily: "var(--font-app)",
              fontSize: 14,
              bgcolor: "rgba(255,255,255,0.06)",
              color: whiteColor,
              borderRadius: 1,
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "rgba(251, 134, 30, 0.55)" },
              "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 1 },
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "rgba(255,255,255,0.45)",
              opacity: 1,
            },
          }}
        />
        <Tooltip title="Subscribe To Our Newsletter" arrow placement="top">
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              type="submit"
              disabled={loading}
              aria-label="Subscribe To Our Newsletter"
              sx={{
                flexShrink: 0,
                width: 35,
                height: 35,
                p: 0,
                bgcolor: primaryColor,
                color: secondaryDark,
                borderRadius: 1,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: primaryHover,
                  boxShadow: "0 4px 16px rgba(251, 134, 30, 0.35)",
                },
                "&:disabled": {
                  bgcolor: "rgba(251, 134, 30, 0.5)",
                  color: "rgba(8, 12, 20, 0.5)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} thickness={4} sx={{ color: secondaryDark }} />
              ) : (
                <SendIcon sx={{ fontSize: 22 }} />
              )}
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
      {message ? (
        <Typography
          role="status"
          sx={{
            mt: 1.25,
            fontSize: 13,
            lineHeight: 1.5,
            color:
              messageTone === "success"
                ? "rgba(255, 184, 116, 0.95)"
                : "rgba(255, 160, 140, 0.95)",
          }}
        >
          {message}
        </Typography>
      ) : null}
    </Box>
  );
}
