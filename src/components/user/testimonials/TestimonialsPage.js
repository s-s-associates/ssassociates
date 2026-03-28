"use client";

import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiEdit2, FiEye, FiPlus, FiRefreshCw, FiSearch, FiTrash2, FiUploadCloud } from "react-icons/fi";

const ACCEPT_IMAGES = "image/jpeg,image/png,image/webp,image/gif";
const CLOUDINARY_FOLDER = "ssassociates/testimonials";

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

function revokeIfBlobUrl(url) {
  if (url && typeof url === "string" && url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

export default function TestimonialsPage() {
  const { token } = getAuth();
  const fileInputRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredTestimonials = testimonials.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return true;
    const name = (row.clientName || "").toLowerCase();
    const roleStr = (row.role || "").toLowerCase();
    const company = (row.companyName || "").toLowerCase();
    const contentStr = (row.content || "").toLowerCase();
    return name.includes(q) || roleStr.includes(q) || company.includes(q) || contentStr.includes(q);
  });

  const paginatedTestimonials = filteredTestimonials.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchTestimonials = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
      else setTestimonials([]);
    } catch {
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const openAddDialog = () => {
    setEditingItem(null);
    setClientName("");
    setRole("");
    setCompanyName("");
    setContent("");
    setRating(0);
    setImageFile(null);
    setImagePreview("");
    setImageRemoved(false);
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setClientName(item.clientName || "");
    setRole(item.role || "");
    setCompanyName(item.companyName || "");
    setContent(item.content || "");
    setRating(Math.min(5, Math.max(0, Number(item.rating) || 0)));
    setImageFile(null);
    setImagePreview((item.imageUrl || "").trim());
    setImageRemoved(false);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    revokeIfBlobUrl(imagePreview);
    setDialogOpen(false);
    setEditingItem(null);
    setClientName("");
    setRole("");
    setCompanyName("");
    setContent("");
    setRating(0);
    setImageFile(null);
    setImagePreview("");
    setImageRemoved(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid file",
        text: "Please choose an image (JPEG, PNG, WebP, or GIF).",
        confirmButtonColor: primaryColor,
      });
      event.target.value = "";
      return;
    }
    revokeIfBlobUrl(imagePreview);
    setImageFile(file);
    setImageRemoved(false);
    setImagePreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const clearSelectedImage = () => {
    revokeIfBlobUrl(imagePreview);
    setImageFile(null);
    setImagePreview("");
    setImageRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    const trimmedName = (clientName || "").trim();
    const trimmedContent = (content || "").trim();
    if (!trimmedName) {
      await Swal.fire({ icon: "warning", title: "Client name required", text: "Please enter the client name.", confirmButtonColor: primaryColor });
      return;
    }
    if (!trimmedContent) {
      await Swal.fire({ icon: "warning", title: "Content required", text: "Please enter the testimonial quote/content.", confirmButtonColor: primaryColor });
      return;
    }
    setSaving(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(token, imageFile);
      } else if (!imageRemoved) {
        imageUrl = (editingItem?.imageUrl || "").trim();
      }
      const payload = {
        clientName: trimmedName,
        role: (role || "").trim(),
        companyName: (companyName || "").trim(),
        content: trimmedContent,
        imageUrl,
        rating: Math.min(5, Math.max(0, Number(rating) || 0)),
      };
      if (editingItem) {
        const res = await fetch(`/api/testimonials/${editingItem._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({ icon: "success", title: "Updated", text: "Testimonial has been updated.", confirmButtonColor: primaryColor });
          closeDialog();
          fetchTestimonials();
        } else {
          await Swal.fire({ icon: "error", title: "Error", text: data.message || "Update failed.", confirmButtonColor: primaryColor });
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({ icon: "success", title: "Added", text: "Testimonial has been added.", confirmButtonColor: primaryColor });
          closeDialog();
          fetchTestimonials();
        } else {
          await Swal.fire({ icon: "error", title: "Error", text: data.message || "Create failed.", confirmButtonColor: primaryColor });
        }
      }
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong.", confirmButtonColor: primaryColor });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete testimonial?",
      text: `"${item.clientName}" will be removed. This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(item._id);
      try {
        const res = await fetch(`/api/testimonials/${item._id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({ icon: "success", title: "Deleted", text: "Testimonial has been removed.", confirmButtonColor: primaryColor });
          fetchTestimonials();
        } else {
          await Swal.fire({ icon: "error", title: "Error", text: data.message || "Failed to delete.", confirmButtonColor: primaryColor });
        }
      } catch (err) {
        await Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong.", confirmButtonColor: primaryColor });
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>Testimonials</Typography>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            startIcon={<FiRefreshCw size={18} />}
            onClick={() => fetchTestimonials()}
            disabled={loading}
            variant="outlined"
            size="small"
            sx={{
              borderColor: bordergrayColor,
              color: "#000",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: primaryColor,
                color: primaryColor,
                bgcolor: "rgba(138,56,245,0.06)",
              },
            }}
          >
            Refresh
          </Button>
          <Button variant="contained" startIcon={<FiPlus size={18} />} onClick={openAddDialog} sx={{ bgcolor: primaryColor, color: "#fff", fontWeight: 600, fontSize: 14, py: 1, px: 2, borderRadius: 2, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: primaryHover, boxShadow: "none" } }}>
            Add Testimonial
          </Button>
        </Box>
      </Box>

      {testimonials.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1.5, mb: 2, alignItems: "center", overflow: "hidden" }}>
          <TextField
            placeholder="Search by client, role, company, content..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={18} style={{ color: "rgba(0,0,0,0.5)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: { xs: "1 1 0", sm: "none" },
              minWidth: 0,
              "& .MuiOutlinedInput-input": { minWidth: 0 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "#fff",
                "& fieldset": { borderColor: bordergrayColor },
                "&:hover fieldset": { borderColor: primaryColor },
                "&.Mui-focused fieldset": { borderColor: primaryColor, borderWidth: 2 },
              },
            }}
          />
          {searchQuery.trim() && (
            <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)", flexShrink: 0, whiteSpace: "nowrap" }}>
              {filteredTestimonials.length} result{filteredTestimonials.length !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>
      )}

      <Box bgcolor="white" borderRadius={2} sx={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", overflow: "hidden", border: `1px solid ${bordergrayColor}` }}>
        {loading ? (
          <Box sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 1, borderRadius: 1 }} />
            ))}
          </Box>
        ) : testimonials.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>No testimonials yet.</Typography>
            <Button variant="contained" startIcon={<FiPlus size={18} />} onClick={openAddDialog} sx={{ bgcolor: primaryColor, color: "#fff", fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: primaryHover } }}>
              Add your first testimonial
            </Button>
          </Box>
        ) : filteredTestimonials.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>No results match your search.</Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ overflowX: "auto", width: "100%", WebkitOverflowScrolling: "touch" }}>
              <Table size="medium" sx={{ minWidth: 640 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Client</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Company</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Stars</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Content</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTestimonials.map((row) => {
                const isDeleting = deletingId === row._id;
                const stars = Math.min(5, Math.max(0, Number(row.rating) || 0));
                return (
                  <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>{row.clientName || "—"}</Typography></TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.role || "—"}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.companyName || "—"}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.8)" }}>
                      <Typography component="span" sx={{ fontSize: 14 }}>
                        {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                      </Typography>
                      {stars > 0 && (
                        <Typography component="span" variant="caption" sx={{ ml: 0.5, color: "rgba(0,0,0,0.5)" }}>
                          ({stars})
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 280 }}>{row.content ? (row.content.length > 50 ? row.content.slice(0, 50) + "…" : row.content) : "—"}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => setViewingItem(row)} sx={{ color: "#64748b", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }} aria-label="View"><FiEye size={18} /></IconButton>
                      <IconButton size="small" onClick={() => openEditDialog(row)} sx={{ color: primaryColor, "&:hover": { bgcolor: "rgba(138,56,245,0.08)" } }} aria-label="Edit"><FiEdit2 size={18} /></IconButton>
                      <IconButton size="small" disabled={isDeleting} onClick={() => handleDelete(row)} sx={{ color: "#dc2626", "&:hover": { bgcolor: "rgba(220,38,38,0.08)" } }} aria-label="Delete">
                        {isDeleting ? <BeatLoader color="#dc2626" size={10} /> : <FiTrash2 size={18} />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
            </Box>
          <TablePagination
            component="div"
            count={filteredTestimonials.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{
              borderTop: `1px solid ${bordergrayColor}`,
              bgcolor: bggrayColor,
              "& .MuiTablePagination-selectLabel": { fontSize: 14, color: "rgba(0,0,0,0.7)" },
              "& .MuiTablePagination-displayedRows": { fontSize: 14, color: "#000", fontWeight: 500 },
              "& .MuiTablePagination-select": { fontSize: 14 },
              "& .MuiIconButton-root": {
                color: "rgba(0,0,0,0.7)",
                "&:hover": { bgcolor: "rgba(138,56,245,0.08)", color: primaryColor },
                "&.Mui-disabled": { color: "rgba(0,0,0,0.26)" },
              },
            }}
          />
        </>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.72)", mb: 1.2, mt: 1 }}>
            Client image (optional)
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_IMAGES}
            onChange={handleImageSelect}
            style={{ display: "none" }}
          />
          {imagePreview ? (
            <Box
              sx={{
                position: "relative",
                width: 110,
                height: 110,
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${bordergrayColor}`,
                mb: 2,
              }}
            >
              <Box component="img" src={imagePreview} alt="Client preview" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <IconButton
                size="small"
                onClick={clearSelectedImage}
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.82)" },
                }}
                aria-label="Remove selected image"
              >
                <FiTrash2 size={16} />
              </IconButton>
            </Box>
          ) : (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: `2px dashed ${bordergrayColor}`,
                borderRadius: 2,
                py: 2.2,
                px: 2,
                mb: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s, background-color 0.2s",
                "&:hover": {
                  borderColor: primaryColor,
                  bgcolor: "rgba(138,56,245,0.06)",
                },
              }}
            >
              <FiUploadCloud size={28} style={{ color: primaryColor, marginBottom: 8 }} />
              <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.68)" }}>
                Drop image here or click to browse
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.5)" }}>
                JPEG, PNG, WebP or GIF
              </Typography>
            </Box>
          )}
          <TextField autoFocus fullWidth label="Client name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name of the person" required sx={{ mt: 1, mb: 2 }} />
          <TextField fullWidth label="Role / Designation" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. CEO, Manager" sx={{ mb: 2 }} />
          <TextField fullWidth label="Company name (optional)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" sx={{ mb: 2 }} />
          <TextField fullWidth label="Quote / Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Testimonial text" required multiline rows={4} sx={{ mb: 2 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "rgba(0,0,0,0.7)", mb: 1 }}>Rating (choose stars)</Typography>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", mb: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                size="small"
                onClick={() => setRating(rating === star ? 0 : star)}
                sx={{ p: 0.5, color: star <= rating ? "#f59e0b" : "rgba(0,0,0,0.25)", "&:hover": { bgcolor: "rgba(245,158,11,0.08)" } }}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                <Typography component="span" sx={{ fontSize: 28, lineHeight: 1 }}>{star <= rating ? "★" : "☆"}</Typography>
              </IconButton>
            ))}
            <Typography variant="caption" sx={{ ml: 1, color: "rgba(0,0,0,0.5)" }}>{rating > 0 ? `${rating}/5` : "0–5 (optional)"}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>
            {saving ? <BeatLoader color="#fff" size={12} /> : editingItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!viewingItem} onClose={() => setViewingItem(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2.5 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 0 }}>Testimonial</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {viewingItem && (
            <Box>
              {viewingItem.imageUrl ? <Box component="img" src={viewingItem.imageUrl} alt={viewingItem.clientName} sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover", mb: 2, display: "block" }} /> : null}
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>Client</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#000", mb: 1 }}>{viewingItem.clientName || "—"}</Typography>
              {viewingItem.role ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", mb: 0.5 }}>Role</Typography>
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.8)", mb: 1 }}>{viewingItem.role}</Typography>
                </>
              ) : null}
              {viewingItem.companyName ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", mb: 0.5 }}>Company</Typography>
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.8)", mb: 1 }}>{viewingItem.companyName}</Typography>
                </>
              ) : null}
              {(() => {
                const viewStars = Math.min(5, Math.max(0, Number(viewingItem.rating) || 0));
                return viewStars > 0 ? (
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", mb: 0.5 }}>Rating</Typography>
                    <Typography sx={{ fontSize: 16, color: "#000" }}>{"★".repeat(viewStars)}{"☆".repeat(5 - viewStars)} ({viewStars})</Typography>
                  </Box>
                ) : null;
              })()}
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>Quote</Typography>
              <Typography sx={{ fontSize: 15, color: "rgba(0,0,0,0.8)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{viewingItem.content || "—"}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button variant="contained" onClick={() => setViewingItem(null)} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
