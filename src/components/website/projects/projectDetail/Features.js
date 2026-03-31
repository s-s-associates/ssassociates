// import { bordergrayColor, primaryColor, whiteColor } from "@/components/utils/Colors";
// import { Box, Paper, Stack, Typography } from "@mui/material";

// export default function Features({ items }) {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         my: {xs: 2, sm: 3, md:4,lg:5,xl:6},
//         mx: {xs: 1, sm: 5, md:10,lg:15,xl:20},
//         px: { xs: 2, md: 3 },
//         py: {xs: 5, md: 8},
//         borderRadius: 3,
//         bgcolor: whiteColor,
//         border: `1px solid ${bordergrayColor}`,
//         boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
//         mb: 2.5,
//       }}
//     >
//       <Stack alignItems="center" spacing={1.25} sx={{ mb: 2.5, textAlign: "center", px: { xs: 0, sm: 1 } }}>
//         <Typography
//           component="h2"
//           sx={{
//             fontSize: { xs: 22, md: 24 },
//             fontWeight: 700,
//             color: "rgba(0,0,0,0.88)",
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Signature delivery highlights
//         </Typography>
//         <Typography
//           sx={{
//             maxWidth: 560,
//             fontSize: 15,
//             fontWeight: 500,
//             color: "rgba(0,0,0,0.62)",
//             lineHeight: 1.65,
//           }}
//         >
//           Sustainability, safety, certifications, and materials—drawn directly from how this project was specified and built.
//         </Typography>
//       </Stack>

//       <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="center" alignItems="center">
//         {items.length ? (
//           items.map((item) => (
//             <Box
//               key={item}
//               sx={{
//                 p: 1.5,
//                 borderRadius: 100,
//                 bgcolor: whiteColor,
//                 border: `1px solid ${bordergrayColor}`,
//                 transition: "all 0.25s ease",
//                 "&:hover": { borderColor: primaryColor, transform: "translateY(-2px)" },
//               }}
//             >
//               <Typography sx={{ color: "rgba(0,0,0,0.75)", fontSize: 14 }}>{item}</Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography sx={{ color: "rgba(0,0,0,0.6)", textAlign: "center" }}>No highlight entries available.</Typography>
//         )}
//       </Stack>
//     </Paper>
//   );
// }
import { bordergrayColor, primaryColor, whiteColor } from "@/components/utils/Colors";
import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Features({ items }) {
  return (
    <Paper
      elevation={0}
      sx={{
        my: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
        mx: { xs: 1, sm: 5, md: 10, lg: 15, xl: 20 },
        borderRadius: "28px",
        bgcolor: whiteColor,
        border: `1px solid rgba(15,23,42,0.08)`,
        overflow: "hidden",
        position: "relative",
        // animated shimmer top bar
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #fb861e 0%, #ffd08a 50%, #fb861e 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
        },
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      }}
    >
      <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 5, md: 6.5 }, position: "relative", zIndex: 1 }}>

        {/* ── Top row: text left, count badge right ── */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 4,
            mb: 5,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* kicker */}
            <Box
              sx={{
                display: "inline-flex", alignItems: "center", gap: 1,
                fontSize: 11, fontWeight: 500, letterSpacing: "3px",
                textTransform: "uppercase", color: primaryColor, mb: 1.75,
                "&::before": {
                  content: '""', display: "block",
                  width: 22, height: 2, bgcolor: primaryColor, borderRadius: 1,
                },
              }}
            >
              <Typography sx={{ fontSize: 11, fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: primaryColor }}>
                Project specs
              </Typography>
            </Box>

            <Typography
              component="h2"
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: 24, md: 34 },
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-1.2px",
                lineHeight: 1.1,
                mb: 1.5,
              }}
            >
              Signature delivery<br />highlights
            </Typography>

            <Typography
              sx={{
                fontSize: 14.5,
                color: "rgba(15,23,42,0.5)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              Sustainability, safety, certifications, and materials — drawn directly
              from how this project was specified and built.
            </Typography>
          </Box>

          {/* count badge */}
          {items.length > 0 && (
            <Box
              sx={{
                flexShrink: 0,
                width: 72, height: 72,
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${primaryColor}, #ffa94d)`,
                boxShadow: "0 8px 24px rgba(251,134,30,0.32)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                {items.length}
              </Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "1px", textTransform: "uppercase" }}>
                specs
              </Typography>
            </Box>
          )}
        </Box>

        {/* ── Divider ── */}
        <Box
          sx={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.08) 30%, rgba(15,23,42,0.08) 70%, transparent)",
            mb: 4,
          }}
        />

        {/* ── Tags ── */}
        {items.length ? (
          <Stack direction="row" flexWrap="wrap" gap={1.25}>
            {items.map((item) => (
              <Box
                key={item}
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  px: 2.25, py: 1.25,
                  borderRadius: "100px",
                  border: "1px solid rgba(15,23,42,0.1)",
                  bgcolor: "#fafafa",
                  cursor: "default",
                  transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(251,134,30,0.4)",
                    bgcolor: whiteColor,
                    boxShadow: "0 8px 24px rgba(251,134,30,0.12), 0 0 0 1px rgba(251,134,30,0.1)",
                  },
                  "&:hover .feat-dot": {
                    bgcolor: primaryColor,
                    transform: "scale(1.3)",
                  },
                }}
              >
                <Box
                  className="feat-dot"
                  sx={{
                    width: 6, height: 6, borderRadius: "50%",
                    bgcolor: "rgba(15,23,42,0.2)",
                    flexShrink: 0,
                    transition: "background 0.3s ease, transform 0.3s ease",
                  }}
                />
                <Typography sx={{ fontSize: 13.5, fontWeight: 400, color: "rgba(15,23,42,0.72)" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography sx={{ color: "rgba(0,0,0,0.4)", textAlign: "center", fontSize: 14 }}>
            No highlight entries available.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}