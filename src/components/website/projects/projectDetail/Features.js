import { bordergrayColor, primaryColor } from "@/components/utils/Colors";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function Features({ items }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}`, mb: 2.5 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Features</Typography>
      {items.length ? (
        <Grid container spacing={1.4}>
          {items.map((item) => (
            <Grid size={{ xs: 12, sm: 6 }} key={item}>
              <Box
                sx={{
                  p: 1.4,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  border: `1px solid ${bordergrayColor}`,
                  transition: "all 0.25s ease",
                  "&:hover": { borderColor: primaryColor, transform: "translateY(-2px)" },
                }}
              >
                <Typography sx={{ color: "rgba(0,0,0,0.75)", fontSize: 14 }}>{item}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: "rgba(0,0,0,0.6)" }}>No feature entries available.</Typography>
      )}
    </Paper>
  );
}
