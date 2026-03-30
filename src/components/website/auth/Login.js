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
          {/* Left — visual (50% desktop, top band mobile) */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "50%" },
              // `fill` Image needs explicit height — `auto` collapses when children are all absolute
              minHeight: { xs: "clamp(300px, 56vh, 520px)", sm: 360, md: "100vh" },
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/auth/login2.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: {
                  xs: "linear-gradient(120deg, rgba(8,12,20,0.78) 0%, rgba(8,12,20,0.5) 50%, rgba(8,12,20,0.38) 100%)",
                  md: "linear-gradient(105deg, rgba(8,12,20,0.88) 0%, rgba(8,12,20,0.55) 42%, rgba(8,12,20,0.35) 100%)",
                },
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: { xs: "flex-start", md: "space-between" },
                alignItems: "flex-start",
                textAlign: "left",
                gap: { xs: 1.75, sm: 2.25, md: 0 },
                pl: { xs: 1.75, sm: 2.75, md: 3.25, lg: 4, xl: 5 },
                pr: { xs: 1.75, sm: 2.25, md: 4 },
                pt: { xs: 2.25, sm: 3.25, md: 4.5 },
                pb: { xs: 2.25, sm: 2.75, md: 4 },
                pointerEvents: "none",
                maxWidth: "100%",
              }}
            >
              {/* Top — brand strip, flush left */}
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: { xs: 10, sm: 12 },
                    fontWeight: 800,
                    letterSpacing: { xs: "0.2em", sm: "0.26em" },
                    color: primaryColor,
                    textTransform: "uppercase",
                  }}
                >
                  S&amp;S Associates
                </Typography>
                <Typography
                  sx={{
                    mt: { xs: 0.5, sm: 0.75 },
                    fontSize: { xs: 11, sm: 13 },
                    fontWeight: 600,
                    color: whiteColor,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Admin workspace · Secure access
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: { xs: 11, sm: 12 },
                    fontWeight: 600,
                    color: whiteColor,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  Secure login
                </Typography>
                <Box
                  sx={{
                    mt: { xs: 1.25, sm: 2 },
                    height: { xs: 3, md: 4 },
                    width: { xs: 36, sm: 44, md: 60 },
                    borderRadius: 1,
                    background: `linear-gradient(90deg, ${primaryColor}, rgba(251,134,30,0.25))`,
                  }}
                />
              </Box>

              {/* Center — headline + narrative */}
              <Box
                sx={{
                  flex: { xs: "0 0 auto", md: 1 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  py: { xs: 0, sm: 1, md: 3 },
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 560, md: 540 },
                }}
              >
                <Typography
                  sx={{
                    color: whiteColor,
                    fontWeight: 800,
                    fontSize: { xs: 22, sm: 30, md: 36, lg: 38 },
                    lineHeight: { xs: 1.14, md: 1.12 },
                    letterSpacing: "-0.03em",
                    textShadow: "0 4px 32px rgba(0,0,0,0.45)",
                  }}
                >
                  Build with clarity.
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      color: whiteColor,
                      mt: { xs: 0.5, sm: 0.75 },
                    }}
                  >
                    Deliver with confidence.
                  </Box>
                </Typography>

                {/* Mobile: one short line */}
                <Typography
                  sx={{
                    mt: { xs: 1.35, sm: 2 },
                    color: whiteColor,
                    fontSize: { xs: 13, sm: 15 },
                    lineHeight: 1.55,
                    fontWeight: 500,
                    display: { xs: "block", sm: "none" },
                  }}
                >
                  Sign in to manage projects, services &amp; site content.
                </Typography>

                {/* Desktop / large: extra depth */}
                <Typography
                  sx={{
                    mt: { xs: 0, sm: 2, md: 2.25 },
                    color: whiteColor,
                    fontSize: { xs: 14, md: 15 },
                    lineHeight: 1.65,
                    fontWeight: 400,
                    display: { xs: "none", lg: "block" },
                    maxWidth: 520,
                    borderLeft: `3px solid ${primaryColor}`,
                    pl: { xs: 2, md: 2.25 },
                    py: 0.5,
                  }}
                >
                  Coordinate categories, media uploads, and client-facing pages from one authenticated environment — built
                  for repeatability, auditability, and fast handovers across Lahore and Pakistan-wide projects.
                </Typography>
              </Box>

              {/* Bottom — capability list (all items on every breakpoint) */}
              <Box sx={{ width: "100%", maxWidth: 500 }}>
                <Typography
                  sx={{
                    fontSize: { xs: 10, sm: 11 },
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: whiteColor,
                    textTransform: "uppercase",
                    mb: { xs: 1, sm: 1.5 },
                  }}
                >
                  Inside the dashboard
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.85, sm: 1.25 } }}>
                  {[
                    { Icon: FiLayers, text: "Portfolio & project lifecycle — grey structure to delivery" },
                    {
                      Icon: FiTrendingUp,
                      text: "Services, FAQs & testimonials aligned with your live site",
                    },
                    { Icon: FiShield, text: "Secure admin access — no public indexing of this area" },
                  ].map(({ Icon, text }) => (
                    <Box
                      key={text}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.25,
                        color: whiteColor,
                      }}
                    >
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: { xs: 26, sm: 30 },
                          height: { xs: 26, sm: 30 },
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "rgba(251,134,30,0.18)",
                          border: "1px solid rgba(251,134,30,0.35)",
                          color: primaryColor,
                          mt: 0.1,
                        }}
                      >
                        <Icon size={16} strokeWidth={2.2} />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, sm: 14 },
                          lineHeight: 1.5,
                          fontWeight: 500,
                          color: "inherit",
                        }}
                      >
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    mt: { xs: 1.25, sm: 2 },
                    pt: { xs: 1.25, sm: 2 },
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: whiteColor,
                  }}
                >
                  <FiCheck size={14} color="rgba(251,134,30,0.95)" style={{ flexShrink: 0 }} />
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 12 },
                      fontWeight: 600,
                      letterSpacing: { xs: "0.02em", sm: "0.04em" },
                      color: "inherit",
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                      Pakistan · Construction
                    </Box>
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                      Pakistan · Construction · Engineering
                    </Box>
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
