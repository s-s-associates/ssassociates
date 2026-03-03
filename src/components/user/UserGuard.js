"use client";

import { primaryColor } from "@/components/utils/Colors";
import { getAuth } from "@/lib/auth-storage";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";

export default function UserGuard({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  const redirectToLogin = () => {
    Swal.fire({
      icon: "warning",
      title: "Login required",
      text: "Please log in to access this page.",
      confirmButtonColor: primaryColor,
    }).then(() => {
      router.replace("/login");
    });
  };

  useEffect(() => {
    let cancelled = false;
    async function check() {
      const { token } = getAuth();
      if (!token) {
        if (!cancelled) {
          setChecking(false);
          redirectToLogin();
        }
        return;
      }
      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.success) {
          setChecking(false);
          redirectToLogin();
          return;
        }
        if (!cancelled) {
          setAllowed(true);
          setChecking(false);
        }
      } catch {
        if (!cancelled) {
          setChecking(false);
          redirectToLogin();
        }
      }
    }
    check();
    return () => { cancelled = true; };
  }, [router]);

  if (checking) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fafafa",
        }}
      >
        <BeatLoader color="#8A38F5" size={14} />
      </Box>
    );
  }
  if (!allowed) return null;
  return children;
}
