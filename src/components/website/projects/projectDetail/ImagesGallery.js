// "use client";

// import { useMemo } from "react";
// import { bordergrayColor, grayColor } from "@/components/utils/Colors";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import { Box, Stack, Typography } from "@mui/material";

// /** Varying heights (px) per [row][col] — repeats for deeper stacks. */
// const HEIGHTS_4 = [
//   [220, 360, 170, 250],
//   [300, 160, 350, 270],
//   [200, 300, 280, 190],
// ];

// const HEIGHTS_2 = [
//   [240, 300],
//   [320, 200],
//   [200, 340],
// ];

// const HEIGHTS_1 = [260, 320, 200, 300, 220, 280];

// function distributeImages(urls, columnCount) {
//   const cols = Array.from({ length: columnCount }, () => []);
//   urls.forEach((url, index) => {
//     cols[index % columnCount].push({ url, index });
//   });
//   return cols;
// }

// function heightForCell(columnIndex, rowIndex, columnCount) {
//   if (columnCount === 1) return HEIGHTS_1[rowIndex % HEIGHTS_1.length];
//   if (columnCount === 2) return HEIGHTS_2[rowIndex % HEIGHTS_2.length][columnIndex % 2];
//   return HEIGHTS_4[rowIndex % HEIGHTS_4.length][columnIndex % 4];
// }

// export default function ImagesGallery({ title, images = [] }) {
//   const theme = useTheme();
//   const isMdUp = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

//   const columnCount = isMdUp ? 4 : isSmUp ? 2 : 1;

//   const columns = useMemo(() => distributeImages(images, columnCount), [images, columnCount]);

//   if (!images.length) {
//     return (
//       <Box
//         component="section"
//         sx={{
//           py: { xs: 5, md: 7 },
//           px: { xs: 2, sm: 3, md: 4 },
//           bgcolor: "#f3f0e8",
//         }}
//       >
//         <Typography sx={{ textAlign: "center", color: "rgba(0,0,0,0.45)", fontSize: 15 }}>
//           No gallery images for this project.
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 5, md: 8 },
//         px: { xs: 2, sm: 3, md: 5 },
//         bgcolor: "#f3f0e8",
//       }}
//     >
//       <Typography
//         component="h2"
//         sx={{
//           fontSize: { xs: 22, md: 26 },
//           fontWeight: 700,
//           color: grayColor,
//           textAlign: "center",
//           mb: { xs: 3, md: 4 },
//           letterSpacing: "-0.02em",
//         }}
//       >
//         Image gallery
//       </Typography>

//       <Box
//         sx={{
//           maxWidth: 1280,
//           mx: "auto",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "flex-start",
//           gap: { xs: 2, sm: 2.25, md: 2.5 },
//         }}
//       >
//         {columns.map((columnItems, colIndex) => (
//           <Stack
//             key={colIndex}
//             spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
//             sx={{
//               flex: 1,
//               minWidth: 0,
//               width: { xs: "100%", sm: "auto" },
//             }}
//           >
//             {columnItems.map(({ url, index }, rowIndex) => {
//               const h = heightForCell(colIndex, rowIndex, columnCount);
//               return (
//                 <Box
//                   key={`${url}-${index}`}
//                   sx={{
//                     borderRadius: "24px",
//                     overflow: "hidden",
//                     border: `1px solid ${bordergrayColor}`,
//                     height: h,
//                     position: "relative",
//                     bgcolor: "rgba(0,0,0,0.04)",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={url}
//                     alt={`${title || "Project"} — photo ${index + 1}`}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       display: "block",
//                       transition: "transform 0.5s ease",
//                       "&:hover": { transform: "scale(1.05)" },
//                     }}
//                   />
//                 </Box>
//               );
//             })}
//           </Stack>
//         ))}
//       </Box>
//     </Box>
//   );
// }
"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { bordergrayColor, grayColor } from "@/components/utils/Colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

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

/* ─── Lightbox ─────────────────────────────────────────────────────────────── */
function Lightbox({ images, startIndex, onClose }) {
  const [active, setActive] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (next) => {
      const clamped = (next + images.length) % images.length;
      setDirection(next > active ? 1 : -1);
      setActive(clamped);
    },
    [active, images.length]
  );

  // keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, go, onClose]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(6, 10, 18, 0.92)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        p: { xs: 2, md: 4 },
        gap: 0,
      }}
    >
      {/* ── Close button ── */}
      <Box
        component={motion.button}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={onClose}
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 28 },
          width: 44, height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          zIndex: 10,
          transition: "background 0.2s ease",
          "&:hover": { background: "rgba(255,255,255,0.16)" },
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: 20 }} />
      </Box>

      {/* ── Counter ── */}
      <Typography
        sx={{
          position: "fixed",
          top: { xs: 16, md: 28 },
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "1.5px",
          zIndex: 10,
          whiteSpace: "nowrap",
        }}
      >
        {active + 1} / {images.length}
      </Typography>

      {/* ── Main image area ── */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 960,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
          mb: 3,
        }}
      >
        {/* Prev arrow */}
        <Box
          component={motion.button}
          whileHover={{ scale: 1.08, x: -2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => go(active - 1)}
          sx={{
            position: "absolute",
            left: { xs: -4, md: -56 },
            width: 48, height: 48,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            zIndex: 5,
            flexShrink: 0,
            transition: "background 0.2s ease, border-color 0.2s ease",
            "&:hover": {
              background: "rgba(251,134,30,0.18)",
              borderColor: "rgba(251,134,30,0.4)",
            },
          }}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 18 }} />
        </Box>

        {/* Image */}
        <Box sx={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: "20px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <Box
              key={active}
              component={motion.img}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              src={images[active]}
              alt={`Photo ${active + 1}`}
              sx={{
                width: "100%",
                maxHeight: { xs: "45vh", md: "62vh" },
                objectFit: "contain",
                display: "block",
                borderRadius: "20px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            />
          </AnimatePresence>
        </Box>

        {/* Next arrow */}
        <Box
          component={motion.button}
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => go(active + 1)}
          sx={{
            position: "absolute",
            right: { xs: -4, md: -56 },
            width: 48, height: 48,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            zIndex: 5,
            flexShrink: 0,
            transition: "background 0.2s ease, border-color 0.2s ease",
            "&:hover": {
              background: "rgba(251,134,30,0.18)",
              borderColor: "rgba(251,134,30,0.4)",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>

      {/* ── Thumbnail strip ── */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          display: "flex",
          gap: 1.25,
          overflowX: "auto",
          maxWidth: { xs: "100%", md: 860 },
          width: "100%",
          pb: 0.5,
          px: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          justifyContent: images.length <= 6 ? "center" : "flex-start",
        }}
      >
        {images.map((url, i) => (
          <Box
            key={i}
            component={motion.button}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
            sx={{
              flexShrink: 0,
              width: { xs: 60, md: 76 },
              height: { xs: 44, md: 56 },
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              border: i === active
                ? "2px solid #fb861e"
                : "2px solid transparent",
              outline: i === active
                ? "1px solid rgba(251,134,30,0.35)"
                : "none",
              transition: "border-color 0.25s ease, opacity 0.25s ease, transform 0.25s ease",
              opacity: i === active ? 1 : 0.45,
              p: 0,
              background: "none",
              "&:hover": { opacity: 1 },
            }}
          >
            <Box
              component="img"
              src={url}
              alt={`Thumb ${i + 1}`}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ─── Gallery ───────────────────────────────────────────────────────────────── */
export default function ImagesGallery({ title, images = [] }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });

  const columnCount = isMdUp ? 4 : isSmUp ? 2 : 1;
  const visibleImages = images.slice(0, 8);
  const columns = useMemo(() => distributeImages(visibleImages, columnCount), [visibleImages, columnCount]);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images.length) {
    return (
      <Box component="section" sx={{ py: { xs: 5, md: 7 }, px: { xs: 2, sm: 3, md: 4 }, bgcolor: "#f3f0e8" }}>
        <Typography sx={{ textAlign: "center", color: "rgba(0,0,0,0.45)", fontSize: 15 }}>
          No gallery images for this project.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        component="section"
        sx={{ py: { xs: 5, md: 8 }, px: { xs: 2, sm: 3, md: 5 }, bgcolor: "#f3f0e8" }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 5 } }}>
          <Typography
            component="p"
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(251, 134, 30, 0.85)",
              mb: 1.25,
            }}
          >
            Project visuals
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Times New Roman", Georgia, serif',
              fontSize: { xs: 30, sm: 36, md: 42 },
              fontWeight: 700,
              color: grayColor,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 2,
            }}
          >
            Project Gallery
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 3,
              borderRadius: 1,
              mx: "auto",
              mb: 2.25,
              background: "linear-gradient(90deg, rgb(251, 134, 30), rgb(255, 184, 116))",
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 15 },
              color: "rgba(0,0,0,0.52)",
              fontWeight: 500,
              lineHeight: 1.65,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            A curated look at key moments across every phase of construction. Click any image to open the full lightbox and browse the complete set.
          </Typography>
        </Box>

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
              sx={{ flex: 1, minWidth: 0, width: { xs: "100%", sm: "auto" } }}
            >
              {columnItems.map(({ url, index }, rowIndex) => {
                const h = heightForCell(colIndex, rowIndex, columnCount);
                const isLastVisible = index === 7 && images.length > 8;
                const hiddenCount = images.length - 8;

                return (
                  <Box
                    key={`${url}-${index}`}
                    onClick={() => setLightboxIndex(index)}
                    sx={{
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: `1px solid ${bordergrayColor}`,
                      height: h,
                      position: "relative",
                      bgcolor: "rgba(0,0,0,0.04)",
                      flexShrink: 0,
                      cursor: "pointer",
                      "&:hover img": { transform: "scale(1.05)" },
                      "&:hover .overlay": { opacity: 1 },
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
                        ...(isLastVisible && { filter: "brightness(0.45)" }),
                      }}
                    />

                    {isLastVisible ? (
                      /* +N more overlay on 8th image */
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5,
                          pointerEvents: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: { xs: 28, md: 36 },
                            fontWeight: 800,
                            color: "#fff",
                            lineHeight: 1,
                            letterSpacing: "-1px",
                          }}
                        >
                          +{hiddenCount}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.65)",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                          }}
                        >
                          more
                        </Typography>
                      </Box>
                    ) : (
                      /* normal hover overlay with zoom icon */
                      <Box
                        className="overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(6,10,18,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          borderRadius: "24px",
                        }}
                      >
                        <Box
                          sx={{
                            width: 44, height: 44,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                          </svg>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          ))}
        </Box>
      </Box>

      {/* ── Lightbox portal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}