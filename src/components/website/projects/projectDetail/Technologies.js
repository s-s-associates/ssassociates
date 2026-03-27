import { bordergrayColor } from "@/components/utils/Colors";
import { Chip, Paper, Stack, Typography } from "@mui/material";

export default function Technologies({ items }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Technologies</Typography>
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {items.length ? (
          items.map((item) => (
            <Chip key={item} label={item} sx={{ bgcolor: "rgba(251,134,30,0.1)", color: "#9a4a08", fontWeight: 600 }} />
          ))
        ) : (
          <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No material/technology details available.</Typography>
        )}
      </Stack>
    </Paper>
  );
}
