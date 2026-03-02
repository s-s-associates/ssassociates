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
import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

const adminSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string().email("Valid email required").required("Email is required"),
  password: Yup.string()
    .when("isEdit", {
      is: (v) => !v,
      then: (s) => s.required("Password is required").min(6, "At least 6 characters"),
      otherwise: (s) => s.min(6, "At least 6 characters").transform((v) => v || null).nullable(),
    }),
  isEdit: Yup.boolean().optional(),
});

export default function AdminsPage() {
  const { token } = getAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const fetchAdmins = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("/api/admins", { headers });
      const data = await res.json();
      if (data.success && Array.isArray(data.admins)) setAdmins(data.admins);
      else setAdmins([]);
    } catch {
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAdmins(true);
  }, [fetchAdmins]);

  const openAddDialog = () => {
    setEditingAdmin(null);
    setDialogOpen(true);
  };

  const openEditDialog = (admin) => {
    setEditingAdmin(admin);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingAdmin(null);
  };

  const handleSave = async (values, setSubmitting) => {
    const name = (values.name || "").trim();
    const email = (values.email || "").toLowerCase().trim();
    const password = (values.password || "").trim();
    setSubmitting?.(true);
    if (!name || !email) {
      await Swal.fire({
        icon: "warning",
        title: "Required fields",
        text: "Name and email are required.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    if (!editingAdmin && (!password || password.length < 6)) {
      await Swal.fire({
        icon: "warning",
        title: "Password required",
        text: "Password must be at least 6 characters.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    try {
      if (editingAdmin) {
        const body = { name, email };
        if (password) body.password = password;
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`/api/admins/${editingAdmin._id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Admin has been updated.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchAdmins(false);
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Update failed.",
            confirmButtonColor: primaryColor,
          });
        }
      } else {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch("/api/admins", {
          method: "POST",
          headers,
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Added",
            text: "Admin has been added. They can now log in.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchAdmins(false);
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
      setSubmitting?.(false);
    }
  };

  const handleDelete = (admin) => {
    Swal.fire({
      title: "Delete admin?",
      text: `"${admin.name}" will be removed and will no longer be able to log in.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      setDeletingId(admin._id);
      try {
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        const res = await fetch(`/api/admins/${admin._id}`, {
          method: "DELETE",
          headers,
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Admin has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchAdmins(false);
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

  const initialForm = editingAdmin
    ? { name: editingAdmin.name || "", email: editingAdmin.email || "", password: "", isEdit: true }
    : { name: "", email: "", password: "", isEdit: false };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography
          component="h1"
          sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}
        >
          Admins
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
          Add Admin
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
        ) : admins.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No admins yet. Add one to enable login.
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
              Add first admin
            </Button>
          </Box>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Email</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((row) => {
                const isDeleting = deletingId === row._id;
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}
                  >
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                        {row.name || "—"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.email || "—"}</TableCell>
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
                        {isDeleting ? (
                          <BeatLoader color="#dc2626" size={10} />
                        ) : (
                          <FiTrash2 size={18} />
                        )}
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
        <DialogTitle>{editingAdmin ? "Edit Admin" : "Add Admin"}</DialogTitle>
        <DialogContent>
          <Formik
            key={editingAdmin?._id ?? "new"}
            initialValues={initialForm}
            validationSchema={adminSchema}
            onSubmit={(values, { setSubmitting }) => handleSave(values, setSubmitting)}
            enableReinitialize
          >
            {(formik) => (
              <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  disabled={!!editingAdmin}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label={editingAdmin ? "New password (leave blank to keep)" : "Password"}
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 2 }}
                />
                <DialogActions sx={{ px: 0, pb: 0 }}>
                  <Button onClick={closeDialog} color="inherit">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={formik.isSubmitting}
                    sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}
                  >
                    {formik.isSubmitting ? (
                      <BeatLoader color="#fff" size={12} />
                    ) : editingAdmin ? (
                      "Update"
                    ) : (
                      "Add"
                    )}
                  </Button>
                </DialogActions>
              </Box>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
