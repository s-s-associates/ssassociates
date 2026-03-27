import { bordergrayColor } from "@/components/utils/Colors";
import { Paper, Typography } from "@mui/material";

export default function Overview({ description }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.2 }}>Overview</Typography>
      <Typography sx={{ color: "rgba(0,0,0,0.72)", lineHeight: 1.75 }}>{description || "No description provided."}</Typography>
    </Paper>
  );
}
