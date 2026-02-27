"use client";

import { bggrayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";

const STATUS_OPTIONS = ["Completed", "Ongoing", "Upcoming"];
const CTA_OPTIONS = ["Contact Us", "Get Quote", "View Brochure"];
const AREA_UNITS = ["sq ft", "m²"];

function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImageToCloudinary(token, file) {
  const dataUri = await fileToDataUri(file);
  const res = await fetch("/api/upload/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: dataUri }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Upload failed");
  return data.url;
}

const projectSchema = Yup.object().shape({
  title: Yup.string().trim().required("Project title is required"),
  tagline: Yup.string().trim(),
  location: Yup.string().trim(),
  status: Yup.string().oneOf(STATUS_OPTIONS).required("Status is required"),
  year: Yup.string().trim(),
  ctaType: Yup.string().oneOf(CTA_OPTIONS),
  ctaLink: Yup.string().trim().transform((v) => v || null).url("Enter a valid URL").nullable(),
  description: Yup.string().trim(),
  clientName: Yup.string().trim(),
  category: Yup.string().trim().required("Category is required"),
  projectArea: Yup.string().trim(),
  projectAreaUnit: Yup.string().oneOf(AREA_UNITS),
  budget: Yup.string().trim(),
  durationStart: Yup.date().nullable(),
  durationEnd: Yup.date().nullable().min(Yup.ref("durationStart"), "End must be after start"),
  structureType: Yup.string().trim(),
  floors: Yup.string().trim(),
  materialsUsed: Yup.string().trim(),
  foundationType: Yup.string().trim(),
  safetyStandards: Yup.string().trim(),
  sustainabilityFeatures: Yup.string().trim(),
  certifications: Yup.string().trim(),
  videoUrl: Yup.string().trim().transform((v) => v || null).url("Enter a valid URL").nullable(),
  challengesFaced: Yup.string().trim(),
  solutionsImplemented: Yup.string().trim(),
  uniqueApproach: Yup.string().trim(),
});

const defaultValues = {
  title: "",
  tagline: "",
  location: "",
  status: "Upcoming",
  year: "",
  ctaType: "Contact Us",
  ctaLink: "",
  description: "",
  clientName: "",
  category: "",
  projectArea: "",
  projectAreaUnit: "sq ft",
  budget: "",
  durationStart: "",
  durationEnd: "",
  structureType: "",
  floors: "",
  materialsUsed: "",
  foundationType: "",
  safetyStandards: "",
  sustainabilityFeatures: "",
  certifications: "",
  videoUrl: "",
  challengesFaced: "",
  solutionsImplemented: "",
  uniqueApproach: "",
};

const MAX_GALLERY_IMAGES = 20;

const cardSx = {
  bgcolor: "white",
  borderRadius: 3,
  p: 3,
  mb: 2.5,
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const ERROR_COLOR = "#d32f2f";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    bgcolor: "#fafafa",
    "& fieldset": { borderColor: "rgba(0,0,0,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(0,0,0,0.15)" },
    "&.Mui-focused fieldset": { borderWidth: 2, borderColor: `${primaryColor} !important` },
    "&.Mui-error fieldset": { borderColor: `${ERROR_COLOR} !important`, borderWidth: 1.5 },
  },
  "& .MuiInputLabel-shrink": { fontWeight: 600 },
  "& .MuiFormHelperText-root.Mui-error": { color: ERROR_COLOR, fontWeight: 500 },
};

export default function ProjectForm({ projectId, initialData, onSuccess }) {
  const router = useRouter();
  const { token } = getAuth();
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(() => initialData?.bannerUrl || "");
  const [coverError, setCoverError] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState(() =>
    Array.isArray(initialData?.imageGallery) ? initialData.imageGallery : []
  );

  const fetchCategories = useCallback(async () => {
    if (!token) {
      setCategoryOptions([]);
      return;
    }
    try {
      const res = await fetch("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategoryOptions(data.categories);
      } else {
        setCategoryOptions([]);
      }
    } catch {
      setCategoryOptions([]);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const totalImages = existingGalleryUrls.length + galleryFiles.length;
  const canAddMore = totalImages < MAX_GALLERY_IMAGES;

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setCoverError(false);
    }
    e.target.value = "";
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview("");
  };

  const initialValues = initialData
    ? {
        ...defaultValues,
        ...initialData,
        durationStart: initialData.durationStart ? initialData.durationStart.slice(0, 10) : "",
        durationEnd: initialData.durationEnd ? initialData.durationEnd.slice(0, 10) : "",
      }
    : defaultValues;

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_GALLERY_IMAGES - totalImages;
    const toAdd = files.slice(0, Math.max(0, remaining));
    setGalleryFiles((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const removeGalleryImage = (source, index) => {
    if (source === "existing") {
      setExistingGalleryUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };


  const handleSubmit = async (values) => {
    if (!token) return;
    const hasCover = coverFile || (coverPreview && (coverPreview.startsWith("http:") || coverPreview.startsWith("https:")));
    if (!hasCover) {
      setCoverError(true);
      await Swal.fire({
        icon: "warning",
        title: "Cover image required",
        text: "Please upload a cover image for this project.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setCoverError(false);
    try {
      let bannerUrl = "";
      if (coverFile) {
        bannerUrl = await uploadImageToCloudinary(token, coverFile);
      } else if (coverPreview && (coverPreview.startsWith("http:") || coverPreview.startsWith("https:"))) {
        bannerUrl = coverPreview;
      }
      const galleryUrls = [...existingGalleryUrls];
      for (let i = 0; i < galleryFiles.length; i++) {
        const url = await uploadImageToCloudinary(token, galleryFiles[i]);
        galleryUrls.push(url);
      }
      const payload = {
        ...values,
        bannerUrl,
        imageGallery: galleryUrls,
        durationStart: values.durationStart || null,
        durationEnd: values.durationEnd || null,
        ctaLink: values.ctaLink || "",
        videoUrl: values.videoUrl || "",
      };
      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
        await Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Project has been updated.",
          confirmButtonColor: primaryColor,
        });
        onSuccess?.();
        router.push("/user/projects");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Create failed");
        await Swal.fire({
          icon: "success",
          title: "Created",
          text: "Project has been added.",
          confirmButtonColor: primaryColor,
        });
        onSuccess?.();
        router.push("/user/projects");
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong.",
        confirmButtonColor: primaryColor,
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 },  mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button
          component={Link}
          href="/user/projects"
          size="small"
          sx={{
            minWidth: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "#000",
            "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
          }}
          aria-label="Back to projects"
        >
          <FiArrowLeft size={22} />
        </Button>
        <Typography
          component="h1"
          sx={{ fontSize: 28, fontWeight: 700, color: "#000", m: 0, letterSpacing: "-0.02em" }}
        >
          {projectId ? "Edit Project" : "Add Project"}
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={projectSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          validateForm,
          setTouched,
          submitForm,
        }) => {
          const FIELD_ORDER = ["title", "status", "category", "ctaLink", "durationEnd", "videoUrl"];
          const handleSubmitClick = async () => {
            if (isSubmitting) return;
            const hasCover = coverFile || (coverPreview && (coverPreview.startsWith("http:") || coverPreview.startsWith("https:")));
            if (!hasCover) {
              setCoverError(true);
              requestAnimationFrame(() => {
                document.getElementById("project-cover")?.scrollIntoView({ behavior: "auto", block: "center" });
              });
              return;
            }
            setCoverError(false);
            const errs = await validateForm();
            const allTouched = {};
            Object.keys(values).forEach((k) => { allTouched[k] = true; });
            setTouched(allTouched);
            if (Object.keys(errs).length > 0) {
              const first = FIELD_ORDER.find((k) => errs[k]);
              if (first) {
                requestAnimationFrame(() => {
                  document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "auto", block: "center" });
                });
              }
              return;
            }
            submitForm();
          };
          const hasFormErrors = Object.keys(errors).length > 0;
          const showAllErrors = (coverError || hasFormErrors) && (coverError || Object.keys(touched).length > 0);
          return (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitClick(); }} noValidate>
            {showAllErrors && (
              <Box
                sx={{
                  bgcolor: "#ffebee",
                  border: `1px solid ${ERROR_COLOR}`,
                  borderRadius: 2,
                  p: 1.5,
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: ERROR_COLOR }}>
                  Please fix the errors below before saving.
                </Typography>
              </Box>
            )}
            {/* 0. Cover image — separate field at top */}
            <Box id="project-cover" sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Cover image <Typography component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>*</Typography>
              </Typography>
              <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.55)", mb: 2 }}>
                Main banner / hero image for this project (required)
              </Typography>
              {coverError && (
                <Typography sx={{ fontSize: 13, color: ERROR_COLOR, fontWeight: 500, mb: 1.5 }}>
                  Please upload a cover image.
                </Typography>
              )}
              {coverPreview ? (
                <Box sx={{ position: "relative", maxWidth: 400 }}>
                  <Box
                    component="img"
                    src={coverPreview}
                    alt="Cover preview"
                    sx={{
                      width: "100%",
                      maxHeight: 220,
                      borderRadius: 2,
                      objectFit: "cover",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={removeCover}
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      minWidth: 0,
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      "&:hover": { bgcolor: "#000" },
                    }}
                  >
                    ×
                  </Button>
                </Box>
              ) : (
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    border: coverError ? "2px dashed #d32f2f" : "2px dashed rgba(0,0,0,0.12)",
                    borderRadius: 2.5,
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: coverError ? "rgba(211,47,47,0.04)" : "rgba(138,56,245,0.02)",
                    transition: "border-color 0.2s, background-color 0.2s",
                    "&:hover": { borderColor: primaryColor, bgcolor: "rgba(138,56,245,0.06)" },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    style={{ display: "none" }}
                  />
                  <Typography sx={{ fontSize: 15, color: "#000", fontWeight: 500 }}>
                    Drop cover image or click to upload
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)", mt: 0.5 }}>
                    JPG, PNG or WebP · Recommended 1200×630
                  </Typography>
                </Box>
              )}
            </Box>

            {/* 1. Project basics */}
            <Box sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Project basics
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box id="field-title">
                  <TextField
                    fullWidth
                    label="Project Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                    sx={inputSx}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Short Tagline"
                  name="tagline"
                  value={values.tagline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <Box id="field-status">
                  <FormControl fullWidth sx={inputSx} error={touched.status && !!errors.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={values.status}
                      label="Status"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {STATUS_OPTIONS.map((o) => (
                        <MenuItem key={o} value={o}>{o}</MenuItem>
                      ))}
                    </Select>
                    {touched.status && errors.status && (
                      <FormHelperText error sx={{ color: ERROR_COLOR, fontWeight: 500, ml: 1.75 }}>
                        {errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  label="Year"
                  name="year"
                  value={values.year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 2025"
                  sx={inputSx}
                />
                <FormControl fullWidth sx={inputSx}>
                  <InputLabel>CTA Button</InputLabel>
                  <Select
                    name="ctaType"
                    value={values.ctaType}
                    label="CTA Button"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {CTA_OPTIONS.map((o) => (
                      <MenuItem key={o} value={o}>{o}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box id="field-ctaLink">
                  <TextField
                    fullWidth
                    label="CTA Link (URL)"
                    name="ctaLink"
                    value={values.ctaLink}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.ctaLink && !!errors.ctaLink}
                    helperText={touched.ctaLink && errors.ctaLink}
                    FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                    placeholder="https://..."
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </Box>

            {/* 2. Project Overview */}
            <Box sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Project overview
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Full Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Client Name"
                  name="clientName"
                  value={values.clientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <Box id="field-category">
                  <FormControl fullWidth sx={inputSx} error={touched.category && !!errors.category}>
                    {/* <InputLabel>Category</InputLabel> */}
                    <Select
                      name="category"
                    value={values.category}
                    // label="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      {categoryOptions.length === 0 ? "No categories — add at Category page" : "Select category"}
                    </MenuItem>
                    {values.category && !categoryOptions.some((c) => c.name === values.category) && (
                      <MenuItem value={values.category}>{values.category}</MenuItem>
                    )}
                    {categoryOptions.map((c) => (
                      <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
                    ))}
                  </Select>
                    {touched.category && errors.category && (
                      <FormHelperText error sx={{ color: ERROR_COLOR, fontWeight: 500, ml: 1.75 }}>
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    label="Project Area"
                    name="projectArea"
                    value={values.projectArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 5000"
                    sx={{ ...inputSx, flex: 1, minWidth: 120 }}
                  />
                  <FormControl sx={{ ...inputSx, minWidth: 120 }}>
                    <InputLabel>Unit</InputLabel>
                    <Select
                      name="projectAreaUnit"
                      value={values.projectAreaUnit}
                      label="Unit"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {AREA_UNITS.map((u) => (
                        <MenuItem key={u} value={u}>{u}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  fullWidth
                  label="Budget (optional)"
                  name="budget"
                  value={values.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Duration Start"
                    name="durationStart"
                    value={values.durationStart}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ shrink: true }}
                    sx={inputSx}
                  />
                  <Box id="field-durationEnd">
                    <TextField
                      fullWidth
                      type="date"
                      label="Duration End"
                      name="durationEnd"
                      value={values.durationEnd}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.durationEnd && !!errors.durationEnd}
                      helperText={touched.durationEnd && errors.durationEnd}
                      FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 3. Project Specifications */}
            <Box sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Specifications
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Structure Type"
                  name="structureType"
                  value={values.structureType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Floors"
                  name="floors"
                  value={values.floors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Materials Used"
                  name="materialsUsed"
                  value={values.materialsUsed}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Foundation Type"
                  name="foundationType"
                  value={values.foundationType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Safety Standards"
                  name="safetyStandards"
                  value={values.safetyStandards}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Sustainability Features"
                  name="sustainabilityFeatures"
                  value={values.sustainabilityFeatures}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  label="Certifications"
                  name="certifications"
                  value={values.certifications}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* 4. Image Gallery — max 20 */}
            <Box sx={cardSx}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Image gallery
                </Typography>
                <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)" }}>
                  {totalImages} / {MAX_GALLERY_IMAGES}
                </Typography>
              </Box>
              <Box
                component="label"
                sx={{
                  display: "block",
                  border: "2px dashed rgba(0,0,0,0.12)",
                  borderRadius: 2.5,
                  p: 4,
                  textAlign: "center",
                  cursor: canAddMore ? "pointer" : "not-allowed",
                  bgcolor: canAddMore ? "rgba(138,56,245,0.02)" : "rgba(0,0,0,0.02)",
                  transition: "border-color 0.2s, background-color 0.2s",
                  "&:hover": canAddMore ? { borderColor: primaryColor, bgcolor: "rgba(138,56,245,0.06)" } : {},
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  disabled={!canAddMore}
                  style={{ display: "none" }}
                />
                <Typography sx={{ fontSize: 15, color: canAddMore ? "#000" : "rgba(0,0,0,0.4)", fontWeight: 500 }}>
                  {canAddMore ? "Drop images here or click to upload" : "Maximum 20 images"}
                </Typography>
                {canAddMore && (
                  <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)", mt: 0.5 }}>
                    JPG, PNG or WebP
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 1.5, mt: 2 }}>
                {existingGalleryUrls.map((url, index) => (
                  <Box
                    key={`e-${index}`}
                    sx={{
                      position: "relative",
                      aspectRatio: "1",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box
                      component="img"
                      src={url}
                      alt=""
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <Button
                      size="small"
                      onClick={() => removeGalleryImage("existing", index)}
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        minWidth: 0,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        p: 0,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        fontSize: 18,
                        lineHeight: 1,
                        "&:hover": { bgcolor: "#000" },
                      }}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
                {galleryFiles.map((file, index) => (
                  <Box
                    key={`f-${index}`}
                    sx={{
                      position: "relative",
                      aspectRatio: "1",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Box
                      component="img"
                      src={URL.createObjectURL(file)}
                      alt=""
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <Button
                      size="small"
                      onClick={() => removeGalleryImage("files", index)}
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        minWidth: 0,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        p: 0,
                        bgcolor: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        fontSize: 18,
                        lineHeight: 1,
                        "&:hover": { bgcolor: "#000" },
                      }}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* 5. Video */}
            <Box sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Video
              </Typography>
              <Box id="field-videoUrl">
                <TextField
                  fullWidth
                  label="Video URL"
                  name="videoUrl"
                  value={values.videoUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.videoUrl && !!errors.videoUrl}
                  helperText={touched.videoUrl && errors.videoUrl}
                  FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                  placeholder="https://youtube.com/... or video link"
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* 6. Challenges & Solutions */}
            <Box sx={cardSx}>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Challenges & solutions
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Challenges Faced"
                  name="challengesFaced"
                  value={values.challengesFaced}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Solutions Implemented"
                  name="solutionsImplemented"
                  value={values.solutionsImplemented}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Unique Engineering Approach"
                  name="uniqueApproach"
                  value={values.uniqueApproach}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={inputSx}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mb: 3, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  bgcolor: primaryColor,
                  color: "#fff",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2.5,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(138,56,245,0.4)",
                  "&:hover": { bgcolor: "#7A2FE5", boxShadow: "0 6px 20px rgba(138,56,245,0.45)" },
                }}
              >
                {isSubmitting ? <BeatLoader color="#fff" size={12} /> : projectId ? "Update Project" : "Add Project"}
              </Button>
            </Box>
          </form>
          );
        }}
      </Formik>
    </Box>
  );
}
