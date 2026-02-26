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
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

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
    </Box>
  );
}
