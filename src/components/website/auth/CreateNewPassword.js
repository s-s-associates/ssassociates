"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { FiArrowLeft } from "react-icons/fi";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RESET_TOKEN_KEY = "resetToken";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const createPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const authCardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
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

const initialValues = { password: "", confirmPassword: "" };

function CreateNewPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const resetToken = typeof window !== "undefined" ? sessionStorage.getItem(RESET_TOKEN_KEY) : null;
    if (!resetToken) {
      await Swal.fire({ icon: "error", title: "Error", text: "Session expired. Please request a new reset link." });
      router.push("/forgot-password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword: values.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Reset failed" });
        setLoading(false);
        return;
      }
      if (typeof window !== "undefined") sessionStorage.removeItem(RESET_TOKEN_KEY);
      await Swal.fire({ icon: "success", title: "Password updated", text: data.message });
      router.push("/login");
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createPasswordSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          sx={{
            maxWidth: 700,
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
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                p: 4,
              }}
            >
              <Box
                component={motion.div}
                variants={authItemVariants}
                sx={{
                  fontWeight: 700,
                  fontSize: 28,
                  color: grayColor,
                  mb: 1,
                }}
              >
                Create New Password
              </Box>
              <Box
                component={motion.div}
                variants={authItemVariants}
                sx={{
                  fontSize: 14,
                  color: "rgba(21, 21, 29, 0.7)",
                  mb: 3,
                }}
              >
                Your new password must be different from previously used passwords.
              </Box>

              <Box component={motion.div} variants={authItemVariants} sx={{ mb: 2 }}>
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 14,
                    color: grayColor,
                    mb: 1,
                  }}
                >
                  New Password
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

              <Box component={motion.div} variants={authItemVariants} sx={{ mb: 3 }}>
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 14,
                    color: grayColor,
                    mb: 1,
                  }}
                >
                  Confirm Password
                </Box>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="eg: **********"
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  {...formik.getFieldProps("confirmPassword")}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label="toggle confirm password"
                          sx={{ color: grayColor }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                    mb: 2,
                    "&:hover": { bgcolor: "#7A2FE5" },
                  }}
                >
                  {loading ? <BeatLoader color="#fff" size={10} /> : "Reset Password"}
                </Button>
              </Box>

              <Box component={motion.div} variants={authItemVariants}>
                <Button
                  fullWidth
                  component={Link}
                  href="/login"
                  variant="outlined"
                  startIcon={<FiArrowLeft size={18} />}
                  sx={{
                    borderColor: "transparent",
                    bgcolor: INPUT_BG,
                    color: grayColor,
                    fontWeight: 600,
                    fontSize: 16,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "rgba(220, 220, 221, 1)",
                      borderColor: "transparent",
                    },
                  }}
                >
                  Back To Login
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
}

export default CreateNewPassword;
