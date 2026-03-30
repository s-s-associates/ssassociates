"use client";

import { useMemo } from "react";
import { bordergrayColor, grayColor } from "@/components/utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

/** Varying heights (px) per [row][col] — repeats for deeper stacks. */
const HEIGHTS_4 = [
  [220, 360, 170, 250],
  [300, 160, 350, 270],
  [200, 300, 280, 190],
];

const HEIGHTS_2 = [
  [240, 300],
  [320, 200],
  [200, 340],
];

const HEIGHTS_1 = [260, 320, 200, 300, 220, 280];

function distributeImages(urls, columnCount) {
  const cols = Array.from({ length: columnCount }, () => []);
  urls.forEach((url, index) => {
    cols[index % columnCount].push({ url, index });
  });
  return cols;
}

function heightForCell(columnIndex, rowIndex, columnCount) {
  if (columnCount === 1) return HEIGHTS_1[rowIndex % HEIGHTS_1.length];
  if (columnCount === 2) return HEIGHTS_2[rowIndex % HEIGHTS_2.length][columnIndex % 2];
  return HEIGHTS_4[rowIndex % HEIGHTS_4.length][columnIndex % 4];
}

export default function ImagesGallery({ title, images = [] }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

  const columnCount = isMdUp ? 4 : isSmUp ? 2 : 1;

  const columns = useMemo(() => distributeImages(images, columnCount), [images, columnCount]);

  if (!images.length) {
    return (
      <Box
        component="section"
        sx={{
          py: { xs: 5, md: 7 },
          px: { xs: 2, sm: 3, md: 4 },
          bgcolor: "#f3f0e8",
        }}
      >
        <Typography sx={{ textAlign: "center", color: "rgba(0,0,0,0.45)", fontSize: 15 }}>
          No gallery images for this project.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
        px: { xs: 2, sm: 3, md: 5 },
        bgcolor: "#f3f0e8",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 22, md: 26 },
          fontWeight: 700,
          color: grayColor,
          textAlign: "center",
          mb: { xs: 3, md: 4 },
          letterSpacing: "-0.02em",
        }}
      >
        Image gallery
      </Typography>

      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: { xs: 2, sm: 2.25, md: 2.5 },
        }}
      >
        {columns.map((columnItems, colIndex) => (
          <Stack
            key={colIndex}
            spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
            sx={{
              flex: 1,
              minWidth: 0,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {columnItems.map(({ url, index }, rowIndex) => {
              const h = heightForCell(colIndex, rowIndex, columnCount);
              return (
                <Box
                  key={`${url}-${index}`}
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: `1px solid ${bordergrayColor}`,
                    height: h,
                    position: "relative",
                    bgcolor: "rgba(0,0,0,0.04)",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={url}
                    alt={`${title || "Project"} — photo ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
