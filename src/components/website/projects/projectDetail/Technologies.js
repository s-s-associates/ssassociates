import {
  bggrayColor,
  bordergrayColor,
  grayColor,
  primaryColor,
  textGrayDark,
  whiteColor,
} from "@/components/utils/Colors";
import { Box, Stack, Typography } from "@mui/material";

export default function Technologies({ items }) {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 6, md: 9 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: bggrayColor,
      }}
    >
      <Box sx={{ maxWidth: 720, mx: "auto" }}>
        <Box
          sx={{
            bgcolor: whiteColor,
            borderRadius: { xs: 2, md: 2.5 },
            border: `1px solid ${bordergrayColor}`,
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 4px 24px rgba(16, 24, 40, 0.06)",
          }}
        >
          <Stack spacing={1.25} sx={{ mb: { xs: 3.5, md: 4 } }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.18em",
                color: primaryColor,
                textTransform: "uppercase",
              }}
            >
              Bill of materials
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Times New Roman", Georgia, serif',
                fontSize: { xs: 26, sm: 30 },
                fontWeight: 700,
                lineHeight: 1.2,
                color: grayColor,
              }}
            >
              Core construction materials
            </Typography>
            <Typography sx={{ fontSize: 15, lineHeight: 1.65, color: textGrayDark, fontWeight: 500, maxWidth: 520 }}>
              A sequential record of what was specified—useful for handover, variations, and future maintenance.
            </Typography>
          </Stack>

          {items.length ? (
            <Box sx={{ position: "relative", pl: { xs: 2.5, sm: 3 } }}>
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: { xs: 18, sm: 22 },
                  top: 10,
                  bottom: 10,
                  width: 2,
                  borderRadius: 1,
                  bgcolor: "rgba(251, 134, 30, 0.28)",
                }}
              />
              <Stack spacing={0}>
                {items.map((item, i) => (
                  <Box
                    key={`${item}-${i}`}
                    sx={{
                      position: "relative",
                      pl: { xs: 3.5, sm: 4 },
                      pb: i < items.length - 1 ? 2.75 : 0,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: { xs: 11, sm: 15 },
                        top: 6,
                        width: 14,
                        height: 14,
                        ml: "-7px",
                        borderRadius: "50%",
                        bgcolor: whiteColor,
                        border: `3px solid ${primaryColor}`,
                        boxShadow: `0 0 0 3px rgba(251, 134, 30, 0.15)`,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: 14, sm: 15 },
                        fontWeight: 600,
                        color: grayColor,
                        lineHeight: 1.55,
                        pt: 0.25,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : (
            <Typography sx={{ color: textGrayDark, fontSize: 15, fontStyle: "italic" }}>
              No material details listed for this project.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
