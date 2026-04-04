"use client";

import {
  bggrayColor,
  bordergrayColor,
  primaryColor,
  statusGreen,
  statusGreenBg,
  statusYellow,
  statusYellowBg,
  statusRed,
  statusRedBg,
  primaryHover,
} from "@/components/utils/Colors";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  MenuItem,
  Select,
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
import { toStringArray } from "@/lib/project-challenges-solutions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiChevronDown, FiChevronUp, FiEdit2, FiEye, FiPlus, FiRefreshCw, FiSearch, FiTrash2 } from "react-icons/fi";

function formatDetailDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function DetailRow({ label, value, href }) {
  const empty = value === undefined || value === null || String(value).trim() === "";
  const text = empty ? "—" : String(value);
  return (
    <Box sx={{ py: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 0.25, sm: 2 } }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.45)", minWidth: { sm: 160 }, flexShrink: 0 }}>
        {label}
      </Typography>
      {href && !empty ? (
        <MuiLink href={href} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 14, fontWeight: 500, wordBreak: "break-word" }}>
          {text}
        </MuiLink>
      ) : (
        <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.85)", fontWeight: 500, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "Completed":
      return { color: statusGreen, bgcolor: statusGreenBg };
    case "Ongoing":
      return { color: statusYellow, bgcolor: statusYellowBg };
    case "Upcoming":
      return { color: statusRed, bgcolor: statusRedBg };
    default:
      return { color: "#666", bgcolor: "#f0f0f0" };
  }
}

export default function ProjectPages() {
  const router = useRouter();
  const { token } = getAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [reorderingId, setReorderingId] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [viewLoadingId, setViewLoadingId] = useState(null);
  const viewClosedRef = useRef(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const filteredProjects = projects.filter((row) => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      const title = (row.title || "").toLowerCase();
      const category = (row.category || "").toLowerCase();
      const status = (row.status || "").toLowerCase();
      const year = String(row.year || "").toLowerCase();
      const desc = (row.description || "").toLowerCase();
      if (!title.includes(q) && !category.includes(q) && !status.includes(q) && !year.includes(q) && !desc.includes(q)) return false;
    }
    if (dateFilter !== "all" && row.createdAt) {
      const d = new Date(row.createdAt);
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart);
      todayEnd.setHours(23, 59, 59, 999);
      if (dateFilter === "today") {
        if (d < todayStart || d > todayEnd) return false;
      } else if (dateFilter === "7") {
        const weekAgo = new Date(todayStart);
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (d < weekAgo || d > now) return false;
      } else if (dateFilter === "30") {
        const monthAgo = new Date(todayStart);
        monthAgo.setDate(monthAgo.getDate() - 30);
        if (d < monthAgo || d > now) return false;
      }
    }
    if (statusFilter !== "all" && (row.status || "") !== statusFilter) return false;
    return true;
  });

  const paginatedProjects = filteredProjects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) setProjects(data.projects);
      else setProjects([]);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleView = async (project) => {
    if (!token || !project?._id) return;
    viewClosedRef.current = false;
    setViewLoadingId(project._id);
    setViewingProject(null);
    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!viewClosedRef.current && data.success) setViewingProject(data.project);
    } catch {
      if (!viewClosedRef.current) setViewingProject(null);
    } finally {
      setViewLoadingId(null);
    }
  };

  const closeViewDialog = () => {
    viewClosedRef.current = true;
    setViewingProject(null);
    setViewLoadingId(null);
  };

  const handleDelete = (project) => {
    Swal.fire({
      title: "Delete project?",
      text: `"${project.title}" will be removed. This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: primaryColor,
      cancelButtonColor: "#666",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (!result.isConfirmed || !token) return;
      setDeletingId(project._id);
      try {
        const res = await fetch(`/api/projects/${project._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          await Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Project has been removed.",
            confirmButtonColor: primaryColor,
          });
          fetchProjects();
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

  const handleReorder = async (projectId, direction) => {
    if (!token || !projectId) return;
    setReorderingId(projectId);
    try {
      const res = await fetch("/api/projects/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId, direction }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchProjects();
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

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#000", m: 0 }}>
          Projects
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            startIcon={<FiRefreshCw size={18} />}
            onClick={() => fetchProjects()}
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
            href="/user/projects/new"
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
            Add Project
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 1,
          mb: 2,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <TextField
          placeholder="Search..."
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
            width: { xs: "100%", sm: "auto" },
            flex: { xs: "1 1 100%", sm: "none" },
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
        <FormControl size="small" sx={{ flex: { xs: "1 1 0", sm: "none" }, minWidth: { xs: 0, sm: 160 }, flexShrink: 0 }}>
          <Select
            value={dateFilter}
            displayEmpty
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(0);
            }}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: bordergrayColor },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
            }}
          >
            <MenuItem value="all">All time</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ flex: { xs: "1 1 0", sm: "none" }, minWidth: { xs: 0, sm: 140 }, flexShrink: 0 }}>
          <Select
            value={statusFilter}
            displayEmpty
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: bordergrayColor },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: primaryColor },
            }}
          >
            <MenuItem value="all">All status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
        {(searchQuery.trim() || dateFilter !== "all" || statusFilter !== "all") && (
          <Typography sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)", flexShrink: 0, whiteSpace: "nowrap", flexBasis: { xs: "100%", sm: "auto" } }}>
            {filteredProjects.length} result{filteredProjects.length !== 1 ? "s" : ""}
          </Typography>
        )}
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
        ) : projects.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15, mb: 2 }}>
              No projects yet.
            </Typography>
            <Button
              component={Link}
              href="/user/projects/new"
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
              Add your first project
            </Button>
          </Box>
        ) : filteredProjects.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(0,0,0,0.5)", fontSize: 15 }}>
              No results match your search or filter.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ overflowX: "auto", width: "100%" }}>
              <Table size="medium" sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: bggrayColor }}>
                  <TableCell sx={{ fontWeight: 700, color: "#000", width: 100, whiteSpace: "nowrap" }}>Sequence</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 140 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 120 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 100 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 80 }}>Year</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#000", whiteSpace: "nowrap", minWidth: 120 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProjects.map((row, index) => {
                const statusStyle = getStatusStyle(row.status);
                const isDeleting = deletingId === row._id;
                const isReordering = reorderingId === row._id;
                const fullListIndex = projects.findIndex((p) => String(p._id) === String(row._id));
                const canMoveUp = fullListIndex > 0;
                const canMoveDown = fullListIndex >= 0 && fullListIndex < projects.length - 1;
                return (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                  >
                    <TableCell sx={{ verticalAlign: "middle" }}>
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
                        {row.title || "—"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.category || "—"}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1.25,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: 12,
                          fontWeight: 600,
                          ...statusStyle,
                        }}
                      >
                        {row.status || "—"}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "rgba(0,0,0,0.7)" }}>{row.year || "—"}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleView(row)}
                        disabled={!!viewLoadingId}
                        sx={{ color: "#64748b", "&:hover": { bgcolor: "rgba(0,0,0,0.06)" } }}
                        aria-label="View"
                      >
                        {viewLoadingId === row._id ? (
                          <BeatLoader color="#64748b" size={10} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </IconButton>
                      <IconButton
                        component={Link}
                        href={`/user/projects/${row._id}/edit`}
                        size="small"
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
              count={filteredProjects.length}
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
        open={!!viewingProject || !!viewLoadingId}
        onClose={closeViewDialog}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{ sx: { borderRadius: 2.5, maxHeight: "min(92vh, 900px)" } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 0, pr: 6 }}>
          Project details
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            pt: 2,
            maxHeight: { xs: "calc(92vh - 140px)", sm: "min(78vh, 760px)" },
            overflowY: "auto",
          }}
        >
          {viewLoadingId ? (
            <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
              <BeatLoader color={primaryColor} size={14} />
            </Box>
          ) : viewingProject ? (
            <Box>
              {viewingProject.bannerUrl ? (
                <Box
                  component="img"
                  src={viewingProject.bannerUrl}
                  alt={viewingProject.title}
                  loading="lazy"
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
                <Box sx={{ width: "100%", height: 160, bgcolor: bordergrayColor, borderRadius: 2, mb: 2 }} />
              )}

              <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#000", mb: 0.5 }}>
                {viewingProject.title || "—"}
              </Typography>
              {viewingProject.tagline ? (
                <Typography sx={{ fontSize: 15, color: "rgba(0,0,0,0.65)", mb: 1.5 }}>{viewingProject.tagline}</Typography>
              ) : null}

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", mb: 2 }}>
                <Box
                  component="span"
                  sx={{
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    ...getStatusStyle(viewingProject.status),
                  }}
                >
                  {viewingProject.status || "—"}
                </Box>
                {viewingProject.category ? (
                  <Typography component="span" sx={{ fontSize: 13, color: "rgba(0,0,0,0.75)" }}>
                    {viewingProject.category}
                  </Typography>
                ) : null}
                {viewingProject.year ? (
                  <Typography component="span" sx={{ fontSize: 13, color: "rgba(0,0,0,0.55)" }}>
                    Year: {viewingProject.year}
                  </Typography>
                ) : null}
              </Box>

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Overview
              </Typography>
              <DetailRow label="Client" value={viewingProject.clientName} />
              <DetailRow label="Location" value={viewingProject.location} />
              <DetailRow label="Description" value={viewingProject.description} />
              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Project facts
              </Typography>
              <DetailRow
                label="Area"
                value={
                  viewingProject.projectArea
                    ? `${viewingProject.projectArea} ${viewingProject.projectAreaUnit || ""}`.trim()
                    : ""
                }
              />
              <DetailRow label="Budget" value={viewingProject.budget} />
              <DetailRow label="Duration start" value={formatDetailDate(viewingProject.durationStart)} />
              <DetailRow label="Duration end" value={formatDetailDate(viewingProject.durationEnd)} />
              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Call to action
              </Typography>
              <DetailRow label="CTA type" value={viewingProject.ctaType} />
              <DetailRow
                label="CTA link"
                value={viewingProject.ctaLink}
                href={viewingProject.ctaLink && String(viewingProject.ctaLink).trim().startsWith("http") ? viewingProject.ctaLink : undefined}
              />
              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Video
              </Typography>
              <DetailRow
                label="Video URL"
                value={viewingProject.videoUrl}
                href={viewingProject.videoUrl && String(viewingProject.videoUrl).trim().startsWith("http") ? viewingProject.videoUrl : undefined}
              />
              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Specifications
              </Typography>
              <DetailRow label="Structure type" value={viewingProject.structureType} />
              <DetailRow label="Floors" value={viewingProject.floors} />
              <DetailRow label="Materials used" value={viewingProject.materialsUsed} />
              <DetailRow label="Foundation type" value={viewingProject.foundationType} />
              <DetailRow label="Safety standards" value={viewingProject.safetyStandards} />
              <DetailRow label="Sustainability" value={viewingProject.sustainabilityFeatures} />
              <DetailRow label="Certifications" value={viewingProject.certifications} />
              <Divider sx={{ my: 2 }} />

              <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                Challenges &amp; solutions
              </Typography>
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", mb: 0.75 }}>Challenges faced</Typography>
                {toStringArray(viewingProject.challengesFaced).length ? (
                  <Box component="ul" sx={{ m: 0, pl: 2.25, color: "rgba(0,0,0,0.82)" }}>
                    {toStringArray(viewingProject.challengesFaced).map((line, i) => (
                      <Typography key={i} component="li" sx={{ mb: 0.5, fontSize: 14, whiteSpace: "pre-wrap" }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.45)" }}>—</Typography>
                )}
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", mb: 0.75 }}>Solutions implemented</Typography>
                {toStringArray(viewingProject.solutionsImplemented).length ? (
                  <Box component="ul" sx={{ m: 0, pl: 2.25, color: "rgba(0,0,0,0.82)" }}>
                    {toStringArray(viewingProject.solutionsImplemented).map((line, i) => (
                      <Typography key={i} component="li" sx={{ mb: 0.5, fontSize: 14, whiteSpace: "pre-wrap" }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.45)" }}>—</Typography>
                )}
              </Box>
              <DetailRow label="Unique engineering approach" value={viewingProject.uniqueApproach} />
              <Divider sx={{ my: 2 }} />

              {viewingProject.imageGallery?.length > 0 ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: primaryColor, letterSpacing: "0.06em", mb: 1 }}>
                    Image gallery
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                      gap: 1,
                    }}
                  >
                    {viewingProject.imageGallery.map((url, i) => (
                      <Box
                        key={`${url}-${i}`}
                        component="img"
                        src={url}
                        alt=""
                        loading="lazy"
                        sx={{
                          width: "100%",
                          aspectRatio: 1,
                          borderRadius: 1,
                          objectFit: "cover",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                        }}
                      />
                    ))}
                  </Box>
                </>
              ) : null}
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1, flexWrap: "wrap", gap: 1 }}>
          {viewingProject?._id ? (
            <Button
              component={Link}
              href={`/user/projects/${viewingProject._id}/edit`}
              onClick={closeViewDialog}
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600, borderColor: bordergrayColor, color: "#000" }}
            >
              Edit project
            </Button>
          ) : null}
          <Button variant="contained" onClick={closeViewDialog} sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: primaryHover } }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
