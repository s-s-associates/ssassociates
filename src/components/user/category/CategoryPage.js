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
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiArrowLeft, FiEdit2, FiEye, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

function newSubRow(value = "") {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    value,
  };
}

function subCategoryNamesFromDoc(cat) {
  const raw = cat?.subCategories;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => (typeof s === "string" ? s : s?.name))
    .filter(Boolean)
    .map((n) => String(n).trim())
    .filter(Boolean);
}

/** Scrollable dialog body: keeps title/actions fixed when content is long */
const dialogScrollContentSx = {
  maxHeight: { xs: "calc(100dvh - 200px)", sm: "min(70vh, 520px)" },
  overflowY: "auto",
  overflowX: "hidden",
  WebkitOverflowScrolling: "touch",
};

export default function CategoryPage() {
  const { token } = getAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");
  const [subCategoryRows, setSubCategoryRows] = useState([]);
  const [saving, setSaving] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
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
    const n = (row.name || "").toLowerCase();
    if (n.includes(q)) return true;
    return subCategoryNamesFromDoc(row).some((s) => s.toLowerCase().includes(q));
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
    setSubCategoryRows([]);
    setDialogOpen(true);
  };

  const openEditDialog = (cat) => {
    setEditingCategory(cat);
    setName(cat.name || "");
    const subs = subCategoryNamesFromDoc(cat);
    setSubCategoryRows(subs.length ? subs.map((s) => newSubRow(s)) : []);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setName("");
    setSubCategoryRows([]);
  };

  const addSubCategoryRow = () => {
    setSubCategoryRows((prev) => [...prev, newSubRow()]);
  };

  const removeSubCategoryRow = (id) => {
    setSubCategoryRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateSubCategoryRow = (id, value) => {
    setSubCategoryRows((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  };

  const openViewSubCategories = (cat) => {
    setViewCategory(cat);
  };

  const closeViewSubCategories = () => {
    setViewCategory(null);
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
    const subPayload = subCategoryRows
      .map((r) => (r.value || "").trim())
      .filter(Boolean)
      .map((n) => ({ name: n }));

    setSaving(true);
    try {
      if (editingCategory) {
        const res = await fetch(`/api/categories/${editingCategory._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmed, subCategories: subPayload }),
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
          body: JSON.stringify({ name: trimmed, subCategories: subPayload }),
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
            placeholder="Search by category or sub-category..."
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
            "&:hover": { bgcolor: primaryHover, boxShadow: "none" },
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
                "&:hover": { bgcolor: primaryHover },
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
            <Table size="medium" sx={{ minWidth: 580 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 160 }}>
                  Sub-categories
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Used in projects</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 152 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((row) => {
                const isDeleting = deletingId === row._id;
                const projectCount = row.projectCount ?? 0;
                const subCount = subCategoryNamesFromDoc(row).length;
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
                    <TableCell sx={{ fontSize: 14, fontWeight: 600, color: "#000" }}>{subCount}</TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", fontSize: 14 }}>
                      {projectCount} project{projectCount !== 1 ? "s" : ""}
                    </TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 0.25,
                        }}
                      >
                        <Tooltip title={subCount ? "View sub-categories" : "View (none yet)"}>
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => openViewSubCategories(row)}
                              aria-label={`View sub-categories: ${row.name || "category"}`}
                              sx={{
                                color: "rgba(0,0,0,0.65)",
                                "&:hover": { bgcolor: "rgba(138,56,245,0.1)", color: primaryColor },
                              }}
                            >
                              <FiEye size={18} />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Edit category">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => openEditDialog(row)}
                              sx={{ color: primaryColor, "&:hover": { bgcolor: "rgba(138,56,245,0.08)" } }}
                              aria-label="Edit category"
                            >
                              <FiEdit2 size={18} />
                            </IconButton>
                          </span>
                        </Tooltip>
                        <Tooltip title="Delete category">
                          <span>
                            <IconButton
                              size="small"
                              disabled={isDeleting}
                              onClick={() => handleDelete(row)}
                              sx={{ color: "#dc2626", "&:hover": { bgcolor: "rgba(220,38,38,0.08)" } }}
                              aria-label="Delete category"
                            >
                              {isDeleting ? (
                                <BeatLoader color="#dc2626" size={10} />
                              ) : (
                                <FiTrash2 size={18} />
                              )}
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
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

      <Dialog
        open={Boolean(viewCategory)}
        onClose={closeViewSubCategories}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="subcategories-view-title"
      >
        <DialogTitle id="subcategories-view-title" sx={{ pb: 1 }}>
          Sub-categories
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 0, px: 3, ...dialogScrollContentSx }}>
          {viewCategory &&
            (() => {
              const details = subCategoryNamesFromDoc(viewCategory);
              const count = details.length;
              const totalLabel =
                count === 0 ? "0 sub-categories" : count === 1 ? "1 sub-category" : `${count} sub-categories`;
              return (
                <>
                  <Box sx={{ mb: 2, pt: 1 }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "rgba(0,0,0,0.5)",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      Category
                    </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#000" }}>
                      {viewCategory.name || "—"}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.65)", mt: 1 }}>
                      Total:{" "}
                      <Box component="span" sx={{ fontWeight: 700, color: "#000" }}>
                        {totalLabel}
                      </Box>
                    </Typography>
                  </Box>
                  {count === 0 ? (
                    <Box
                      sx={{
                        py: 4,
                        px: 2,
                        textAlign: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(0,0,0,0.03)",
                        border: `1px dashed ${bordergrayColor}`,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.55)", mb: 1 }}>
                        No sub-categories yet.
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.45)" }}>
                        Use Edit on this row to add sub-categories.
                      </Typography>
                    </Box>
                  ) : (
                    <List
                      disablePadding
                      dense
                      sx={{
                        bgcolor: "#fafafa",
                        borderRadius: 2,
                        border: `1px solid ${bordergrayColor}`,
                        overflow: "hidden",
                        wordBreak: "break-word",
                      }}
                    >
                      {details.map((name, index) => (
                        <ListItem
                          key={`${index}-${name}`}
                          sx={{
                            py: 1.5,
                            px: 2,
                            borderBottom: index < count - 1 ? `1px solid ${bordergrayColor}` : "none",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            component="span"
                            sx={{
                              minWidth: 28,
                              fontSize: 13,
                              fontWeight: 700,
                              color: primaryColor,
                              mr: 1.5,
                              mt: 0.25,
                            }}
                          >
                            {index + 1}.
                          </Typography>
                          <ListItemText
                            primary={name}
                            primaryTypographyProps={{ fontWeight: 600, fontSize: 15, color: "#000" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </>
              );
            })()}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="contained"
            onClick={closeViewSubCategories}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: primaryColor,
              "&:hover": { bgcolor: primaryHover },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="category-form-title"
      >
        <DialogTitle id="category-form-title">
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 1, ...dialogScrollContentSx }}>
          <TextField
            autoFocus
            fullWidth
            label="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Commercial, Residential"
            sx={{ mt: 0.5 }}
          />
          <Typography sx={{ mt: 2.5, mb: 1, fontWeight: 600, fontSize: 14, color: "#000" }}>
            Sub-categories
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 13, color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}>
            Optional. Add labels used to narrow this category (e.g. Office, Retail). Duplicates are merged when you save.
          </Typography>
          <Stack spacing={1.25}>
            {subCategoryRows.map((row) => (
              <Box key={row.id} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Sub-category name"
                  value={row.value}
                  onChange={(e) => updateSubCategoryRow(row.id, e.target.value)}
                  placeholder="Name"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, bgcolor: "#fafafa" },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => removeSubCategoryRow(row.id)}
                  aria-label="Remove sub-category"
                  sx={{
                    mt: 0.5,
                    color: "rgba(0,0,0,0.45)",
                    "&:hover": { color: "#dc2626", bgcolor: "rgba(220,38,38,0.06)" },
                  }}
                >
                  <FiX size={20} />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button
            type="button"
            variant="outlined"
            startIcon={<FiPlus size={18} />}
            onClick={addSubCategoryRow}
            sx={{
              mt: 1.5,
              mb: 0.5,
              textTransform: "none",
              borderColor: bordergrayColor,
              color: primaryColor,
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": { borderColor: primaryColor, bgcolor: "rgba(138,56,245,0.04)" },
            }}
          >
            Add sub-category
          </Button>
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
              "&:hover": { bgcolor: primaryHover },
            }}
          >
            {saving ? <BeatLoader color="#fff" size={12} /> : editingCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
