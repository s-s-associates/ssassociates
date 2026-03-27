import { bordergrayColor } from "@/components/utils/Colors";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function ImagesGallery({ title, images = [] }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, border: `1px solid ${bordergrayColor}` }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 1.5 }}>Image Gallery</Typography>
      <Grid container spacing={1.5}>
        {images.map((url, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${url}-${index}`}>
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${bordergrayColor}`,
                height: 180,
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={url}
                alt={`${title || "Project"} ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.45s ease",
                  "&:hover": { transform: "scale(1.06)" },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
