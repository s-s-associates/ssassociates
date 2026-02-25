"use client";

import { getAuth } from "@/lib/auth-storage";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

// TEMPORARY: Set to true to skip login for /user. Set false when you want auth again.
const SKIP_USER_GUARD = true;

export default function UserGuard({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(SKIP_USER_GUARD);
  const [checking, setChecking] = useState(!SKIP_USER_GUARD);

  useEffect(() => {
    if (SKIP_USER_GUARD) return;
    let cancelled = false;
    async function check() {
      const { token } = getAuth();
      if (!token) {
        if (!cancelled) {
          setChecking(false);
          router.replace("/login");
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
          router.replace("/login");
          return;
        }
        setAllowed(true);
        setChecking(false);
      } catch {
        if (!cancelled) {
          setChecking(false);
          router.replace("/login");
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
