import { primaryColor, whiteColor } from "@/components/utils/Colors";
import { Box, Typography } from "@mui/material";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

export function SectionHeading({ kicker, title, light }) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
      <Typography
        component="p"
        sx={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: primaryColor,
          textTransform: "uppercase",
          mb: 1,
        }}
      >
        {kicker}
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 28, sm: 34, md: 38 },
          fontWeight: 700,
          color: light ? whiteColor : "rgb(15, 23, 42)",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          width: 56,
          height: 3,
          bgcolor: primaryColor,
          mx: "auto",
          mt: 2,
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
