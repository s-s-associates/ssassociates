"use client";

import { bggrayColor } from "@/components/utils/Colors";
import ProjectForm from "@/components/user/projects/ProjectForm";
import { getAuth } from "@/lib/auth-storage";
import { Box, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export default function EditProjectPage({ params }) {
  const router = useRouter();
  const { token } = getAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(() => (params && typeof params.then !== "function" ? params.id : null));

  useEffect(() => {
    if (params && typeof params.then === "function") {
      params.then((p) => {
        const resolvedId = p?.id ?? null;
        setId(resolvedId);
        if (resolvedId) setLoading(true);
      });
    }
  }, [params]);

  const fetchProject = useCallback(async () => {
    if (!token || !id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProject(data.project);
      else setProject(null);
    } catch {
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleSuccess = () => {
    router.push("/user/projects");
  };

  if (!id && params && typeof params.then === "function") {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        <BeatLoader color="#8A38F5" size={14} />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: "#666" }}>Project not found.</Typography>
      </Box>
    );
  }

  return (
    <ProjectForm
      projectId={id}
      initialData={project}
      onSuccess={handleSuccess}
    />
  );
}
