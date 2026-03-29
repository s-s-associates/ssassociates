import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Paper, Typography } from "@mui/material";

export default function Overview({ description }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.6, mb: 1.2 }}>
        <Box sx={{ width: 34, height: 4, borderRadius: 999, bgcolor: primaryColor, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 20, letterSpacing: "0.1em", fontWeight: 500, color: primaryColor }}>
          PROJECT OVERVIEW
        </Typography>
      </Box>
      <Typography sx={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.75 }}>{description || "No description provided."}</Typography>
    </Paper>
  );
}
