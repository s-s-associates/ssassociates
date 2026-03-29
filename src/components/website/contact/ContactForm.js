"use client";

import { bggrayColor, bordergrayColor, grayColor, primaryColor, primaryHover, textGrayDark, whiteColor } from "@/components/utils/Colors";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiClock, FiMail, FiMapPin, FiPhoneCall, FiSend } from "react-icons/fi";
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
  fontSize: 12,
  fontWeight: 600,
  color: grayColor,
  mb: 0.75,
  display: "block",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.6,
    bgcolor: bggrayColor,
    "& fieldset": { borderColor: bordergrayColor },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 1.5 },
    "&.Mui-error fieldset": { borderColor: "#d32f2f" },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 14,
  },
  "& .MuiFormHelperText-root.Mui-error": { color: "#d32f2f" },
};

const phoneInputHeight = 37;
const phoneBorderRadius = 10;

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
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: bggrayColor,
        minHeight: "60vh",

      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }} >
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
            <Box component="form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.35fr" },
                  gap: { xs: 3, md: 10 },
                  alignItems: "stretch",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1.3,
                      py: 0.45,
                      borderRadius: "999px",
                      border: `1px solid ${bordergrayColor}`,
                      color: primaryColor,
                      fontSize: 12,
                      fontWeight: 600,
                      bgcolor: "#fff7ee",
                      mb: 1.8,
                    }}
                  >
                    Get In Touch
                  </Box>

                  <Typography
                    component="h1"
                    sx={{
                      fontFamily: "var(--font-app)",
                      fontSize: { xs: 38, sm: 48, lg: 54 },
                      lineHeight: 1.05,
                      fontWeight: 800,
                      color: "#111827",
                      mb: 1.4,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Let&apos;s Build <Box component="span" sx={{ color: primaryColor }}>Together</Box>
                  </Typography>
                  <Typography
                    sx={{
                      color: textGrayDark,
                      fontSize: 16,
                      lineHeight: 1.72,
                      maxWidth: 420,
                      mb: 2.8,
                    }}
                  >
                    Have a project in mind? We&apos;d love to hear about it. Send us a message and our team will respond
                    within 24 hours.
                  </Typography>

                  <Stack gap={1.5}>
                    {[
                      { icon: <FiPhoneCall size={16} />, title: "Call Us", value: "+92 300 123 4567" },
                      { icon: <FiMail size={16} />, title: "Email Us", value: "info@ssassociates.com" },
                      { icon: <FiMapPin size={16} />, title: "Visit Us", value: "Lahore, Pakistan" },
                      { icon: <FiClock size={16} />, title: "Working Hours", value: "Mon - Sat, 9AM - 6PM" },
                    ].map((item) => (
                      <Box
                        key={item.title}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.4,
                          p: 1.4,
                          borderRadius: 2,
                          border: `1px solid ${bordergrayColor}`,
                          bgcolor: "#f3f4f6",
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: primaryColor,
                            bgcolor: "#fff4e7",
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: 11, color: grayColor, opacity: 0.8, lineHeight: 1.1 }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.4 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box 
                  sx={{
                    bgcolor: whiteColor,
                    borderRadius: 2.5,
                    boxShadow: "0 6px 26px rgba(17,24,39,0.05)",
                    border: `1px solid ${bordergrayColor}`,
                    p: { xs: 2, sm: 2.6, md: 3 },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-app)",
                      fontSize: { xs: 30, sm: 34 },
                      lineHeight: 1.1,
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    Send Us a Message
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: grayColor, opacity: 0.82, mt: 0.6, mb: 2 }}>
                    Fields marked with * are required.
                  </Typography>

                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1.8 }}>
                    <Box>
                      <Typography component="span" sx={fieldHeadingSx}>Full Name *</Typography>
                      <TextField
                        fullWidth
                      size="small"
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
                      <Typography component="span" sx={fieldHeadingSx}>Email Address *</Typography>
                      <TextField
                        fullWidth
                      size="small"
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
                      size="small"
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
                      <Typography component="span" sx={fieldHeadingSx}>Phone Number *</Typography>
                      <PhoneInput
                        country="pk"
                      size="small"
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
                          fontSize: 14,
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
                  <Box sx={{ mt: 1.8 }}>
                    <Typography component="span" sx={fieldHeadingSx}>Address (optional)</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="123 Main Street, City, State"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: false }}
                      sx={inputSx}
                    />
                  </Box>
                  <Box sx={{ mt: 1.8 }}>
                    <Typography component="span" sx={fieldHeadingSx}>Message *</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Tell us about your project..."
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.message && !!errors.message}
                      helperText={touched.message && errors.message}
                      InputLabelProps={{ shrink: false }}
                      multiline
                      rows={2}
                      sx={inputSx}
                    />
                  </Box>
                  <Button
                    type="submit"
                    
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? null : <FiSend size={16} />}
                    sx={{
                      mt: 2.2,
                      px:3,
                      py: 1.2,
                      fontSize: 15,
                      fontWeight: 700,
                      borderRadius: 1.8,
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
                        <BeatLoader color="#fff" size={12} style={{ marginRight: 8 }} />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
