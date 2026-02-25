"use client";

import { primaryColor, grayColor } from "@/components/utils/Colors";
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
import Image from "next/image";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const INPUT_BG = "rgba(236, 236, 237, 1)";

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string().email("Valid email required").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  teamSchoolName: Yup.string().trim().required("Team/School name is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const authCardVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.04, delayChildren: 0.08 },
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

const initialSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  teamSchoolName: "",
  terms: false,
};

function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          teamSchoolName: values.teamSchoolName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        await Swal.fire({ icon: "error", title: "Error", text: data.message || "Sign up failed" });
        setLoading(false);
        return;
      }
      await Swal.fire({ icon: "success", title: "Check your email", text: data.message });
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}&type=signup`);
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialSignUp}
      validationSchema={signUpSchema}
      onSubmit={handleSignUp}
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
            mb: 3,
          }}
        >
          Create Your Account
        </Box>

        <Box component={motion.div} variants={authItemVariants} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
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
              First Name
            </Box>
            <TextField
              fullWidth
              placeholder="eg: John"
              variant="outlined"
              size="small"
              sx={inputSx}
              {...formik.getFieldProps("firstName")}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
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
              Last Name
            </Box>
            <TextField
              fullWidth
              placeholder="eg: Snow"
              variant="outlined"
              size="small"
              sx={inputSx}
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
            />
          </Box>
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

        <Box component={motion.div} variants={authItemVariants} sx={{ mb: 1 }}>
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
            Password
          </Box>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="eg: #PASSWORD"
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
          {/* <Box sx={{ fontSize: 13, color: "#dc2626", mt: 0.5, fontWeight: 500 }}>
            At Least 8 Characters
          </Box> */}
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
            Team/School Name
          </Box>
          <TextField
            fullWidth
            placeholder="eg: #TEAM1234"
            variant="outlined"
            size="small"
            sx={inputSx}
            {...formik.getFieldProps("teamSchoolName")}
            error={formik.touched.teamSchoolName && Boolean(formik.errors.teamSchoolName)}
            helperText={formik.touched.teamSchoolName && formik.errors.teamSchoolName}
            FormHelperTextProps={{ sx: { color: "#dc2626", fontSize: 13 } }}
          />
        </Box>

        <Box component={motion.div} variants={authItemVariants}>
          <FormControlLabel
            control={
            <Checkbox
              checked={formik.values.terms}
              onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
              sx={{
                color: grayColor,
                "&.Mui-checked": { color: primaryColor },
              }}
            />
          }
          label={
            <Box sx={{ fontSize: 14, color: grayColor }}>
              By creating an account, you agree to our{" "}
              <Box
                component={Link}
                href="/terms"
                sx={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  "&:hover": { color: "#1d4ed8" },
                }}
              >
                Terms and Privacy
              </Box>{" "}
              and{" "}
              <Box
                component={Link}
                href="/privacy"
                sx={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  "&:hover": { color: "#1d4ed8" },
                }}
              >
                Privacy Policy
              </Box>
            </Box>
          }
          sx={{ mb: 0.5, alignItems: "flex-start" }}
        />
        {formik.touched.terms && formik.errors.terms && (
          <Box sx={{ fontSize: 13, color: "#dc2626", mb: 2 }}>{formik.errors.terms}</Box>
        )}
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
            "&:hover": { bgcolor: "#7A2FE5" },
          }}
          >
            {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
          </Button>
        </Box>

        <Box component={motion.div} variants={authItemVariants}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
            <Image src="/images/google.png" alt="Google" width={20} height={20} />
          }
          sx={{
            mt: 2,
            borderColor: INPUT_BG,
            bgcolor: "#fff",
            color: grayColor,
            fontWeight: 600,
            fontSize: 16,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              borderColor: "rgba(0,0,0,0.2)",
              bgcolor: "rgba(236, 236, 237, 0.5)",
            },
          }}
          >
            Continue with Google
          </Button>
        </Box>

        <Box
          component={motion.div}
          variants={authItemVariants}
          sx={{ textAlign: "center", mt: 3, fontSize: 14, color: grayColor }}
        >
          Already have an account{" "}
          <Box
            component={Link}
            href="/login"
            sx={{
              color: primaryColor,
              fontWeight: 600,
              textDecoration: "underline",
              "&:hover": { color: "#7A2FE5" },
            }}
          >
            Log In
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
      )}
    </Formik>
  );
}

export default SignUp;
