import { bordergrayColor, primaryColor, whiteColor } from "@/components/utils/Colors";
import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Features({ items }) {
  return (
    <Paper
      elevation={0}
      sx={{
        my: {xs: 2, sm: 3, md:4,lg:5,xl:6},
        mx: {xs: 1, sm: 5, md:10,lg:15,xl:20},
        px: { xs: 2, md: 3 },
        py: {xs: 5, md: 8},
        borderRadius: 3,
        bgcolor: whiteColor,
        border: `1px solid ${bordergrayColor}`,
        boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
        mb: 2.5,
      }}
    >
      <Stack alignItems="center" spacing={1.25} sx={{ mb: 2.5, textAlign: "center", px: { xs: 0, sm: 1 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 22, md: 24 },
            fontWeight: 700,
            color: "rgba(0,0,0,0.88)",
            letterSpacing: "-0.02em",
          }}
        >
          Signature delivery highlights
        </Typography>
        <Typography
          sx={{
            maxWidth: 560,
            fontSize: 15,
            fontWeight: 500,
            color: "rgba(0,0,0,0.62)",
            lineHeight: 1.65,
          }}
        >
          Sustainability, safety, certifications, and materials—drawn directly from how this project was specified and built.
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center" alignItems="center">
        {items.length ? (
          items.map((item) => (
            <Box
              key={item}
              sx={{
                p: 1.5,
                borderRadius: 100,
                bgcolor: whiteColor,
                border: `1px solid ${bordergrayColor}`,
                transition: "all 0.25s ease",
                "&:hover": { borderColor: primaryColor, transform: "translateY(-2px)" },
              }}
            >
              <Typography sx={{ color: "rgba(0,0,0,0.75)", fontSize: 14 }}>{item}</Typography>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "rgba(0,0,0,0.6)", textAlign: "center" }}>No highlight entries available.</Typography>
        )}
      </Stack>
    </Paper>
  );
}
