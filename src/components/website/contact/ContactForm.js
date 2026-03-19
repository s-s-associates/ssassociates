"use client";

import { bggrayColor, bordergrayColor, grayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiSend } from "react-icons/fi";
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  companyName: Yup.string().trim(),
  phone: Yup.string().trim().required("Phone number is required").min(10, "Enter a valid phone number"),
  address: Yup.string().trim(),
  message: Yup.string().trim().required("Message is required"),
});

const initialValues = {
  fullName: "",
  email: "",
  companyName: "",
  phone: "",
  address: "",
  message: "",
};

const fieldHeadingSx = {
  fontSize: 14,
  fontWeight: 600,
  color: grayColor,
  mb: 1,
  display: "block",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: bggrayColor,
    "& fieldset": { borderColor: bordergrayColor },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
    "&.Mui-error fieldset": { borderColor: "#d32f2f" },
  },
  "& .MuiFormHelperText-root.Mui-error": { color: "#d32f2f" },
};

const phoneInputHeight = 56;
const phoneBorderRadius = 8;

export default function ContactForm() {
  const handleSubmit = async (values) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: (values.fullName || "").trim(),
          email: (values.email || "").trim(),
          companyName: (values.companyName || "").trim(),
          phone: values.phone ? `+${values.phone}` : "",
          address: (values.address || "").trim(),
          message: (values.message || "").trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Message sent",
          text: "We'll get back to you within 24 hours.",
          confirmButtonColor: primaryColor,
        });
        return true;
      }
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "Failed to send message.",
        confirmButtonColor: primaryColor,
      });
      return false;
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong.",
        confirmButtonColor: primaryColor,
      });
      return false;
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        bgcolor: bggrayColor,
        minHeight: "60vh",
      }}
    >
      
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 28, md: 34 },
            fontWeight: 700,
            color: grayColor,
            textAlign: "center",
            mb: 1,
          }}
        >
          Send Us a Message
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            color: grayColor,
            opacity: 0.8,
            textAlign: "center",
            mb: 4,
          }}
        >
          Fill out the form below and we&apos;ll get back to you within 24 hours
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={contactSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const success = await handleSubmit(values);
            setSubmitting(false);
            if (success) resetForm({ values: initialValues });
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, setFieldTouched }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: `1px solid ${bordergrayColor}`,
                p: { xs: 2, sm: 3 },
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2 }}>
                <Box>
                  <Typography component="span" sx={fieldHeadingSx}>Full Name <Box component="span" sx={{ color: "#d32f2f" }}>*</Box></Typography>
                  <TextField
                    fullWidth
                    placeholder="John Doe"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    InputLabelProps={{ shrink: false }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography component="span" sx={fieldHeadingSx}>Email Address <Box component="span" sx={{ color: "#d32f2f" }}>*</Box></Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="john@example.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    InputLabelProps={{ shrink: false }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography component="span" sx={fieldHeadingSx}>Company Name (optional)</Typography>
                  <TextField
                    fullWidth
                    placeholder="Your Company"
                    name="companyName"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: false }}
                    sx={inputSx}
                  />
                </Box>
                <Box>
                  <Typography component="span" sx={fieldHeadingSx}>
                    Phone Number <Box component="span" sx={{ color: "#d32f2f" }}>*</Box>
                  </Typography>
                  <PhoneInput
                    country="us"
                    value={values.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                    onBlur={() => setFieldTouched("phone", true)}
                    containerClass="react-tel-input"
                    inputClass="contact-phone-input"
                    containerStyle={{ width: "100%" }}
                    inputStyle={{
                      width: "100%",
                      height: phoneInputHeight,
                      borderRadius: phoneBorderRadius,
                      border: `1px solid ${touched.phone && errors.phone ? "#d32f2f" : bordergrayColor}`,
                      backgroundColor: bggrayColor,
                      fontSize: 16,
                      paddingLeft: 48,
                    }}
                    buttonStyle={{
                      height: phoneInputHeight,
                      borderRadius: `${phoneBorderRadius}px 0 0 ${phoneBorderRadius}px`,
                      backgroundColor: bggrayColor,
                      border: `1px solid ${touched.phone && errors.phone ? "#d32f2f" : bordergrayColor}`,
                      borderRight: "none",
                    }}
                    dropdownStyle={{ borderRadius: phoneBorderRadius }}
                  />
                  {touched.phone && errors.phone && (
                    <Typography sx={{ fontSize: 12, color: "#d32f2f", mt: 0.5, ml: 1.5 }}>
                      {errors.phone}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography component="span" sx={fieldHeadingSx}>Address (optional)</Typography>
                <TextField
                  fullWidth
                  placeholder="123 Main Street, City, State"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{ shrink: false }}
                  sx={inputSx}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography component="span" sx={fieldHeadingSx}>Message <Box component="span" sx={{ color: "#d32f2f" }}>*</Box></Typography>
                <TextField
                  fullWidth
                  placeholder="Tell us about your project..."
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                  InputLabelProps={{ shrink: false }}
                  multiline
                  rows={4}
                  sx={inputSx}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting ? null : <FiSend size={20} />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: primaryColor,
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: primaryHover,
                    boxShadow: "none",
                  },
                }}
              >
                {isSubmitting ? (
                  <>
                    <BeatLoader color="#fff" size={14} style={{ marginRight: 8 }} />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
