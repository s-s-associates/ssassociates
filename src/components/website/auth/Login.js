"use client";

import { grayColor, primaryColor, primaryHover, secondaryDark, whiteColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { FiCheck, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { setAuth } from "@/lib/auth-storage";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Valid email required").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "At least 6 characters"),
});

const authCardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const authItemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: INPUT_BG,
    borderRadius: 2,
    fontSize: { xs: 15, sm: 16 },
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
  "& .MuiOutlinedInput-input": {
    py: { xs: 1, sm: 1.125 },
  },
};

const initialLogin = { email: "", password: "", rememberMe: true };

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Login failed",
          confirmButtonColor: primaryColor,
        });
        setLoading(false);
        return;
      }
      setAuth(data.user, data.token);
      await Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Redirecting...",
        confirmButtonColor: primaryColor,
      });
      router.push("/user/dashboard");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong",
        confirmButtonColor: primaryColor,
      });
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialLogin} validationSchema={loginSchema} onSubmit={handleLogin}>
      {(formik) => (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            // minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            bgcolor: "#f8fafc",
          }}
        >
          {/* Left — visual panel */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "50%" },
              minHeight: { xs: "clamp(320px, 58vh, 540px)", sm: 380, md: "100vh" },
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {/* Background image */}
            <Image
              src="/images/auth/login2.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />

            {/* Multi-layer overlay: dark base + warm orange glow from bottom */}
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(5,7,12,0.92) 0%, rgba(10,14,22,0.75) 45%, rgba(20,14,8,0.60) 100%)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 20% 110%, rgba(251,134,30,0.28) 0%, transparent 65%)", pointerEvents: "none" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 90% -10%, rgba(251,134,30,0.10) 0%, transparent 60%)", pointerEvents: "none" }} />

            {/* Subtle grid pattern */}
            <Box sx={{
              position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

            {/* Content */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: { xs: "flex-start", md: "space-between" },
                alignItems: "flex-start",
                pl: { xs: 2.5, sm: 3.5, md: 4, lg: 5 },
                pr: { xs: 2.5, sm: 3, md: 4 },
                pt: { xs: 3, sm: 4, md: 5 },
                pb: { xs: 3, sm: 3.5, md: 5 },
                gap: { xs: 2.5, sm: 3, md: 0 },
              }}
            >
              {/* ── TOP: Logo + brand ── */}
              <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 1.5, md: 2 } }}>
                  {/* Logo badge */}
                  <Box sx={{
                    width: { xs: 40, sm: 46 }, height: { xs: 40, sm: 46 },
                    borderRadius: "12px",
                    bgcolor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    backdropFilter: "blur(8px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}>
                    <Image src="/logo.png" alt="S&S Associates" width={30} height={30}
                      style={{ objectFit: "contain", width: "75%", height: "75%" }} />
                  </Box>
                  {/* Brand text */}
                  <Box>
                    <Typography sx={{
                      fontSize: { xs: 13, sm: 15 }, fontWeight: 800,
                      letterSpacing: "0.06em", color: whiteColor,
                      textTransform: "uppercase", lineHeight: 1.2,
                    }}>
                      S&amp;S Associates
                    </Typography>
                    <Typography sx={{
                      fontSize: { xs: 10, sm: 11 }, fontWeight: 600,
                      letterSpacing: "0.14em", color: primaryColor,
                      textTransform: "uppercase", mt: 0.25,
                    }}>
                      Admin Workspace
                    </Typography>
                  </Box>
                </Box>
                {/* Accent divider */}
                <Box sx={{
                  height: 3, width: { xs: 48, sm: 64 }, borderRadius: 2,
                  background: `linear-gradient(90deg, ${primaryColor}, rgba(251,134,30,0.2))`,
                }} />
              </Box>

              {/* ── MIDDLE: Headline ── */}
              <Box sx={{
                flex: { xs: "0 0 auto", md: 1 },
                display: "flex", flexDirection: "column", justifyContent: "center",
                py: { xs: 0, md: 3 },
                width: "100%", maxWidth: 520,
              }}>
                {/* Eyebrow badge */}
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 0.75,
                  bgcolor: "rgba(251,134,30,0.15)",
                  border: "1px solid rgba(251,134,30,0.3)",
                  borderRadius: "50px",
                  px: 1.5, py: 0.5, mb: { xs: 2, md: 2.5 },
                  backdropFilter: "blur(6px)",
                  width: "fit-content",
                }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: primaryColor, flexShrink: 0,
                    boxShadow: `0 0 8px ${primaryColor}`, animation: "pulse 2s infinite",
                    "@keyframes pulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
                  }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: primaryColor, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Secure Access Portal
                  </Typography>
                </Box>

                <Typography sx={{
                  color: whiteColor, fontWeight: 800,
                  fontSize: { xs: 24, sm: 32, md: 38, lg: 42 },
                  lineHeight: 1.1, letterSpacing: "-0.03em",
                  textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                }}>
                  Build with{" "}
                  <Box component="span" sx={{
                    color: primaryColor,
                    textShadow: `0 0 40px rgba(251,134,30,0.5)`,
                  }}>
                    clarity.
                  </Box>
                  <Box component="span" sx={{ display: "block", mt: { xs: 0.5, md: 0.75 } }}>
                    Deliver with confidence.
                  </Box>
                </Typography>

                <Typography sx={{
                  mt: { xs: 1.5, md: 2.25 },
                  color: "rgba(255,255,255,0.65)",
                  fontSize: { xs: 13, sm: 15 }, lineHeight: 1.7, fontWeight: 400,
                  display: { xs: "none", sm: "block" },
                  maxWidth: 440,
                }}>
                  Coordinate projects, media, and client-facing content from one
                  authenticated environment — built for repeatability and fast delivery.
                </Typography>

                {/* Mobile short desc */}
                <Typography sx={{
                  mt: 1.25, color: "rgba(255,255,255,0.65)",
                  fontSize: 13, lineHeight: 1.6,
                  display: { xs: "block", sm: "none" },
                }}>
                  Sign in to manage projects, services &amp; site content.
                </Typography>
              </Box>

              {/* ── BOTTOM: Feature cards + footer tag ── */}
              <Box sx={{ width: "100%", maxWidth: 500 }}>
                {/* Feature list */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 1.25 }, mb: { xs: 2, sm: 2.5 } }}>
                  {[
                    { Icon: FiLayers, label: "Portfolio & project lifecycle", sub: "Grey structure to delivery" },
                    { Icon: FiTrendingUp, label: "Services, FAQs & testimonials", sub: "Aligned with your live site" },
                    { Icon: FiShield, label: "Secure admin access", sub: "No public indexing of this area" },
                  ].map(({ Icon, label, sub }) => (
                    <Box key={label} sx={{
                      display: "flex", alignItems: "center", gap: 1.5,
                      bgcolor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      px: { xs: 1.5, sm: 2 }, py: { xs: 1, sm: 1.25 },
                      backdropFilter: "blur(10px)",
                      transition: "background 0.2s",
                    }}>
                      <Box sx={{
                        flexShrink: 0, width: { xs: 32, sm: 36 }, height: { xs: 32, sm: 36 },
                        borderRadius: "10px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        bgcolor: "rgba(251,134,30,0.15)",
                        border: "1px solid rgba(251,134,30,0.3)",
                        color: primaryColor,
                      }}>
                        <Icon size={16} strokeWidth={2.2} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: { xs: 12, sm: 13 }, fontWeight: 700, color: whiteColor, lineHeight: 1.25 }}>
                          {label}
                        </Typography>
                        <Typography sx={{ fontSize: { xs: 10, sm: 11 }, color: "rgba(255,255,255,0.5)", lineHeight: 1.3, mt: 0.2 }}>
                          {sub}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Footer badge */}
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  pt: { xs: 1.5, sm: 2 }, width: "100%",
                }}>
                  <FiCheck size={14} color={primaryColor} style={{ flexShrink: 0 }} />
                  <Typography sx={{
                    fontSize: { xs: 11, sm: 12 }, fontWeight: 600,
                    color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em",
                  }}>
                    Pakistan · Construction · Engineering
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right — form (50% desktop, full width mobile) */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              minHeight: { xs: "auto", md: "100vh" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: { xs: 4, sm: 5, md: 6 },
              px: { xs: 2, sm: 4, md: 6 },
              flex: { md: 1 },
              minWidth: 0,
            }}
          >
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{
                width: "100%",
                maxWidth: 640,
              }}
            >
              <Box
                component={motion.div}
                variants={authCardVariants}
                initial="initial"
                animate="animate"
                sx={{
                  // background: "#fff",
                  borderRadius: 3,
                  // boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)",
                  p: { xs: 3, sm: 4 },
                }}
              >
                <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2 }}>
                  <Button
                    component={Link}
                    href="/"
                    startIcon={<ArrowBack />}
                    size="small"
                    sx={{
                      color: grayColor,
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: "none",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.04)", color: primaryColor },
                    }}
                  >
                    Back to home
                  </Button>
                </Box>

                <Box component={motion.div} variants={authItemVariants} sx={{ mb: 0.5 }}>
                  <Typography
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: 26, sm: 28 },
                      color: secondaryDark,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Welcome back
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "rgb(100, 116, 139)", mt: 0.75, lineHeight: 1.5 }}>
                    Enter your credentials to access the admin dashboard.
                  </Typography>
                </Box>

                <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2, mt: 3 }}>
                  <Box
                    component="label"
                    sx={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: 13,
                      color: secondaryDark,
                      mb: 0.75,
                    }}
                  >
                    Email address
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="you@company.com"
                    variant="outlined"
                    size="small"
                    sx={inputSx}
                    {...formik.getFieldProps("email")}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: { xs: 13, sm: 14 } } }}
                  />
                </Box>

                <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2 }}>
                  <Box
                    component="label"
                    sx={{
                      display: "block",
                      fontWeight: 600,
                      fontSize: { xs: 14, sm: 15 },
                      color: secondaryDark,
                      mb: 0.75,
                    }}
                  >
                    Password
                  </Box>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    variant="outlined"
                    size="medium"
                    sx={inputSx}
                    {...formik.getFieldProps("password")}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="toggle password"
                            sx={{ color: grayColor }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box
                  component={motion.div}
                  variants={authItemVariants}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 2.5,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.rememberMe}
                        onChange={(e) => formik.setFieldValue("rememberMe", e.target.checked)}
                        sx={{
                          color: secondaryDark,
                          "&.Mui-checked": { color: primaryColor },
                        }}
                      />
                    }
                    label={
                      <Typography component="span" sx={{ fontSize: 15, color: secondaryDark, fontWeight: 500 }}>
                        Remember me
                      </Typography>
                    }
                  />
                </Box>

                <Box component={motion.div} variants={authItemVariants}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      bgcolor: primaryColor,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: { xs: 16, sm: 17 },
                      py: { xs: 1.4, sm: 1.5 },
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: "0 8px 20px rgba(251, 134, 30, 0.35)",
                      "&:hover": { bgcolor: primaryHover },
                    }}
                  >
                    {loading ? <BeatLoader color="#fff" size={10} /> : "Sign in"}
                  </Button>
                </Box>

                <Typography
                  sx={{
                    mt: 3,
                    fontSize: { xs: 13, sm: 13 },
                    color: "rgb(148, 163, 184)",
                    textAlign: "center",
                    lineHeight: 1.55,
                  }}
                >
                  Secure connection · For authorized use only
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
}

export default Login;
