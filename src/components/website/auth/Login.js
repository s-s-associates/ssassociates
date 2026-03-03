"use client";

import { grayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
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
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Login failed" });
        setLoading(false);
        return;
      }
      setAuth(data.user, data.token);
      await Swal.fire({ icon: "success", title: "Welcome back!", text: "Redirecting..." });
      router.push("/user/dashboard");
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialLogin}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {(formik) => (
    <>
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      sx={{
        maxWidth: 700,
        // border: "1px solid #e0e0e0",
        margin: "0 auto",
        px: 2,
        py: 4,
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Box
        component={motion.div}
        variants={authCardVariants}
        initial="initial"
        animate="animate"
        sx={{
          background: "#fff",
          borderRadius: 3,
          boxShadow: "none",
          p: 4,
        }}
      >
        <Box component={motion.div} variants={authItemVariants} sx={{ mb: 3 }}>
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
        <Box
          component={motion.div}
          variants={authItemVariants}
          sx={{
            fontWeight: 700,
            fontSize: 28,
            color: "#000",
            mb: 3,
          }}
        >
          Welcome Back
        </Box>

        <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2 }}>
          <Box
            component="label"
            sx={{
              display: "block",
              fontWeight: 600,
              fontSize: 14,
              color: "#000",
              mb: 1,
            }}
          >
            Email Address
          </Box>
          <TextField
            fullWidth
            placeholder="eg: johnsnow@gmail.com"
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
              fontSize: 14,
              color: "#000",
              mb: 1,
            }}
          >
            Password
          </Box>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="eg: **********"
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
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.rememberMe}
                onChange={(e) => formik.setFieldValue("rememberMe", e.target.checked)}
                sx={{
                  color: "#000",
                  "&.Mui-checked": { color: primaryColor },
                }}
              />
            }
            label={
              <Box component="span" sx={{ fontSize: 14, color: "#000", fontWeight: 500 }}>
                Remember Me
              </Box>
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
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { bgcolor: "red" },
            }}
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Sign In"}
          </Button>
        </Box>
  </Box>
      </Box>
    </Box>
    </>
      )}
    </Formik>
  );
}

export default Login;
