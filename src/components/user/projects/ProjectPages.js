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
} from "@/components/utils/Colors";
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
  Typography,
} from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";

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
  const [viewingProject, setViewingProject] = useState(null);
  const [viewLoadingId, setViewLoadingId] = useState(null);
  const viewClosedRef = useRef(false);

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
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

  return (
    <Box sx={{ p: 3, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: "#000",
            m: 0,
          }}
        >
          Projects
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
            fontSize: 14,
            py: 1,
            px: 2,
            borderRadius: 2,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { bgcolor: "#7A2FE5", boxShadow: "none" },
          }}
        >
          Add Project
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
                "&:hover": { bgcolor: "#7A2FE5" },
              }}
            >
              Add your first project
            </Button>
          </Box>
        ) : (
          <Table size="medium">
            <TableHead>
              <TableRow sx={{ bgcolor: bggrayColor }}>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: "#000" }}>Year</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: "#000" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => {
                const statusStyle = getStatusStyle(row.status);
                const isDeleting = deletingId === row._id;
                return (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                  >
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
        )}
      </Box>

      <Dialog
        open={!!viewingProject || !!viewLoadingId}
        onClose={closeViewDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2.5 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, pb: 0 }}>
          Project details
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
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
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                Title
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#000", mb: 1.5 }}>
                {viewingProject.title || "—"}
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 1.5 }}>
                <Box component="span" sx={{ px: 1.25, py: 0.5, borderRadius: 1, fontSize: 12, fontWeight: 600, ...getStatusStyle(viewingProject.status) }}>
                  {viewingProject.status || "—"}
                </Box>
                {viewingProject.category && (
                  <Typography component="span" sx={{ fontSize: 13, color: "rgba(0,0,0,0.7)" }}>
                    {viewingProject.category}
                  </Typography>
                )}
                {viewingProject.year && (
                  <Typography component="span" sx={{ fontSize: 13, color: "rgba(0,0,0,0.6)" }}>
                    {viewingProject.year}
                  </Typography>
                )}
              </Box>
              {viewingProject.description ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 }}>
                    Description
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "rgba(0,0,0,0.8)", lineHeight: 1.6, whiteSpace: "pre-wrap", mb: 2 }}>
                    {viewingProject.description}
                  </Typography>
                </>
              ) : null}
              {viewingProject.imageGallery?.length > 0 ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", mb: 1 }}>
                    Gallery
                  </Typography>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }}>
                    {viewingProject.imageGallery.slice(0, 8).map((url, i) => (
                      <Box
                        key={i}
                        component="img"
                        src={url}
                        alt=""
                        sx={{ width: "100%", aspectRatio: 1, borderRadius: 1, objectFit: "cover", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
                      />
                    ))}
                    {viewingProject.imageGallery.length > 8 && (
                      <Box sx={{ aspectRatio: 1, borderRadius: 1, bgcolor: bggrayColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography sx={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>
                          +{viewingProject.imageGallery.length - 8}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </>
              ) : null}
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button
            variant="contained"
            onClick={closeViewDialog}
            sx={{ bgcolor: primaryColor, "&:hover": { bgcolor: "#7A2FE5" } }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
