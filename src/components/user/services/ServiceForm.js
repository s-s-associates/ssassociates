"use client";

import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FiArrowLeft, FiPlus, FiTrash2, FiUploadCloud } from "react-icons/fi";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: bordergrayColor },
    "&:hover fieldset": { borderColor: primaryColor },
    "&.Mui-focused fieldset": { borderColor: primaryColor },
  },
};

const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp,image/gif";
const CLOUDINARY_FOLDER = "ssassociates/services";

function fileToDataUri(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImageToCloudinary(token, file, folder = CLOUDINARY_FOLDER) {
  const dataUri = await fileToDataUri(file);
  const res = await fetch("/api/upload/cloudinary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: dataUri, folder }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Upload failed");
  return data.url;
}

const serviceSchema = Yup.object().shape({
  title: Yup.string().trim().required("Service name is required"),
  description: Yup.string().trim().required("Description is required"),
  imageUrl: Yup.string().trim(),
  whatYouGet: Yup.array()
    .of(Yup.string().trim())
    .test("at-least-one", "Add at least one point", (arr) =>
      Array.isArray(arr) && arr.some((s) => String(s).trim() !== "")
    ),
  extraBenefits: Yup.array().of(Yup.string().trim()),
  conclusion: Yup.string().trim(),
  subServices: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().trim(),
      description: Yup.string().trim(),
      items: Yup.array().of(Yup.string().trim()),
    })
  ),
});

function getInitialValues(initialData, isEdit) {
  return {
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    imageUrl: initialData?.imageUrl ?? "",
    whatYouGet:
      Array.isArray(initialData?.whatYouGet) && initialData.whatYouGet.length > 0
        ? [...initialData.whatYouGet]
        : [""],
    extraBenefits:
      Array.isArray(initialData?.extraBenefits) && initialData.extraBenefits.length > 0
        ? [...initialData.extraBenefits]
        : [""],
    conclusion: initialData?.conclusion ?? "",
    subServices:
      Array.isArray(initialData?.subServices) && initialData.subServices.length > 0
        ? initialData.subServices.map((s) => ({
            title: s?.title ?? "",
            description: s?.description ?? "",
            items: Array.isArray(s?.items) && s.items.length > 0 ? [...s.items] : [""],
          }))
        : [{ title: "", description: "", items: [""] }],
  };
}

export default function ServiceForm({ serviceId = null, initialData = null, isEdit = false }) {
  const router = useRouter();
  const { token } = getAuth();
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  const addPoint = (formik, field) => {
    const arr = formik.values[field] || [];
    formik.setFieldValue(field, [...arr, ""]);
  };
  const removePoint = (formik, field, index) => {
    const arr = formik.values[field] || [];
    formik.setFieldValue(field, arr.filter((_, i) => i !== index));
  };
  const changePoint = (formik, field, index, value) => {
    const arr = [...(formik.values[field] || [])];
    arr[index] = value;
    formik.setFieldValue(field, arr);
  };

  const subServices = formik => formik.values.subServices || [{ title: "", description: "", items: [""] }];
  const addSubService = (formik) => {
    formik.setFieldValue("subServices", [...subServices(formik), { title: "", description: "", items: [""] }]);
  };
  const removeSubService = (formik, blockIndex) => {
    const arr = subServices(formik).filter((_, i) => i !== blockIndex);
    formik.setFieldValue("subServices", arr.length ? arr : [{ title: "", description: "", items: [""] }]);
  };
  const setSubServiceField = (formik, blockIndex, field, value) => {
    const arr = subServices(formik).map((b, i) =>
      i === blockIndex ? { ...b, [field]: value } : b
    );
    formik.setFieldValue("subServices", arr);
  };
  const addSubServiceItem = (formik, blockIndex) => {
    const arr = subServices(formik).map((b, i) =>
      i === blockIndex ? { ...b, items: [...(b.items || [""]), ""] } : b
    );
    formik.setFieldValue("subServices", arr);
  };
  const removeSubServiceItem = (formik, blockIndex, itemIndex) => {
    const arr = subServices(formik).map((b, i) => {
      if (i !== blockIndex) return b;
      const items = (b.items || [""]).filter((_, j) => j !== itemIndex);
      return { ...b, items: items.length ? items : [""] };
    });
    formik.setFieldValue("subServices", arr);
  };
  const setSubServiceItem = (formik, blockIndex, itemIndex, value) => {
    const arr = subServices(formik).map((b, i) => {
      if (i !== blockIndex) return b;
      const items = [...(b.items || [""])];
      items[itemIndex] = value;
      return { ...b, items };
    });
    formik.setFieldValue("subServices", arr);
  };

  const handleImageSelect = (e, formik) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "warning",
        title: "Invalid file",
        text: "Please choose an image (JPEG, PNG, WebP, or GIF).",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setImageFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    formik.setFieldValue("imageUrl", "");
    e.target.value = "";
  };
  const clearImage = (formik) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setImageFile(null);
    setImageRemoved(true);
    formik.setFieldValue("imageUrl", "");
  };

  const handleSubmit = async (values, formikHelpers) => {
    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Session expired",
        text: "Please log in again.",
        confirmButtonColor: primaryColor,
      });
      router.push("/login");
      return;
    }
    const hasImage = imageFile || ((values.imageUrl || "").trim() && !imageRemoved);
    if (!hasImage) {
      formikHelpers.setFieldTouched("imageUrl", true);
      formikHelpers.setFieldError("imageUrl", "Service image is required");
      await Swal.fire({
        icon: "warning",
        title: "Image required",
        text: "Please upload service image.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    let imageUrl = (values.imageUrl || "").trim();
    if (imageRemoved && !imageFile) imageUrl = "";
    try {
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(token, imageFile);
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: err?.message || "Could not upload image. Try again.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    const payload = {
      title: (values.title || "").trim(),
      description: (values.description || "").trim(),
      imageUrl,
      whatYouGet: (values.whatYouGet || []).map((s) => String(s).trim()).filter(Boolean),
      extraBenefits: (values.extraBenefits || []).map((s) => String(s).trim()).filter(Boolean),
      conclusion: (values.conclusion || "").trim(),
      subServices: (values.subServices || []).map((s) => ({
        title: (s?.title ?? "").trim(),
        description: (s?.description ?? "").trim(),
        items: (s?.items || []).map((i) => String(i).trim()).filter(Boolean),
      })),
    };
    try {
      if (isEdit && serviceId) {
        const res = await fetch(`/api/services/${serviceId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Service has been updated.",
            confirmButtonColor: primaryColor,
          });
          router.push("/user/services");
          return;
        }
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Update failed.",
          confirmButtonColor: primaryColor,
        });
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Added",
            text: "Service has been added.",
            confirmButtonColor: primaryColor,
          });
          router.push("/user/services");
          return;
        }
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Create failed.",
          confirmButtonColor: primaryColor,
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err?.message || "Something went wrong.",
        confirmButtonColor: primaryColor,
      });
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button
          component={Link}
          href="/user/services"
          size="small"
          sx={{
            minWidth: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "#000",
            "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
          }}
          aria-label="Back"
        >
          <FiArrowLeft size={22} />
        </Button>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>
          {isEdit ? "Edit Service" : "Add Service"}
        </Typography>
      </Box>

      <Formik
        initialValues={getInitialValues(initialData, isEdit)}
        validationSchema={serviceSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          const displayPreviewUrl =
            previewUrl || (!imageRemoved && (formik.values.imageUrl || initialData?.imageUrl));
          return (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              width: "100%",
              // maxWidth: 720,
              bgcolor: "#fff",
              borderRadius: 2,
              p: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              border: `1px solid ${bordergrayColor}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              Service image (one only) *
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: "rgba(0,0,0,0.5)", mb: 1 }}>
              Image is uploaded to Cloudinary when you save. Required.
            </Typography>
            {(formik.touched.imageUrl || formik.submitCount > 0) && formik.errors.imageUrl && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formik.errors.imageUrl}
              </Alert>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_IMAGES}
              onChange={(e) => handleImageSelect(e, formik)}
              style={{ display: "none" }}
            />
            {displayPreviewUrl ? (
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 320,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: `1px solid ${bordergrayColor}`,
                    bgcolor: bggrayColor,
                  }}
                >
                  <Box
                    component="img"
                    src={displayPreviewUrl}
                    alt="Preview"
                    sx={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxHeight: 220,
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => clearImage(formik)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                    aria-label="Remove image"
                  >
                    <FiTrash2 size={18} />
                  </IconButton>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                  {imageFile ? imageFile.name : "Current image"}
                </Typography>
              </Box>
            ) : (
              <Box
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.bgcolor = "rgba(239,71,0,0.04)";
                }}
                onDragLeave={(e) => {
                  e.currentTarget.style.borderColor = bordergrayColor;
                  e.currentTarget.style.bgcolor = "transparent";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.borderColor = bordergrayColor;
                  e.currentTarget.style.bgcolor = "transparent";
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    setImageFile(file);
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(URL.createObjectURL(file));
                    formik.setFieldValue("imageUrl", "");
                  }
                }}
                sx={{
                  border: `2px dashed ${formik.touched.imageUrl && formik.errors.imageUrl ? "#d32f2f" : bordergrayColor}`,
                  borderRadius: 2,
                  py: 3,
                  px: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color 0.2s, background-color 0.2s",
                  "&:hover": {
                    borderColor: formik.touched.imageUrl && formik.errors.imageUrl ? "#d32f2f" : primaryColor,
                    bgcolor: "rgba(239,71,0,0.04)",
                  },
                  mb: 2,
                }}
              >
                <FiUploadCloud size={32} style={{ color: primaryColor, marginBottom: 8 }} />
                <Typography variant="body2" color="text.secondary">
                  Drop image here or click to browse
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                  JPEG, PNG, WebP or GIF — one image only
                </Typography>
              </Box>
            )}

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              Name &amp; Description
            </Typography>
            <TextField
              autoFocus
              fullWidth
              name="title"
              label="Service name"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              placeholder="e.g. Web Development"
              required
              sx={{ mb: 2, ...fieldSx }}
            />
            <TextField
              fullWidth
              name="description"
              label="Description *"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              placeholder="Short description of the service"
              multiline
              rows={3}
              sx={{ mb: 2, ...fieldSx }}
            />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              What you will get *
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: "rgba(0,0,0,0.5)", mb: 1 }}>
              Add at least one point. Multiple points allowed.
            </Typography>
            {formik.errors.whatYouGet && (
              <Typography variant="caption" sx={{ color: "#d32f2f", display: "block", mb: 1 }}>
                {formik.errors.whatYouGet}
              </Typography>
            )}
            <Box sx={{ mb: 3 }}>
              {(formik.values.whatYouGet || [""]).map((point, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={point}
                    onChange={(e) => changePoint(formik, "whatYouGet", index, e.target.value)}
                    placeholder={`Point ${index + 1}`}
                    sx={fieldSx}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removePoint(formik, "whatYouGet", index)}
                    disabled={(formik.values.whatYouGet || []).length <= 1}
                    sx={{ color: "#dc2626", mt: 0.5 }}
                    aria-label="Remove"
                  >
                    <FiTrash2 size={18} />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="button"
                size="small"
                startIcon={<FiPlus size={16} />}
                onClick={() => addPoint(formik, "whatYouGet")}
                sx={{
                  textTransform: "none",
                  color: primaryColor,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(239,71,0,0.08)" },
                }}
              >
                Add point
              </Button>
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              Extra benefits (optional)
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: "rgba(0,0,0,0.5)", mb: 1 }}>
              Additional benefits. Add multiple points.
            </Typography>
            <Box sx={{ mb: 3 }}>
              {(formik.values.extraBenefits || [""]).map((point, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={point}
                    onChange={(e) => changePoint(formik, "extraBenefits", index, e.target.value)}
                    placeholder={`Benefit ${index + 1}`}
                    sx={fieldSx}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removePoint(formik, "extraBenefits", index)}
                    disabled={(formik.values.extraBenefits || []).length <= 1}
                    sx={{ color: "#dc2626", mt: 0.5 }}
                    aria-label="Remove"
                  >
                    <FiTrash2 size={18} />
                  </IconButton>
                </Box>
              ))}
              <Button
                type="button"
                size="small"
                startIcon={<FiPlus size={16} />}
                onClick={() => addPoint(formik, "extraBenefits")}
                sx={{
                  textTransform: "none",
                  color: primaryColor,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(239,71,0,0.08)" },
                }}
              >
                Add point
              </Button>
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              Sub Services (optional)
            </Typography>
            <Typography variant="caption" display="block" sx={{ color: "rgba(0,0,0,0.5)", mb: 1.5 }}>
              Add multiple sub-service blocks. Each has title, description, and multiple points.
            </Typography>
            {(formik.values.subServices || [{ title: "", description: "", items: [""] }]).map((block, blockIndex) => (
              <Box
                key={blockIndex}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  border: `1px solid ${bordergrayColor}`,
                  bgcolor: bggrayColor,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    Sub service {blockIndex + 1}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => removeSubService(formik, blockIndex)}
                    disabled={(formik.values.subServices || []).length <= 1}
                    sx={{ color: "#dc2626" }}
                    aria-label="Remove sub service"
                  >
                    <FiTrash2 size={18} />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={block.title || ""}
                  onChange={(e) => setSubServiceField(formik, blockIndex, "title", e.target.value)}
                  placeholder="Sub service title"
                  sx={{ mb: 1.5, ...fieldSx }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  value={block.description || ""}
                  onChange={(e) => setSubServiceField(formik, blockIndex, "description", e.target.value)}
                  placeholder="Short description"
                  multiline
                  rows={2}
                  sx={{ mb: 1.5, ...fieldSx }}
                />
                <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.6)", display: "block", mb: 1 }}>
                  Points (add multiple)
                </Typography>
                {(block.items || [""]).map((item, itemIndex) => (
                  <Box key={itemIndex} sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={item}
                      onChange={(e) => setSubServiceItem(formik, blockIndex, itemIndex, e.target.value)}
                      placeholder={`Point ${itemIndex + 1}`}
                      sx={fieldSx}
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeSubServiceItem(formik, blockIndex, itemIndex)}
                      disabled={(block.items || []).length <= 1}
                      sx={{ color: "#dc2626", mt: 0.5 }}
                      aria-label="Remove"
                    >
                      <FiTrash2 size={18} />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  type="button"
                  size="small"
                  startIcon={<FiPlus size={16} />}
                  onClick={() => addSubServiceItem(formik, blockIndex)}
                  sx={{
                    textTransform: "none",
                    color: primaryColor,
                    fontWeight: 600,
                    "&:hover": { bgcolor: "rgba(239,71,0,0.08)" },
                  }}
                >
                  Add point
                </Button>
              </Box>
            ))}
            <Button
              type="button"
              size="small"
              startIcon={<FiPlus size={16} />}
              onClick={() => addSubService(formik)}
              sx={{
                textTransform: "none",
                color: primaryColor,
                fontWeight: 600,
                mb: 3,
                "&:hover": { bgcolor: "rgba(239,71,0,0.08)" },
              }}
            >
              Add sub service
            </Button>

            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1.5 }}>
              Conclusion (optional)
            </Typography>
            <TextField
              fullWidth
              name="conclusion"
              value={formik.values.conclusion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Closing text or call to action"
              multiline
              rows={2}
              sx={{ mb: 3, ...fieldSx }}
            />

            <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
              <Button
                component={Link}
                href="/user/services"
                variant="outlined"
                sx={{
                  borderColor: bordergrayColor,
                  color: "#000",
                  textTransform: "none",
                  "&:hover": { borderColor: primaryColor, color: primaryColor },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{
                  bgcolor: primaryColor,
                  textTransform: "none",
                    "&:hover": { bgcolor: primaryHover },
                }}
              >
                {formik.isSubmitting ? (
                  <BeatLoader color="#fff" size={12} />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Add Service"
                )}
              </Button>
            </Box>
          </Box>
          );
        }}
      </Formik>
    </Box>
  );
}
