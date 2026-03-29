"use client";

import { primaryColor } from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BarLoader } from "react-spinners";

function normalizePath(path) {
  if (!path || typeof path !== "string") return "/";
  let p = path.split("?")[0].split("#")[0];
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "") || "/";
  return p;
}

const WebsiteNavLoadContext = createContext(null);

export function WebsiteNavigationLoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const startNavigation = useCallback(
    (href) => {
      if (!href || typeof href !== "string") return;
      if (normalizePath(href) === normalizePath(pathname)) return;
      setLoading(true);
    },
    [pathname]
  );

  return (
    <WebsiteNavLoadContext.Provider value={{ startNavigation, loading }}>
      {children}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 13000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(8, 12, 20, 0.55)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
          aria-busy="true"
          aria-live="polite"
        >
          <BarLoader color={primaryColor} size={14} />
        </Box>
      )}
    </WebsiteNavLoadContext.Provider>
  );
}

export function useWebsiteNavigationLoading() {
  const ctx = useContext(WebsiteNavLoadContext);
  return ctx ?? { startNavigation: () => {}, loading: false };
}
