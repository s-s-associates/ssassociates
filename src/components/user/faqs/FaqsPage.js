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
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiChevronDown, FiChevronUp, FiEdit2, FiEye, FiPlus, FiRefreshCw, FiSearch, FiTrash2 } from "react-icons/fi";

export default function FaqsPage() {
  const { token } = getAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [reorderingId, setReorderingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredFaqs = faqs.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return true;
    const questionStr = (row.question || "").toLowerCase();
    const answerStr = (row.answer || "").toLowerCase();
    return questionStr.includes(q) || answerStr.includes(q);
  });

  const paginatedFaqs = filteredFaqs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchFaqs = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/faqs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.faqs)) setFaqs(data.faqs);
      else setFaqs([]);
    } catch {
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const openAddDialog = () => {
    setEditingItem(null);
    setQuestion("");
    setAnswer("");
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditingItem(item);
    setQuestion(item.question || "");
    setAnswer(item.answer || "");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setQuestion("");
    setAnswer("");
  };

  const handleReorder = async (faqId, direction) => {
    if (!token || !faqId) return;
    setReorderingId(faqId);
    try {
      const res = await fetch("/api/faqs/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ faqId, direction }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchFaqs();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Could not change sequence.",
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
    } finally {
      setReorderingId(null);
    }
  };

  const handleSave = async () => {
    const trimmedQuestion = (question || "").trim();
    const trimmedAnswer = (answer || "").trim();
    if (!trimmedQuestion) {
      await Swal.fire({
        icon: "warning",
        title: "Question required",
        text: "Please enter the question.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    if (!trimmedAnswer) {
      await Swal.fire({
        icon: "warning",
        title: "Answer required",
        text: "Please enter the answer.",
        confirmButtonColor: primaryColor,
      });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        question: trimmedQuestion,
        answer: trimmedAnswer,
      };
      if (editingItem) {
        const res = await fetch(`/api/faqs/${editingItem._id}`, {
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
            text: "FAQ has been updated.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchFaqs();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Update failed.",
            confirmButtonColor: primaryColor,
          });
        }
      } else {
        payload.order = faqs.length;
        const res = await fetch("/api/faqs", {
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
            text: "FAQ has been added.",
            confirmButtonColor: primaryColor,
          });
          closeDialog();
          fetchFaqs();
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
      title: "Delete FAQ?",
      text: "This question will be removed. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(item._id);
      try {
        const res = await fetch(`/api/faqs/${item._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "FAQ has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchFaqs();
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
          FAQs
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            startIcon={<FiRefreshCw size={18} />}
            onClick={() => fetchFaqs()}
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
              "&:hover": { bgcolor: primaryHover, boxShadow: "none" },
            }}
          >
            Add FAQ
          </Button>
        </Box>
      </Box>

      {faqs.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: 1.5, mb: 2, alignItems: "center", overflow: "hidden" }}>
          <TextField
            placeholder="Search by question or answer..."
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
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>
      )}

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
        ) : faqs.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No FAQs yet.
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
              Add your first FAQ
            </Button>
          </Box>
        ) : filteredFaqs.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No results match your search.
            </Typography>
          </Box>
        ) : (
          <>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000", width: 100 }}>Sequence</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Question</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Answer</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedFaqs.map((row, index) => {
                  const isDeleting = deletingId === row._id;
                  const isReordering = reorderingId === row._id;
                  const fullListIndex = faqs.findIndex((f) => String(f._id) === String(row._id));
                  const canMoveUp = fullListIndex > 0;
                  const canMoveDown = fullListIndex >= 0 && fullListIndex < faqs.length - 1;
                return (
                  <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", verticalAlign: "middle" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                        <IconButton
                          size="small"
                          disabled={!canMoveUp || isReordering}
                          onClick={() => handleReorder(row._id, "up")}
                          sx={{
                            color: canMoveUp ? primaryColor : "rgba(0,0,0,0.26)",
                            "&:hover": canMoveUp ? { bgcolor: "rgba(138,56,245,0.08)" } : {},
                          }}
                          aria-label="Move up"
                        >
                          <FiChevronUp size={20} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={!canMoveDown || isReordering}
                          onClick={() => handleReorder(row._id, "down")}
                          sx={{
                            color: canMoveDown ? primaryColor : "rgba(0,0,0,0.26)",
                            "&:hover": canMoveDown ? { bgcolor: "rgba(138,56,245,0.08)" } : {},
                          }}
                          aria-label="Move down"
                        >
                          <FiChevronDown size={20} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                        {row.question ? (row.question.length > 50 ? row.question.slice(0, 50) + "…" : row.question) : "—"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 280 }}>
                      {row.answer ? (row.answer.length > 50 ? row.answer.slice(0, 50) + "…" : row.answer) : "—"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => setViewingItem(row)}
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
          <TablePagination
            component="div"
            count={filteredFaqs.length}
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
        <DialogTitle>{editingItem ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Frequently asked question"
            required
            sx={{ mt: 1, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            required
            multiline
            rows={4}
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
            sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}
          >
            {saving ? <BeatLoader color="#fff" size={12} /> : editingItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!viewingItem} onClose={() => setViewingItem(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2.5 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 0 }}>
          FAQ
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {viewingItem && (
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                Question
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#000", mb: 2 }}>
                {viewingItem.question || "—"}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                Answer
              </Typography>
              <Typography sx={{ fontSize: 15, color: "rgba(0,0,0,0.8)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {viewingItem.answer || "—"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button variant="contained" onClick={() => setViewingItem(null)} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
