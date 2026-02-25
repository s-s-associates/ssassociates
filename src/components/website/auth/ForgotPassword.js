"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { FiArrowLeft } from "react-icons/fi";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Valid email required").required("Email is required"),
});

const authCardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.06, delayChildren: 0.08 },
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

const initialForgot = { email: "" };

function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Request failed" });
        setLoading(false);
        return;
      }
      await Swal.fire({ icon: "success", title: "Check your email", text: data.message });
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&type=reset`);
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialForgot}
      validationSchema={forgotPasswordSchema}
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
          Forgot Password
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
          Enter your email and we&apos;ll send you a reset link
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
            {loading ? <BeatLoader color="#fff" size={10} /> : "Send Reset Link"}
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

export default ForgotPassword;
