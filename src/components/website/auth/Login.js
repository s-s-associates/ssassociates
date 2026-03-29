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
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
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
              minHeight: { xs: 240, sm: 300, md: "100vh" },
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/auth/login.jpg"
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
                background:
                  "linear-gradient(165deg, rgba(8,12,20,0.15) 0%, rgba(8,12,20,0.45) 55%, rgba(8,12,20,0.75) 100%)",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: { xs: 3, sm: 4, md: 5 },
                pointerEvents: "none",
              }}
            >
              <Typography
                sx={{
                  color: whiteColor,
                  fontWeight: 800,
                  fontSize: { xs: 22, sm: 26, md: 30 },
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.35)",
                }}
              >
                Build with clarity.
                <Box component="span" sx={{ display: "block", color: primaryColor, mt: 0.5 }}>
                  Deliver with confidence.
                </Box>
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  color: "rgba(255,255,255,0.88)",
                  fontSize: { xs: 13, sm: 14 },
                  maxWidth: 520,
                  lineHeight: 1.55,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Sign in to manage projects, services, and your workspace.
              </Typography>
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
                    FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
                  />
                </Box>

                <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2 }}>
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
                    Password
                  </Box>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    variant="outlined"
                    size="small"
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
                      <Typography component="span" sx={{ fontSize: 14, color: secondaryDark, fontWeight: 500 }}>
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
                      fontSize: 16,
                      py: 1.35,
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
                    fontSize: 12,
                    color: "rgb(148, 163, 184)",
                    textAlign: "center",
                    lineHeight: 1.5,
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
