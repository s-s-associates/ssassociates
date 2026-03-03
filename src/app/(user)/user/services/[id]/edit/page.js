"use client";

import ServiceForm from "@/components/user/services/ServiceForm";
import { bggrayColor } from "@/components/utils/Colors";
import { Box, Skeleton } from "@mui/material";
import { getAuth } from "@/lib/auth-storage";
import { useRouter, useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { token } = getAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchService = useCallback(async () => {
    if (!id || !token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.service) {
        setService(data.service);
      } else {
        setError(data.message || "Service not found");
      }
    } catch (err) {
      setError(err?.message || "Failed to load service");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  useEffect(() => {
    if (!loading && error) {
      router.replace("/user/services");
    }
  }, [loading, error, router]);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, mx: "auto", bgcolor: bggrayColor, minHeight: "100vh" }}>
        <Skeleton variant="rectangular" width={40} height={40} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="text" width={200} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={80} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />
      </Box>
    );
  }

  if (!service) {
    return null;
  }

  const initialData = {
    title: service.title ?? "",
    description: service.description ?? "",
    imageUrl: service.imageUrl ?? "",
    whatYouGet: Array.isArray(service.whatYouGet) ? service.whatYouGet : [],
    extraBenefits: Array.isArray(service.extraBenefits) ? service.extraBenefits : [],
    conclusion: service.conclusion ?? "",
    subServices:
      Array.isArray(service.subServices) && service.subServices.length > 0
        ? service.subServices.map((s) => ({
            title: s?.title ?? "",
            description: s?.description ?? "",
            items: Array.isArray(s?.items) && s.items.length > 0 ? s.items : [""],
          }))
        : [{ title: "", description: "", items: [""] }],
  };

  return (
    <ServiceForm
      serviceId={id}
      initialData={initialData}
      isEdit={true}
    />
  );
}
