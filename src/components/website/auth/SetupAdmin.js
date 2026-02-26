"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email("Valid email required").required("Email is required"),
  password: Yup.string().required("Password is required").min(6, "At least 6 characters"),
});

export default function SetupAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f4f4",
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          p: 4,
          maxWidth: 420,
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#000", mb: 1 }}>
          Create first admin
        </Typography>
        <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.6)", mb: 3 }}>
          Add an admin account. Only admins can log in.
        </Typography>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={schema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await fetch("/api/admins", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: values.name.trim(),
                  email: values.email.toLowerCase().trim(),
                  password: values.password,
                }),
              });
              const data = await res.json();
              if (data.success) {
                await Swal.fire({
                  icon: "success",
                  title: "Admin created",
                  text: "You can now log in with this email and password.",
                  confirmButtonColor: primaryColor,
                });
                router.replace("/login");
              } else {
                await Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: data.message || "Failed to create admin.",
                  confirmButtonColor: primaryColor,
                });
              }
            } catch (err) {
              await Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Something went wrong.",
                confirmButtonColor: primaryColor,
              });
            } finally {
              setLoading(false);
            }
          }}
        >
          {(formik) => (
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: primaryColor,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#7A2FE5" },
                }}
              >
                {loading ? <BeatLoader color="#fff" size={10} /> : "Create admin"}
              </Button>
        </Box>
          )}
        </Formik>
        <Typography sx={{ textAlign: "center", mt: 2, fontSize: 14, color: "rgba(0,0,0,0.5)" }}>
          <Box component={Link} href="/login" sx={{ color: primaryColor, fontWeight: 600 }}>
            Back to login
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
