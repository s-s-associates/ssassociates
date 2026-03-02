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

export default function TestimonialsPage() {
  const { token } = getAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [clientName, setClientName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

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
    setContent("");
    setOrder(testimonials.length);
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setClientName(item.clientName || "");
    setRole(item.role || "");
    setContent(item.content || "");
    setOrder(typeof item.order === "number" ? item.order : 0);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setClientName("");
    setRole("");
    setContent("");
    setOrder(0);
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
      const payload = { clientName: trimmedName, role: (role || "").trim(), content: trimmedContent, order: Number(order) || 0 };
      if (editingItem) {
        if (editingItem.imageUrl) payload.imageUrl = editingItem.imageUrl;
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
        <Button variant="contained" startIcon={<FiPlus size={18} />} onClick={openAddDialog} sx={{ bgcolor: primaryColor, color: "#fff", fontWeight: 600, fontSize: 14, py: 1, px: 2, borderRadius: 2, textTransform: "none", boxShadow: "none", "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" } }}>
          Add Testimonial
        </Button>
      </Box>

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
            <Button variant="contained" startIcon={<FiPlus size={18} />} onClick={openAddDialog} sx={{ bgcolor: primaryColor, color: "#fff", fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: "#7A2FE5" } }}>
              Add your first testimonial
            </Button>
          </Box>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Client</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Content</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials.map((row) => {
                const isDeleting = deletingId === row._id;
                return (
                  <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    <TableCell><Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>{row.clientName || "—"}</Typography></TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.role || "—"}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 320 }}>{row.content ? (row.content.length > 60 ? row.content.slice(0, 60) + "…" : row.content) : "—"}</TableCell>
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
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth label="Client name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name of the person" required sx={{ mt: 1, mb: 2 }} />
          <TextField fullWidth label="Role / Designation" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. CEO, Manager" sx={{ mb: 2 }} />
          <TextField fullWidth label="Quote / Content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Testimonial text" required multiline rows={4} sx={{ mb: 2 }} />
          <TextField fullWidth type="number" label="Order" value={order} onChange={(e) => setOrder(Number(e.target.value) || 0)} inputProps={{ min: 0 }} sx={{ mb: 1 }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}>
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
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.8)", mb: 2 }}>{viewingItem.role}</Typography>
                </>
              ) : null}
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>Quote</Typography>
              <Typography sx={{ fontSize: 15, color: "rgba(0,0,0,0.8)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{viewingItem.content || "—"}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button variant="contained" onClick={() => setViewingItem(null)} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
