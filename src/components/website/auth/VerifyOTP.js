"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { setAuth } from "@/lib/auth-storage";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { FiArrowLeft } from "react-icons/fi";

const RESET_TOKEN_KEY = "resetToken";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const verifyOTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{4,6}$/, "Enter a valid 4–6 digit OTP"),
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

const initialVerify = { otp: "" };

function VerifyOTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signup";
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async (values) => {
    if (!email) {
      Swal.fire({ icon: "error", title: "Error", text: "Missing email. Please use the link from your email." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: values.otp, type }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Verification failed" });
        setLoading(false);
        return;
      }
      if (type === "reset") {
        if (typeof window !== "undefined" && data.resetToken) {
          sessionStorage.setItem(RESET_TOKEN_KEY, data.resetToken);
        }
        await Swal.fire({ icon: "success", title: "Verified", text: "You can now set a new password." });
        router.push("/create-new-password");
      } else {
        setAuth(data.user, data.token);
        await Swal.fire({ icon: "success", title: "Email verified!", text: "Redirecting..." });
        router.push("/user/dashboard");
      }
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      Swal.fire({ icon: "warning", title: "Warning", text: "No email found. Please start from sign up or forgot password." });
      return;
    }
    setResendLoading(true);
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Resend failed" });
      } else {
        await Swal.fire({ icon: "success", title: "Sent", text: data.message });
      }
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
    }
    setResendLoading(false);
  };

  return (
    <Formik
      initialValues={initialVerify}
      validationSchema={verifyOTPSchema}
      onSubmit={handleVerify}
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
                Verify OTP
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
                Enter the code we sent to your email
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
                  OTP Code
                </Box>
                <TextField
                  fullWidth
                  placeholder="eg: 123456"
                  variant="outlined"
                  size="small"
                  sx={inputSx}
                  {...formik.getFieldProps("otp")}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
                  inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
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
                  {loading ? <BeatLoader color="#fff" size={10} /> : "Verify"}
                </Button>
              </Box>

              <Box
                component={motion.div}
                variants={authItemVariants}
                sx={{ textAlign: "center", fontSize: 14, color: grayColor }}
              >
                Didn&apos;t receive the code?{" "}
                <Box
                  component="button"
                  type="button"
                  disabled={resendLoading}
                  onClick={handleResend}
                  sx={{
                    color: primaryColor,
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: resendLoading ? "wait" : "pointer",
                    padding: 0,
                    font: "inherit",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {resendLoading ? "Sending..." : "Resend"}
                </Box>
              </Box>

              <Box component={motion.div} variants={authItemVariants} sx={{ mt: 2 }}>
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

export default VerifyOTP;
