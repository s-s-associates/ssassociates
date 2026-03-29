"use client";

import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import {
  Box,
  Button,
  Dialog,
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
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiChevronDown, FiChevronUp, FiEdit2, FiEye, FiPlus, FiRefreshCw, FiSearch, FiTrash2, FiX } from "react-icons/fi";

export default function ServicesPage() {
  const { token } = getAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [reorderingId, setReorderingId] = useState(null);
  const [viewService, setViewService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredServices = React.useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return services;
    return services.filter(
      (s) =>
        (s.title || "").toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q)
    );
  }, [services, searchQuery]);

  React.useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const paginatedServices = filteredServices.slice(
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

  const handleReorder = async (serviceId, direction) => {
    if (!token || !serviceId) return;
    setReorderingId(serviceId);
    try {
      const res = await fetch("/api/services/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId, direction }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchServices();
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
            component={Link}
            href="/user/services/new"
            variant="contained"
            startIcon={<FiPlus size={18} />}
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
            Add Service
          </Button>
        </Box>
      </Box>

      {!loading && services.length > 0 && (
        <TextField
          fullWidth
          size="small"
          placeholder="Search by title or description…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch size={18} style={{ color: "rgba(0,0,0,0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            maxWidth: 360,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#fff",
              borderRadius: 2,
              "& fieldset": { borderColor: bordergrayColor },
              "&:hover fieldset": { borderColor: primaryColor },
              "&.Mui-focused fieldset": { borderColor: primaryColor },
            },
          }}
        />
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
        ) : services.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No services yet.
            </Typography>
            <Button
              component={Link}
              href="/user/services/new"
              variant="contained"
              startIcon={<FiPlus size={18} />}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                  "&:hover": { bgcolor: primaryHover },
              }}
            >
              Add your first service
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ overflowX: "auto", width: "100%", WebkitOverflowScrolling: "touch" }}>
              <Table size="medium" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000", width: 100 }}>Sequence</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000" }}>Description</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 4, textAlign: "center", color: "rgba(0,0,0,0.5)" }}>
                      No services match your search. Try a different keyword.
                    </TableCell>
                  </TableRow>
                ) : (
                paginatedServices.map((row, index) => {
                  const isDeleting = deletingId === row._id;
                  const isReordering = reorderingId === row._id;
                  const globalIndex = page * rowsPerPage + index;
                  const canMoveUp = globalIndex > 0;
                  const canMoveDown = globalIndex < filteredServices.length - 1;
                  return (
                    <TableRow key={row._id} sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.02)" } }}>
                      <TableCell sx={{ color: "rgba(0,0,0,0.7)", verticalAlign: "middle" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "nowrap",
                            gap: 0.25,
                          }}
                        >
                          <IconButton
                            size="small"
                            disabled={!canMoveUp || isReordering}
                            onClick={() => handleReorder(row._id, "up")}
                            sx={{
                              color: canMoveUp ? primaryColor : "rgba(0,0,0,0.26)",
                              "&:hover": canMoveUp ? { bgcolor: "rgba(239,71,0,0.08)" } : {},
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
                              "&:hover": canMoveDown ? { bgcolor: "rgba(239,71,0,0.08)" } : {},
                            }}
                            aria-label="Move down"
                          >
                            <FiChevronDown size={20} />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "middle" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          {row.imageUrl ? (
                            <Box
                              component="img"
                              src={row.imageUrl}
                              alt=""
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                objectFit: "cover",
                                border: `1px solid ${bordergrayColor}`,
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                bgcolor: bggrayColor,
                                border: `1px dashed ${bordergrayColor}`,
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.35)", fontSize: 10 }}>
                                No img
                              </Typography>
                            </Box>
                          )}
                          <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#000" }}>
                            {row.title || "—"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "rgba(0,0,0,0.7)", maxWidth: 320 }}>
                        {row.description ? (row.description.length > 60 ? row.description.slice(0, 60) + "…" : row.description) : "—"}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          verticalAlign: "middle",
                          whiteSpace: "nowrap",
                          width: "1%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexWrap: "nowrap",
                            gap: { xs: 0, sm: 0.25 },
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => setViewService(row)}
                            sx={{
                              color: "rgba(0,0,0,0.6)",
                              flexShrink: 0,
                              p: { xs: "4px", sm: "8px" },
                              "&:hover": { bgcolor: "rgba(0,0,0,0.06)" },
                            }}
                            aria-label="View"
                          >
                            <FiEye size={18} />
                          </IconButton>
                          <IconButton
                            component={Link}
                            href={`/user/services/${row._id}/edit`}
                            size="small"
                            sx={{
                              color: primaryColor,
                              flexShrink: 0,
                              p: { xs: "4px", sm: "8px" },
                              "&:hover": { bgcolor: "rgba(138,56,245,0.08)" },
                            }}
                            aria-label="Edit"
                          >
                            <FiEdit2 size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            disabled={isDeleting}
                            onClick={() => handleDelete(row)}
                            sx={{
                              color: "#dc2626",
                              flexShrink: 0,
                              p: { xs: "4px", sm: "8px" },
                              "&:hover": { bgcolor: "rgba(220,38,38,0.08)" },
                            }}
                            aria-label="Delete"
                          >
                            {isDeleting ? <BeatLoader color="#dc2626" size={10} /> : <FiTrash2 size={18} />}
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
                )}
              </TableBody>
            </Table>
            </Box>
            <TablePagination
              component="div"
              count={filteredServices.length}
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
        open={Boolean(viewService)}
        onClose={() => setViewService(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
            border: `1px solid ${bordergrayColor}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 18,
            borderBottom: `1px solid ${bordergrayColor}`,
            py: 2,
            pr: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{viewService?.title || "Service details"}</span>
          <IconButton
            size="small"
            onClick={() => setViewService(null)}
            sx={{
              position: "absolute",
              right: 8,
              top: 12,
              color: "rgba(0,0,0,0.6)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.06)", color: "#000" },
            }}
            aria-label="Close"
          >
            <FiX size={22} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ p: 2, pb: 3 }}>
            {viewService?.imageUrl && (
              <Box
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: `1px solid ${bordergrayColor}`,
                  bgcolor: bggrayColor,
                }}
              >
                <Box
                  component="img"
                  src={viewService.imageUrl}
                  alt={viewService.title}
                  sx={{
                    display: "block",
                    width: "100%",
                    maxHeight: 280,
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
            {viewService?.description && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.8)", mb: 0.5 }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", whiteSpace: "pre-wrap" }}>
                  {viewService.description}
                </Typography>
              </Box>
            )}
            {Array.isArray(viewService?.whatYouGet) && viewService.whatYouGet.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.8)", mb: 0.5 }}>
                  What you will get
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                  {viewService.whatYouGet.map((point, i) => (
                    <Typography key={i} component="li" variant="body2" sx={{ color: "rgba(0,0,0,0.7)", mb: 0.5 }}>
                      {point}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
            {Array.isArray(viewService?.extraBenefits) && viewService.extraBenefits.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.8)", mb: 0.5 }}>
                  Extra benefits
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                  {viewService.extraBenefits.map((point, i) => (
                    <Typography key={i} component="li" variant="body2" sx={{ color: "rgba(0,0,0,0.7)", mb: 0.5 }}>
                      {point}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
            {viewService?.conclusion && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.8)", mb: 0.5 }}>
                  Conclusion
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", whiteSpace: "pre-wrap" }}>
                  {viewService.conclusion}
                </Typography>
              </Box>
            )}
            {Array.isArray(viewService?.subServices) && viewService.subServices.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "rgba(0,0,0,0.8)", mb: 1 }}>
                  Sub services
                </Typography>
                {viewService.subServices.map((sub, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: 1.5,
                      border: `1px solid ${bordergrayColor}`,
                      bgcolor: bggrayColor,
                    }}
                  >
                    {sub.title && (
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#000", mb: 0.5 }}>
                        {sub.title}
                      </Typography>
                    )}
                    {sub.description && (
                      <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", mb: 1, whiteSpace: "pre-wrap" }}>
                        {sub.description}
                      </Typography>
                    )}
                    {Array.isArray(sub.items) && sub.items.length > 0 && (
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {sub.items.map((item, i) => (
                          <Typography key={i} component="li" variant="caption" sx={{ color: "rgba(0,0,0,0.7)" }}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
