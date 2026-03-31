// "use client";

// import { primaryColor, secondaryColor, whiteColor } from "@/components/utils/Colors";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import { Box, Container, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import { fadeUp, SectionHeading } from "./serviceDetailShared";

// export default function WhyChooseUs({ extraBenefits }) {
//   if (!extraBenefits.length) return null;

//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 7, md: 9 },
//         bgcolor: secondaryColor,
//         color: whiteColor,
//       }}
//     >
//       <Container maxWidth="lg">
//         <motion.div {...fadeUp}>
//           <SectionHeading kicker="Why choose us" title="Extra Benefits" light />
//         </motion.div>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             justifyContent: "center",
//             columnGap: 2,
//             rowGap: 2,
//           }}
//         >
//           {extraBenefits.map((line, i) => (
//             <Box
//               key={i}
//               component={motion.div}
//               {...fadeUp}
//               transition={{ ...fadeUp.transition, delay: i * 0.05 }}
//               sx={{
//                 boxSizing: "border-box",
//                 width: {
//                   xs: "100%",
//                   sm: "calc((100% - 16px) / 2)",
//                 },
//                 flexShrink: 0,
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: 2,
//                   p: 2.5,
//                   borderRadius: 2,
//                   bgcolor: "rgba(255,255,255,0.06)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   cursor: "default",
//                   transition:
//                     "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     bgcolor: "rgba(255,255,255,0.12)",
//                     borderColor: "rgba(251, 134, 30, 0.45)",
//                     boxShadow: "0 14px 36px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(251, 134, 30, 0.2)",
//                   },
//                   "&:hover .benefit-star": {
//                     transform: "scale(1.12) rotate(-6deg)",
//                     color: "rgb(255, 184, 116)",
//                     filter: "drop-shadow(0 2px 8px rgba(251, 134, 30, 0.55))",
//                   },
//                 }}
//               >
//                 <StarRoundedIcon
//                   className="benefit-star"
//                   sx={{
//                     color: primaryColor,
//                     fontSize: 26,
//                     flexShrink: 0,
//                     mt: 0.2,
//                     transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.35s ease, filter 0.35s ease",
//                   }}
//                 />
//                 <Typography sx={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.92)" }}>{line}</Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// }
"use client";

import { primaryColor, secondaryColor, secondaryDark, whiteColor } from "@/components/utils/Colors";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { fadeUp } from "./serviceDetailShared";

const STATS = [
  { num: "500+", label: "Projects completed" },
  { num: "12+",  label: "Years experience" },
  { num: "98%",  label: "On-time delivery" },
  { num: "200+", label: "Happy clients" },
];

export default function WhyChooseUs({ extraBenefits }) {
  if (!extraBenefits.length) return null;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: secondaryDark,
        color: whiteColor,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-80px",
          right: "200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,134,30,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* ── CENTERED TOP: kicker + heading + description ── */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              component="p"
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: primaryColor,
                textTransform: "uppercase",
                mb: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.1,
                "&::before, &::after": {
                  content: '""',
                  width: { xs: 20, sm: 28 },
                  height: 1,
                  backgroundColor: "rgba(251,134,30,0.55)",
                  display: "inline-block",
                },
              }}
            >
              Why choose us
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 28, sm: 34, md: 38 },
                fontWeight: 700,
                color: whiteColor,
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Extra Benefits
            </Typography>
            <Box
              sx={{
                width: 56,
                height: 3,
                bgcolor: primaryColor,
                mx: "auto",
                mt: 2,
                mb: 2.2,
                borderRadius: 1,
              }}
            />
            <Typography
              sx={{
                fontSize: 15,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Everything you need for a seamless construction experience, from start to finish.
            </Typography>
          </Box>
        </motion.div>

        {/* ── TWO-COLUMN BODY ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 6 },
            alignItems: "start",
          }}
        >
          {/* benefits list */}
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {extraBenefits.map((line, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2.5,
                    py: 2,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    bgcolor: "rgba(255,255,255,0.04)",
                    cursor: "default",
                    transition:
                      "background 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                      borderColor: "rgba(251,134,30,0.28)",
                      transform: "translateX(5px)",
                    },
                    "&:hover .benefit-dot": {
                      bgcolor: "rgba(251,134,30,0.25)",
                      borderColor: "rgba(251,134,30,0.5)",
                    },
                  }}
                >
                  <Box
                    className="benefit-dot"
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "9px",
                      bgcolor: "rgba(251,134,30,0.1)",
                      border: "1px solid rgba(251,134,30,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.35s ease, border-color 0.35s ease",
                    }}
                  >
                    <StarRoundedIcon sx={{ color: primaryColor, fontSize: 16 }} />
                  </Box>
                  <Typography
                    sx={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}
                  >
                    {line}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* stats + trust card */}
          <Box
            component={motion.div}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* 2×2 stat grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {STATS.map(({ num, label }, i) => (
                <Box
                  key={i}
                  sx={{
                    p: "28px 24px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    bgcolor: "rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                    transition:
                      "background 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: "2px",
                      borderRadius: "16px 16px 0 0",
                      background: "linear-gradient(90deg, #fb861e, #ffd08a)",
                      opacity: 0,
                      transition: "opacity 0.35s ease",
                    },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.09)",
                      borderColor: "rgba(251,134,30,0.22)",
                      transform: "translateY(-4px)",
                    },
                    "&:hover::before": { opacity: 1 },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: { xs: 32, md: 38 },
                      fontWeight: 800,
                      color: primaryColor,
                      letterSpacing: "-1.5px",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.3px" }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Trust badge card */}
            <Box
              sx={{
                p: "22px 24px",
                borderRadius: "16px",
                border: "1px solid rgba(251,134,30,0.2)",
                bgcolor: "rgba(251,134,30,0.08)",
                cursor: "default",
                transition:
                  "background 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                "&:hover": {
                  bgcolor: "rgba(251,134,30,0.14)",
                  borderColor: "rgba(251,134,30,0.38)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#fff",
                  mb: 0.75,
                }}
              >
                Built on trust, delivered with precision
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
              >
                From foundation to finishing — every project gets dedicated engineers,
                real-time updates, and transparent pricing. No surprises.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}