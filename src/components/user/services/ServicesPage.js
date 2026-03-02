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
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiEdit2, FiPlus, FiRefreshCw, FiTrash2 } from "react-icons/fi";

export default function ServicesPage() {
  const { token } = getAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginatedServices = services.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchServices = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) setServices(data.services);
      else setServices([]);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const openAddDialog = () => {
    setEditingService(null);
    setTitle("");
    setDescription("");
    setIcon("");
    setOrder(services.length);
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingService(item);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setIcon(item.icon || "");
    setOrder(typeof item.order === "number" ? item.order : 0);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingService(null);
    setTitle("");
    setDescription("");
    setIcon("");
    setOrder(0);
  };

  const handleSave = async () => {
    const trimmedTitle = (title || "").trim();
    if (!trimmedTitle) {
      await Swal.fire({
        icon: "warning",
        title: "Title required",
        text: "Please enter a service title.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: trimmedTitle,
        description: (description || "").trim(),
        icon: (icon || "").trim(),
        order: Number(order) || 0,
      };
      if (editingService) {
        const res = await fetch(`/api/services/${editingService._id}`, {
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
          closeDialog();
          fetchServices();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Update failed.",
            confirmButtonColor: primaryColor,
          });
        }
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
          closeDialog();
          fetchServices();
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

  const handleDelete = (item) => {
    Swal.fire({
      title: "Delete service?",
      text: `"${item.title}" will be removed. This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(item._id);
      try {
        const res = await fetch(`/api/services/${item._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Service has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchServices();
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
          Services
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            startIcon={<FiRefreshCw size={18} />}
            onClick={() => fetchServices()}
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
            Add Service
          </Button>
        </Box>
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
        ) : services.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No services yet.
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
              Add your first service
            </Button>
          </Box>
        ) : (
          <>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Order</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Description</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedServices.map((row) => {
                  const isDeleting = deletingId === row._id;
                  return (
                    <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                      <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.order ?? "—"}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                          {row.title || "—"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 320 }}>
                        {row.description ? (row.description.length > 60 ? row.description.slice(0, 60) + "…" : row.description) : "—"}
                      </TableCell>
                      <TableCell align="right">
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
            <TablePagination
              component="div"
              count={services.length}
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
        <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Service title"
            required
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Icon (optional)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Icon name or emoji"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Order"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value) || 0)}
            inputProps={{ min: 0 }}
            sx={{ mb: 1 }}
          />
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
            {saving ? <BeatLoader color="#fff" size={12} /> : editingService ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
