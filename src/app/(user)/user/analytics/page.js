import { Box } from "@mui/material";
import React from "react";

export default function AnalyticsPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Box component="h1" sx={{ fontSize: 24, fontWeight: 700, color: "#15151D", m: 0 }}>
        Analytics
      </Box>
      <Box sx={{ mt: 2, color: "rgba(21, 21, 29, 0.6)" }}>
        View dashboards and analyze your play data.
      </Box>
    </Box>
  );
}
