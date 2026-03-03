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
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiArrowLeft, FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryPage() {
  const { token } = getAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredCategories = categories.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return true;
    const name = (row.name || "").toLowerCase();
    return name.includes(q);
  });

  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchCategories = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) setCategories(data.categories);
      else setCategories([]);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openAddDialog = () => {
    setEditingCategory(null);
    setName("");
    setDialogOpen(true);
  };

  const openEditDialog = (cat) => {
    setEditingCategory(cat);
    setName(cat.name || "");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setName("");
  };

  const handleSave = async () => {
    const trimmed = (name || "").trim();
    if (!trimmed) {
      await Swal.fire({
        icon: "warning",
        title: "Name required",
        text: "Please enter a category name.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setSaving(true);
    try {
      if (editingCategory) {
        const res = await fetch(`/api/categories/${editingCategory._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmed }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Updated",
            text: "Category has been updated.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchCategories();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Update failed.",
            confirmButtonColor: primaryColor,
          });
        }
      } else {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmed }),
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Added",
            text: "Category has been added.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchCategories();
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

  const handleDelete = (category) => {
    const projectCount = category.projectCount ?? 0;
    if (projectCount > 0) {
      Swal.fire({
        icon: "warning",
        title: "Cannot delete",
        html: `"<strong>${(category.name || "").replace(/</g, "&lt;")}</strong>" is used in <strong>${projectCount}</strong> project${projectCount !== 1 ? "s" : ""}. Remove this category from those projects first, then you can delete it.`,
        confirmButtonColor: primaryColor,
        confirmButtonText: "Go to Projects",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#666",
      }).then((result) => {
        if (result.isConfirmed) router.push("/user/projects");
      });
      return;
    }
    Swal.fire({
      title: "Delete category?",
      text: `"${category.name}" will be removed. This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(category._id);
      try {
        const res = await fetch(`/api/categories/${category._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Category has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchCategories();
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
          aria-label="Back"
        >
          <FiArrowLeft size={22} />
        </Button>
        <Typography
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#000",
            m: 0,
          }}
        >
          Category
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Box sx={{ flex: "1 1 0", minWidth: 0, maxWidth: 320 }}>
          <TextField
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={18} style={{ color: "rgba(0,0,0,0.5)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
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
            <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)", mt: 0.5 }}>
              {filteredCategories.length} result{filteredCategories.length !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>
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
          Add Category
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
        ) : categories.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No categories yet.
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
              Add your first category
            </Button>
          </Box>
        ) : filteredCategories.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No results match your search.
            </Typography>
          </Box>
        ) : (
          <>
          <Box sx={{ overflowX: "auto", width: "100%" }}>
            <Table size="medium" sx={{ minWidth: 440 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Used in projects</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 120 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((row) => {
                const isDeleting = deletingId === row._id;
                const projectCount = row.projectCount ?? 0;
                return (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                        {row.name || "—"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", fontSize: 14 }}>
                      {projectCount} project{projectCount !== 1 ? "s" : ""}
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
          </Box>
          <TablePagination
            component="div"
            count={filteredCategories.length}
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
        <DialogTitle>
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            sx={{ mt: 1 }}
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
            sx={{
              bgcolor: primaryColor,
              "&:hover": { bgcolor: "#7A2FE5" },
            }}
          >
            {saving ? <BeatLoader color="#fff" size={12} /> : editingCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
