"use client";

import {
  bggrayColor,
  primaryColor,
  primaryHover,
} from "@/components/utils/Colors";

const UPLOAD_ZONE_BG = "rgba(251, 134, 30, 0.05)";
const UPLOAD_ZONE_BG_HOVER = "rgba(251, 134, 30, 0.1)";
const PRIMARY_SHADOW = "0 4px 14px rgba(251, 134, 30, 0.35)";
const PRIMARY_SHADOW_HOVER = "0 6px 20px rgba(251, 134, 30, 0.42)";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import { toStringArray } from "@/lib/project-challenges-solutions";
import { FieldArray, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowLeft, FiArrowUp, FiPlus, FiTrash2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";

const STATUS_OPTIONS = ["Completed", "Ongoing", "Upcoming"];
const CTA_OPTIONS = ["Contact Us", "Get Quote", "View Brochure"];
const AREA_UNITS = ["sq ft", "m²", "Marla", "Kanal"];

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
  ctaLink: Yup.string()
    .trim()
    .transform((v) => v || null)
    .url("Enter a valid URL")
    .nullable(),
  description: Yup.string().trim(),
  clientName: Yup.string().trim(),
  category: Yup.string().trim().required("Category is required"),
  projectArea: Yup.string().trim(),
  projectAreaUnit: Yup.string().oneOf(AREA_UNITS),
  budget: Yup.string().trim(),
  durationStart: Yup.date().nullable(),
  durationEnd: Yup.date()
    .nullable()
    .min(Yup.ref("durationStart"), "End must be after start"),
  structureType: Yup.string().trim(),
  floors: Yup.string().trim(),
  materialsUsed: Yup.string().trim(),
  foundationType: Yup.string().trim(),
  safetyStandards: Yup.string().trim(),
  sustainabilityFeatures: Yup.string().trim(),
  certifications: Yup.string().trim(),
  videoUrl: Yup.string()
    .trim()
    .transform((v) => v || null)
    .url("Enter a valid URL")
    .nullable(),
  challengesFaced: Yup.array().of(Yup.string()),
  solutionsImplemented: Yup.array().of(Yup.string()),
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
  challengesFaced: [""],
  solutionsImplemented: [""],
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
    "&.Mui-focused fieldset": {
      borderWidth: 2,
      borderColor: `${primaryColor} !important`,
    },
    "&.Mui-error fieldset": {
      borderColor: `${ERROR_COLOR} !important`,
      borderWidth: 1.5,
    },
  },
  "& .MuiInputLabel-shrink": { fontWeight: 600 },
  "& .MuiFormHelperText-root.Mui-error": {
    color: ERROR_COLOR,
    fontWeight: 500,
  },
};

// Lightbox for gallery preview
function ImageLightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const total = items.length;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [total, onClose]);

  const src = items[index].type === "url" ? items[index].value : URL.createObjectURL(items[index].value);

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed", inset: 0, zIndex: 2000,
        bgcolor: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Close */}
      <IconButton
        onClick={onClose}
        sx={{ position: "fixed", top: 16, right: 16, bgcolor: "rgba(255,255,255,0.1)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
      >
        <FiX size={22} />
      </IconButton>

      {/* Counter */}
      <Typography sx={{ position: "fixed", top: 22, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
        {index + 1} / {total}
      </Typography>

      {/* Prev */}
      {total > 1 && (
        <IconButton
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + total) % total); }}
          sx={{ position: "fixed", left: { xs: 8, sm: 20 }, bgcolor: "rgba(255,255,255,0.1)", color: "#fff", "&:hover": { bgcolor: primaryColor } }}
        >
          <FiChevronLeft size={26} />
        </IconButton>
      )}

      {/* Image */}
      <Box
        component="img"
        src={src}
        alt={`Preview ${index + 1}`}
        loading="lazy"
        onClick={(e) => e.stopPropagation()}
        sx={{
          maxWidth: { xs: "90vw", md: "80vw" },
          maxHeight: "85vh",
          objectFit: "contain",
          borderRadius: 2,
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          display: "block",
        }}
      />

      {/* Next */}
      {total > 1 && (
        <IconButton
          onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % total); }}
          sx={{ position: "fixed", right: { xs: 8, sm: 20 }, bgcolor: "rgba(255,255,255,0.1)", color: "#fff", "&:hover": { bgcolor: primaryColor } }}
        >
          <FiChevronRight size={26} />
        </IconButton>
      )}
    </Box>
  );
}

// Sequence arrow button used on gallery items
function SeqBtn({ onClick, disabled, children }) {
  return (
    <IconButton
      type="button"
      size="small"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 22,
        height: 22,
        bgcolor: "rgba(0,0,0,0.55)",
        color: "#fff",
        borderRadius: "4px",
        p: 0,
        "&:hover": { bgcolor: primaryColor },
        "&.Mui-disabled": { bgcolor: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.4)" },
      }}
    >
      {children}
    </IconButton>
  );
}

export default function ProjectForm({ projectId, initialData, onSuccess }) {
  const router = useRouter();
  const { token } = getAuth();

  // Cover image
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(() => initialData?.bannerUrl || "");
  const [coverError, setCoverError] = useState(false);
  const [coverSizeError, setCoverSizeError] = useState(false);

  // Unified gallery items: { type: 'url'|'file', value: string|File }
  const [galleryItems, setGalleryItems] = useState(() =>
    (Array.isArray(initialData?.imageGallery) ? initialData.imageGallery : []).map((u) => ({
      type: "url",
      value: u,
    }))
  );
  const [gallerySizeError, setGallerySizeError] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragIndexRef = useRef(null);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const fetchCategories = useCallback(async () => {
    if (!token) { setCategoryOptions([]); return; }
    try {
      const res = await fetch("/api/categories", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) setCategoryOptions(data.categories);
      else setCategoryOptions([]);
    } catch { setCategoryOptions([]); }
  }, [token]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const totalImages = galleryItems.length;
  const canAddMore = totalImages < MAX_GALLERY_IMAGES;

  // Cover image change
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { e.target.value = ""; return; }
    if (file.size > MAX_FILE_SIZE) {
      setCoverSizeError(true);
      e.target.value = "";
      return;
    }
    setCoverSizeError(false);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setCoverError(false);
    e.target.value = "";
  };

  const removeCover = () => { setCoverFile(null); setCoverPreview(""); };

  // Gallery change
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    const oversized = files.filter((f) => f.size > MAX_FILE_SIZE);
    const valid = files.filter((f) => f.size <= MAX_FILE_SIZE);

    if (oversized.length > 0) {
      setGallerySizeError(
        `${oversized.length} image${oversized.length > 1 ? "s" : ""} exceeded 5 MB and ${oversized.length > 1 ? "were" : "was"} not added: ${oversized.map((f) => f.name).join(", ")}`
      );
    } else {
      setGallerySizeError("");
    }

    const remaining = MAX_GALLERY_IMAGES - totalImages;
    const toAdd = valid.slice(0, Math.max(0, remaining)).map((f) => ({ type: "file", value: f }));
    setGalleryItems((prev) => [...prev, ...toAdd]);
    e.target.value = "";
  };

  const removeGalleryItem = (index) => {
    setGalleryItems((prev) => prev.filter((_, i) => i !== index));
  };

  const moveGalleryItem = (index, direction) => {
    setGalleryItems((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleDragStart = (index) => { dragIndexRef.current = index; };
  const handleDragOver = (e, index) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDrop = (index) => {
    const from = dragIndexRef.current;
    dragIndexRef.current = null;
    setDragOverIndex(null);
    if (from === null || from === index) return;
    setGalleryItems((prev) => {
      const next = [...prev];
      const [removed] = next.splice(from, 1);
      next.splice(index, 0, removed);
      return next;
    });
  };
  const handleDragEnd = () => { dragIndexRef.current = null; setDragOverIndex(null); };

  const initialValues = initialData
    ? {
        ...defaultValues,
        ...initialData,
        durationStart: initialData.durationStart ? initialData.durationStart.slice(0, 10) : "",
        durationEnd: initialData.durationEnd ? initialData.durationEnd.slice(0, 10) : "",
        challengesFaced: toStringArray(initialData.challengesFaced),
        solutionsImplemented: toStringArray(initialData.solutionsImplemented),
      }
    : defaultValues;

  const handleSubmit = async (values) => {
    if (!token) return;
    const hasCover =
      coverFile ||
      (coverPreview && (coverPreview.startsWith("http:") || coverPreview.startsWith("https:")));
    if (!hasCover) {
      setCoverError(true);
      await Swal.fire({ icon: "warning", title: "Cover image required", text: "Please upload a cover image for this project.", confirmButtonColor: primaryColor });
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

      // Upload new file items, keep existing urls in order
      const galleryUrls = [];
      for (const item of galleryItems) {
        if (item.type === "url") {
          galleryUrls.push(item.value);
        } else {
          const url = await uploadImageToCloudinary(token, item.value);
          galleryUrls.push(url);
        }
      }

      const payload = {
        ...values,
        bannerUrl,
        imageGallery: galleryUrls,
        durationStart: values.durationStart || null,
        durationEnd: values.durationEnd || null,
        ctaLink: values.ctaLink || "",
        videoUrl: values.videoUrl || "",
        challengesFaced: toStringArray(values.challengesFaced),
        solutionsImplemented: toStringArray(values.solutionsImplemented),
      };

      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
        await Swal.fire({ icon: "success", title: "Updated", text: "Project has been updated.", confirmButtonColor: primaryColor });
        onSuccess?.();
        router.push("/user/projects");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Create failed");
        await Swal.fire({ icon: "success", title: "Created", text: "Project has been added.", confirmButtonColor: primaryColor });
        onSuccess?.();
        router.push("/user/projects");
      }
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong.", confirmButtonColor: primaryColor });
    }
  };

  return (
    <>
    {lightboxIndex !== null && (
      <ImageLightbox items={galleryItems} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
    )}
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Button
          component={Link}
          href="/user/projects"
          size="small"
          sx={{ minWidth: 0, width: 40, height: 40, borderRadius: "50%", color: "#000", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}
          aria-label="Back to projects"
        >
          <FiArrowLeft size={22} />
        </Button>
        <Typography component="h1" sx={{ fontSize: 28, fontWeight: 700, color: "#000", m: 0, letterSpacing: "-0.02em" }}>
          {projectId ? "Edit Project" : "Add Project"}
        </Typography>
      </Box>

      <Formik initialValues={initialValues} validationSchema={projectSchema} onSubmit={handleSubmit} enableReinitialize>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, validateForm, setTouched, submitForm }) => {
          const FIELD_ORDER = ["title", "status", "category", "ctaLink", "durationEnd", "videoUrl"];
          const handleSubmitClick = async () => {
            if (isSubmitting) return;
            const hasCover = coverFile || (coverPreview && (coverPreview.startsWith("http:") || coverPreview.startsWith("https:")));
            if (!hasCover) {
              setCoverError(true);
              requestAnimationFrame(() => document.getElementById("project-cover")?.scrollIntoView({ behavior: "auto", block: "center" }));
              return;
            }
            setCoverError(false);
            const errs = await validateForm();
            const allTouched = {};
            Object.keys(values).forEach((k) => { allTouched[k] = true; });
            setTouched(allTouched);
            if (Object.keys(errs).length > 0) {
              const first = FIELD_ORDER.find((k) => errs[k]);
              if (first) requestAnimationFrame(() => document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "auto", block: "center" }));
              return;
            }
            submitForm();
          };
          const hasFormErrors = Object.keys(errors).length > 0;
          const showAllErrors = (coverError || hasFormErrors) && (coverError || Object.keys(touched).length > 0);

          return (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitClick(); }} noValidate>
              {showAllErrors && (
                <Box sx={{ bgcolor: "#ffebee", border: `1px solid ${ERROR_COLOR}`, borderRadius: 2, p: 1.5, mb: 2 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: ERROR_COLOR }}>
                    Please fix the errors below before saving.
                  </Typography>
                </Box>
              )}

              {/* 0. Cover image */}
              <Box id="project-cover" sx={cardSx}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Cover image{" "}
                  <Typography component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>*</Typography>
                </Typography>
                <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.55)", mb: 2 }}>
                  Main banner / hero image for this project (required)
                </Typography>

                {/* Cover size error */}
                {coverSizeError && (
                  <Box sx={{ bgcolor: "#fff3e0", border: "1.5px solid #fb861e", borderRadius: 2, p: 1.5, mb: 1.5, display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <Typography sx={{ fontSize: 18, lineHeight: 1 }}>⚠️</Typography>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#b45309" }}>File too large</Typography>
                      <Typography sx={{ fontSize: 12, color: "#92400e" }}>Cover image must be under 5 MB. Please choose a smaller file.</Typography>
                    </Box>
                  </Box>
                )}
                {coverError && (
                  <Typography sx={{ fontSize: 13, color: ERROR_COLOR, fontWeight: 500, mb: 1.5 }}>
                    Please upload a cover image.
                  </Typography>
                )}

                {coverPreview ? (
                  <Box sx={{ position: "relative", maxWidth: 400 }}>
                    <Box component="img" src={coverPreview} alt="Cover preview" loading="lazy" sx={{ width: "100%", maxHeight: 220, borderRadius: 2, objectFit: "cover", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }} />
                    <Button size="small" onClick={removeCover} sx={{ position: "absolute", top: 10, right: 10, minWidth: 0, width: 36, height: 36, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.6)", color: "#fff", "&:hover": { bgcolor: "#000" } }}>
                      ×
                    </Button>
                  </Box>
                ) : (
                  <Box
                    component="label"
                    sx={{
                      display: "block",
                      border: coverError ? "2px dashed #d32f2f" : "2px dashed rgba(0,0,0,0.12)",
                      borderRadius: 2.5, p: 4, textAlign: "center", cursor: "pointer",
                      bgcolor: coverError ? "rgba(211,47,47,0.04)" : UPLOAD_ZONE_BG,
                      transition: "border-color 0.2s, background-color 0.2s",
                      "&:hover": { borderColor: primaryColor, bgcolor: UPLOAD_ZONE_BG_HOVER },
                    }}
                  >
                    <input type="file" accept="image/*" onChange={handleCoverChange} style={{ display: "none" }} />
                    <Typography sx={{ fontSize: 15, color: "#000", fontWeight: 500 }}>Drop cover image or click to upload</Typography>
                    <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)", mt: 0.5 }}>JPG, PNG or WebP · Max 5 MB · Recommended 1200×630</Typography>
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
                      fullWidth label="Project Title" name="title" value={values.title}
                      onChange={handleChange} onBlur={handleBlur}
                      error={touched.title && !!errors.title} helperText={touched.title && errors.title}
                      FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }} sx={inputSx}
                    />
                  </Box>
                  <TextField fullWidth label="Short Tagline" name="tagline" value={values.tagline} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                  <TextField fullWidth label="Location" name="location" value={values.location} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />

                  {/* Status · Year · CTA Button · CTA Link — one row */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1.5fr" }, gap: 2 }}>
                    <Box id="field-status">
                      <FormControl fullWidth sx={inputSx} error={touched.status && !!errors.status}>
                        <InputLabel>Status</InputLabel>
                        <Select name="status" value={values.status} label="Status" onChange={handleChange} onBlur={handleBlur}>
                          {STATUS_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                        </Select>
                        {touched.status && errors.status && (
                          <FormHelperText error sx={{ color: ERROR_COLOR, fontWeight: 500, ml: 1.75 }}>{errors.status}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <TextField fullWidth label="Year" name="year" value={values.year} onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 2025" sx={inputSx} />
                    <FormControl fullWidth sx={inputSx}>
                      <InputLabel>CTA Button</InputLabel>
                      <Select name="ctaType" value={values.ctaType} label="CTA Button" onChange={handleChange} onBlur={handleBlur}>
                        {CTA_OPTIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <Box id="field-ctaLink">
                      <TextField
                        fullWidth label="CTA Link (URL)" name="ctaLink" value={values.ctaLink}
                        onChange={handleChange} onBlur={handleBlur}
                        error={touched.ctaLink && !!errors.ctaLink} helperText={touched.ctaLink && errors.ctaLink}
                        FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                        placeholder="https://..." sx={inputSx}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* 2. Project Overview */}
              <Box sx={cardSx}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Project overview
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField fullWidth multiline rows={4} label="Full Description" name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                  <TextField fullWidth label="Client Name" name="clientName" value={values.clientName} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />

                  {/* Category · Project Area · Unit — one row */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr 1fr" }, gap: 2 }}>
                    <Box id="field-category">
                      <FormControl fullWidth sx={inputSx} error={touched.category && !!errors.category}>
                        <Select name="category" value={values.category} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                          <MenuItem value="" disabled>
                            {categoryOptions.length === 0 ? "No categories — add at Category page" : "Select category"}
                          </MenuItem>
                          {values.category && !categoryOptions.some((c) => c.name === values.category) && (
                            <MenuItem value={values.category}>{values.category}</MenuItem>
                          )}
                          {categoryOptions.map((c) => <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>)}
                        </Select>
                        {touched.category && errors.category && (
                          <FormHelperText error sx={{ color: ERROR_COLOR, fontWeight: 500, ml: 1.75 }}>{errors.category}</FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <TextField
                      label="Project Area" name="projectArea" value={values.projectArea}
                      onChange={handleChange} onBlur={handleBlur} placeholder="e.g. 5000"
                      sx={{ ...inputSx }} fullWidth
                    />
                    <FormControl fullWidth sx={inputSx}>
                      <InputLabel>Unit</InputLabel>
                      <Select name="projectAreaUnit" value={values.projectAreaUnit} label="Unit" onChange={handleChange} onBlur={handleBlur}>
                        {AREA_UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Budget · Duration Start · Duration End — one row */}
                  <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
                    <TextField fullWidth label="Budget (optional)" name="budget" value={values.budget} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                    <TextField
                      fullWidth type="date" label="Duration Start" name="durationStart" value={values.durationStart}
                      onChange={handleChange} onBlur={handleBlur} InputLabelProps={{ shrink: true }} sx={inputSx}
                    />
                    <Box id="field-durationEnd">
                      <TextField
                        fullWidth type="date" label="Duration End" name="durationEnd" value={values.durationEnd}
                        onChange={handleChange} onBlur={handleBlur}
                        error={touched.durationEnd && !!errors.durationEnd} helperText={touched.durationEnd && errors.durationEnd}
                        FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                        InputLabelProps={{ shrink: true }} sx={inputSx}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* 3. Specifications */}
              <Box sx={cardSx}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Specifications
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField fullWidth label="Structure Type" name="structureType" value={values.structureType} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                  <TextField fullWidth label="Floors" name="floors" value={values.floors} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                  <TextField fullWidth label="Materials Used" name="materialsUsed" value={values.materialsUsed} onChange={handleChange} onBlur={handleBlur} multiline rows={2} sx={inputSx} />
                  <TextField fullWidth label="Foundation Type" name="foundationType" value={values.foundationType} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                  <TextField fullWidth label="Safety Standards" name="safetyStandards" value={values.safetyStandards} onChange={handleChange} onBlur={handleBlur} multiline rows={2} sx={inputSx} />
                  <TextField fullWidth label="Sustainability Features" name="sustainabilityFeatures" value={values.sustainabilityFeatures} onChange={handleChange} onBlur={handleBlur} multiline rows={2} sx={inputSx} />
                  <TextField fullWidth label="Certifications" name="certifications" value={values.certifications} onChange={handleChange} onBlur={handleBlur} multiline rows={2} sx={inputSx} />
                </Box>
              </Box>

              {/* 4. Image Gallery */}
              <Box sx={cardSx}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                      Image gallery
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.45)", mt: 0.25 }}>
                      Drag images to reorder · or use ↑ ↓ arrows
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)", fontWeight: 600 }}>
                    {totalImages} / {MAX_GALLERY_IMAGES}
                  </Typography>
                </Box>

                {/* Size error banner */}
                {gallerySizeError && (
                  <Box sx={{ bgcolor: "#fff3e0", border: "1.5px solid #fb861e", borderRadius: 2, p: 1.5, mb: 2, display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <Typography sx={{ fontSize: 18, lineHeight: 1 }}>⚠️</Typography>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#b45309" }}>File size limit exceeded (5 MB)</Typography>
                      <Typography sx={{ fontSize: 12, color: "#92400e" }}>{gallerySizeError}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => setGallerySizeError("")} sx={{ ml: "auto", p: 0.25 }}>
                      <Typography sx={{ fontSize: 16, lineHeight: 1, color: "#92400e" }}>×</Typography>
                    </IconButton>
                  </Box>
                )}

                {/* Upload zone */}
                <Box
                  component="label"
                  sx={{
                    display: "block", border: "2px dashed rgba(0,0,0,0.12)", borderRadius: 2.5, p: 4,
                    textAlign: "center", cursor: canAddMore ? "pointer" : "not-allowed",
                    bgcolor: canAddMore ? UPLOAD_ZONE_BG : "rgba(0,0,0,0.02)",
                    transition: "border-color 0.2s, background-color 0.2s",
                    "&:hover": canAddMore ? { borderColor: primaryColor, bgcolor: UPLOAD_ZONE_BG_HOVER } : {},
                  }}
                >
                  <input type="file" accept="image/*" multiple onChange={handleGalleryChange} disabled={!canAddMore} style={{ display: "none" }} />
                  <Typography sx={{ fontSize: 15, color: canAddMore ? "#000" : "rgba(0,0,0,0.4)", fontWeight: 500 }}>
                    {canAddMore ? "Drop images here or click to upload" : "Maximum 20 images"}
                  </Typography>
                  {canAddMore && (
                    <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.5)", mt: 0.5 }}>
                      JPG, PNG or WebP · Max 5 MB per image
                    </Typography>
                  )}
                </Box>

                {/* Gallery grid with sequence arrows */}
                {galleryItems.length > 0 && (
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 1.5, mt: 2 }}>
                    {galleryItems.map((item, index) => {
                      const src = item.type === "url" ? item.value : URL.createObjectURL(item.value);
                      return (
                        <Box
                          key={`gi-${index}`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDrop={() => handleDrop(index)}
                          onDragEnd={handleDragEnd}
                          sx={{
                            position: "relative", aspectRatio: "1", borderRadius: 2, overflow: "hidden",
                            boxShadow: dragOverIndex === index ? `0 0 0 2.5px ${primaryColor}, 0 2px 8px rgba(0,0,0,0.08)` : "0 2px 8px rgba(0,0,0,0.08)",
                            opacity: dragIndexRef.current === index ? 0.45 : 1,
                            cursor: "grab",
                            transition: "box-shadow 0.15s, opacity 0.15s",
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt=""
                            loading="lazy"
                            onClick={() => setLightboxIndex(index)}
                            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in", pointerEvents: dragIndexRef.current !== null ? "none" : "auto" }}
                          />

                          {/* Sequence index badge */}
                          <Box sx={{ position: "absolute", top: 5, left: 6, bgcolor: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: "4px", px: 0.6, py: 0.2, lineHeight: 1.5 }}>
                            {index + 1}
                          </Box>

                          {/* Up / Down arrows */}
                          <Box sx={{ position: "absolute", bottom: 5, left: 5, display: "flex", flexDirection: "column", gap: 0.4 }}>
                            <SeqBtn onClick={() => moveGalleryItem(index, -1)} disabled={index === 0}>
                              <FiArrowUp size={12} />
                            </SeqBtn>
                            <SeqBtn onClick={() => moveGalleryItem(index, 1)} disabled={index === galleryItems.length - 1}>
                              <FiArrowDown size={12} />
                            </SeqBtn>
                          </Box>

                          {/* Remove */}
                          <Button
                            size="small"
                            onClick={() => removeGalleryItem(index)}
                            sx={{ position: "absolute", top: 5, right: 5, minWidth: 0, width: 24, height: 24, borderRadius: "50%", p: 0, bgcolor: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 16, lineHeight: 1, "&:hover": { bgcolor: "#dc2626" } }}
                          >
                            ×
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>

              {/* 5. Video */}
              <Box sx={cardSx}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Video
                </Typography>
                <Box id="field-videoUrl">
                  <TextField
                    fullWidth label="Video URL" name="videoUrl" value={values.videoUrl}
                    onChange={handleChange} onBlur={handleBlur}
                    error={touched.videoUrl && !!errors.videoUrl} helperText={touched.videoUrl && errors.videoUrl}
                    FormHelperTextProps={{ sx: { color: ERROR_COLOR, fontWeight: 500 } }}
                    placeholder="https://youtube.com/... or video link" sx={inputSx}
                  />
                </Box>
              </Box>

              {/* 6. Challenges & Solutions */}
              <Box sx={cardSx}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#000", mb: 2.5, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  Challenges &amp; solutions
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.75)", mb: 1.5 }}>Challenges faced</Typography>
                    <FieldArray name="challengesFaced">
                      {(arrHelpers) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {values.challengesFaced.map((_, index) => (
                            <Box key={`ch-${index}`} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                              <TextField fullWidth multiline label={`Challenge ${index + 1}`} name={`challengesFaced.${index}`} value={values.challengesFaced[index] ?? ""} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                              <IconButton type="button" size="small" onClick={() => arrHelpers.remove(index)} aria-label="Remove challenge" sx={{ mt: 0.5, color: "rgba(0,0,0,0.45)", "&:hover": { color: "#dc2626", bgcolor: "rgba(220,38,38,0.08)" } }}>
                                <FiTrash2 size={18} />
                              </IconButton>
                            </Box>
                          ))}
                          <Button type="button" variant="outlined" size="small" startIcon={<FiPlus size={18} />} onClick={() => arrHelpers.push("")} sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 600, borderColor: "rgba(0,0,0,0.2)", color: "#000", "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.06)" } }}>
                            Add challenge
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.75)", mb: 1.5 }}>Solutions implemented</Typography>
                    <FieldArray name="solutionsImplemented">
                      {(arrHelpers) => (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {values.solutionsImplemented.map((_, index) => (
                            <Box key={`sol-${index}`} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                              <TextField fullWidth multiline label={`Solution ${index + 1}`} name={`solutionsImplemented.${index}`} value={values.solutionsImplemented[index] ?? ""} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                              <IconButton type="button" size="small" onClick={() => arrHelpers.remove(index)} aria-label="Remove solution" sx={{ mt: 0.5, color: "rgba(0,0,0,0.45)", "&:hover": { color: "#dc2626", bgcolor: "rgba(220,38,38,0.08)" } }}>
                                <FiTrash2 size={18} />
                              </IconButton>
                            </Box>
                          ))}
                          <Button type="button" variant="outlined" size="small" startIcon={<FiPlus size={18} />} onClick={() => arrHelpers.push("")} sx={{ alignSelf: "flex-start", textTransform: "none", fontWeight: 600, borderColor: "rgba(0,0,0,0.2)", color: "#000", "&:hover": { borderColor: primaryColor, color: primaryColor, bgcolor: "rgba(251,134,30,0.06)" } }}>
                            Add solution
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  </Box>

                  <TextField fullWidth multiline label="Unique Engineering Approach" name="uniqueApproach" value={values.uniqueApproach} onChange={handleChange} onBlur={handleBlur} sx={inputSx} />
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mb: 3, mt: 1 }}>
                <Button
                  type="submit" variant="contained" disabled={isSubmitting}
                  sx={{ bgcolor: primaryColor, color: "#fff", fontWeight: 600, px: 4, py: 1.5, borderRadius: 2.5, textTransform: "none", boxShadow: PRIMARY_SHADOW, "&:hover": { bgcolor: primaryHover, boxShadow: PRIMARY_SHADOW_HOVER } }}
                >
                  {isSubmitting ? <BeatLoader color="#fff" size={12} /> : projectId ? "Update Project" : "Add Project"}
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
    </>
  );
}
