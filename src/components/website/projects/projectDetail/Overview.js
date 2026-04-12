import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Paper, Typography } from "@mui/material";

function overviewLines(description) {
  const raw = (description || "").trim();
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function Overview({ description }) {
  const lines = overviewLines(description);
  if (lines.length === 0) return null;

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.6, mb: 1.2 }}>
        <Box sx={{ width: 34, height: 4, borderRadius: 999, bgcolor: primaryColor, flexShrink: 0 }} />
        <Typography sx={{ fontSize: 20, letterSpacing: "0.1em", fontWeight: 500, color: primaryColor }}>
          PROJECT OVERVIEW
        </Typography>
      </Box>
      <Box
        component="ul"
        sx={{
          m: 0,
          pl: 2.25,
          color: "rgba(0,0,0,0.72)",
          lineHeight: 1.75,
          listStyleType: "disc",
          "& li::marker": {
            color: primaryColor,
          },
          "& li": {
            pl: 0.5,
            mb: 1,
            "&:last-child": { mb: 0 },
          },
        }}
      >
        {lines.map((line, i) => (
          <Typography key={i} component="li" variant="body1" sx={{ color: "inherit", lineHeight: 1.75 }}>
            {line}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}
