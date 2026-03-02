"use client";

import { bggrayColor, bordergrayColor, primaryColor } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

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

export default function ClientsPage() {
  const { token } = getAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewingClient, setViewingClient] = useState(null);

  const fetchClients = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/clients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.clients)) setClients(data.clients);
      else setClients([]);
    } catch {
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const openAddDialog = () => {
    setEditingClient(null);
    setTitle("");
    setDescription("");
    setUrl("");
    setImageFile(null);
    setImagePreview("");
    setDialogOpen(true);
  };

  const openEditDialog = (client) => {
    setEditingClient(client);
    setTitle(client.title || "");
    setDescription(client.description || "");
    setUrl(client.url || "");
    setImageFile(null);
    setImagePreview(client.imageUrl || "");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingClient(null);
    setTitle("");
    setDescription("");
    setUrl("");
    setImageFile(null);
    setImagePreview("");
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(false);
    }
    e.target.value = "";
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSave = async () => {
    const trimmedTitle = (title || "").trim();
    if (!trimmedTitle) {
      await Swal.fire({
        icon: "warning",
        title: "Title required",
        text: "Please enter a title.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    const hasImage =
      imageFile ||
      (imagePreview && (imagePreview.startsWith("http:") || imagePreview.startsWith("https:"))) ||
      (editingClient?.imageUrl && imagePreview === editingClient.imageUrl);
    if (!hasImage) {
      setImageError(true);
      await Swal.fire({
        icon: "warning",
        title: "Image required",
        text: "Please upload an image for this client.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setImageError(false);
    setSaving(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(token, imageFile);
      } else if (imagePreview && (imagePreview.startsWith("http:") || imagePreview.startsWith("https:"))) {
        imageUrl = imagePreview;
      } else if (editingClient?.imageUrl) {
        imageUrl = editingClient.imageUrl;
      }
      if (editingClient) {
        const res = await fetch(`/api/clients/${editingClient._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: trimmedTitle, description: (description || "").trim(), url: (url || "").trim(), imageUrl }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Client has been updated.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchClients();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Update failed.",
            confirmButtonColor: primaryColor,
          });
        }
      } else {
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: trimmedTitle, description: (description || "").trim(), url: (url || "").trim(), imageUrl }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Added",
            text: "Client has been added.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchClients();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Create failed.",
            confirmButtonColor: primaryColor,
          });
        }
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong.",
        confirmButtonColor: primaryColor,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (client) => {
    Swal.fire({
      title: "Delete client?",
      text: `"${client.title}" will be removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(client._id);
      try {
        const res = await fetch(`/api/clients/${client._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Client has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchClients();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to delete.",
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
        setDeletingId(null);
      }
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>
          Clients
        </Typography>
        <Button
          variant="contained"
          startIcon={<FiPlus size={18} />}
          onClick={openAddDialog}
          sx={{
            bgcolor: primaryColor,
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            py: 1,
            px: 2,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" },
          }}
        >
          Add Client
        </Button>
      </Box>

      <Box
        bgcolor="white"
        borderRadius={2}
        sx={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          overflow: "hidden",
          border: `1px solid ${bordergrayColor}`,
        }}
      >
        {loading ? (
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 1, borderRadius: 1 }} />
            ))}
          </Box>
        ) : clients.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No clients yet.
            </Typography>
            <Button
              variant="contained"
              startIcon={<FiPlus size={18} />}
              onClick={openAddDialog}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "#7A2FE5" },
              }}
            >
              Add first client
            </Button>
          </Box>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000", width: 80 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Description</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((row) => {
                const isDeleting = deletingId === row._id;
                return (
                  <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    <TableCell>
                      {row.imageUrl ? (
                        <Box
                          component="img"
                          src={row.imageUrl}
                          alt=""
                          sx={{ width: 48, height: 48, borderRadius: 1, objectFit: "cover" }}
                        />
                      ) : (
                        <Box sx={{ width: 48, height: 48, borderRadius: 1, bgcolor: bordergrayColor }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                        {row.title || "—"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", fontSize: 14, maxWidth: 320 }}>
                      {row.description ? (row.description.length > 80 ? row.description.slice(0, 80) + "…" : row.description) : "—"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => setViewingClient(row)}
                        sx={{ color: "#64748b", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}
                        aria-label="View"
                      >
                        <FiEye size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openEditDialog(row)}
                        sx={{ color: primaryColor, "&:hover": { bgcolor: "rgba(138,56,245,0.08)" } }}
                        aria-label="Edit"
                      >
                        <FiEdit2 size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        disabled={isDeleting}
                        onClick={() => handleDelete(row)}
                        sx={{ color: "#dc2626", "&:hover": { bgcolor: "rgba(220,38,38,0.08)" } }}
                        aria-label="Delete"
                      >
                        {isDeleting ? <BeatLoader color="#dc2626" size={10} /> : <FiTrash2 size={18} />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1 }}>
              Image <Typography component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>*</Typography>
            </Typography>
            {imageError && (
              <Typography sx={{ fontSize: 13, color: "#d32f2f", mb: 1 }}>
                Please upload an image.
              </Typography>
            )}
            {imagePreview ? (
              <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{ width: 120, height: 120, borderRadius: 2, objectFit: "cover", display: "block" }}
                />
                <Button
                  size="small"
                  onClick={removeImage}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    minWidth: 0,
                    width: 28,
                    height: 28,
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
                  border: imageError ? "2px dashed #d32f2f" : "2px dashed rgba(0,0,0,0.2)",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  mb: 2,
                  bgcolor: imageError ? "rgba(211,47,47,0.04)" : "transparent",
                  "&:hover": { borderColor: primaryColor },
                }}
              >
                <input type="file" accept="image/*" onChange={onImageChange} style={{ display: "none" }} />
                <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>Click to upload image</Typography>
              </Box>
            )}
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="URL (optional)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              type="url"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}
          >
            {saving ? <BeatLoader color="#fff" size={12} /> : editingClient ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={!!viewingClient}
        onClose={() => setViewingClient(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2.5 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 0 }}>
          Client details
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {viewingClient && (
            <Box>
              {viewingClient.imageUrl ? (
                <Box
                  component="img"
                  src={viewingClient.imageUrl}
                  alt={viewingClient.title}
                  sx={{
                    width: "100%",
                    maxHeight: 280,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                    display: "block",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: bordergrayColor,
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
              )}
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                Title
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#000", mb: 2 }}>
                {viewingClient.title || "—"}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                Description
              </Typography>
              <Typography sx={{ fontSize: 15, color: "rgba(0,0,0,0.8)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {viewingClient.description || "—"}
              </Typography>
              {viewingClient.url ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5, mt: 2 }}>
                    URL
                  </Typography>
                  <Box
                    component="a"
                    href={viewingClient.url.startsWith("http") ? viewingClient.url : `https://${viewingClient.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ fontSize: 15, color: primaryColor, textDecoration: "underline", "&:hover": { color: "#7A2FE5" } }}
                  >
                    {viewingClient.url}
                  </Box>
                </>
              ) : null}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            variant="contained"
            onClick={() => setViewingClient(null)}
            sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
