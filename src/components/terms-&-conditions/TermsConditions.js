// "use client";

// import {
//   primaryColor,
//   primaryBg,
//   primaryLight,
//   secondaryDark,
//   whiteColor,
// } from "@/components/utils/Colors";
// import {
//   Gavel,
//   AssignmentTurnedIn,
//   Construction,
//   Policy,
// } from "@mui/icons-material";
// import { Box } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";
// import { btnRadius } from "../utils/GlobalVariables";

// const terms = [
//   {
//     icon: Gavel,
//     title: "Scope of Services",
//     content:
//       "S&S Associates provides construction, renovation, and project management services as outlined in our written proposals and agreements. Any additional work outside the agreed scope will be discussed and approved before proceeding.",
//   },
//   {
//     icon: AssignmentTurnedIn,
//     title: "Proposals & Approvals",
//     content:
//       "All project details, including timelines, materials, and pricing, are documented in a formal proposal. Work begins only after written acceptance of the proposal and, where required, the receipt of an initial deposit.",
//   },
//   {
//     icon: Construction,
//     title: "Site Access & Safety",
//     content:
//       "Clients agree to provide safe and reasonable access to the project site. Our team follows strict safety procedures and local regulations to protect workers, visitors, and the surrounding environment.",
//   },
//   {
//     icon: Policy,
//     title: "Payments & Changes",
//     content:
//       "Invoices are issued in line with the agreed payment schedule. Variations requested during the project may affect the final cost or timeline and will be confirmed in writing before work continues.",
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0, y: 24 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.08, delayChildren: 0.12 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 16 },
//   show: { opacity: 1, y: 0 },
// };

// function TermsConditions() {
//   return (
//     <Box
//       component="section"
//       sx={{
//         py: { xs: 7, md: 9 },
//         px: { xs: 2, sm: 3, md: 4 },
//         background: `linear-gradient(165deg, ${secondaryDark} 0%, rgb(9, 16, 30) 46%, rgb(6, 12, 24) 100%)`,
//         position: "relative",
//         overflow: "hidden",
//         color: whiteColor,
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: -120,
//           left: -120,
//           width: 360,
//           height: 360,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(251,134,30,0.18) 0%, rgba(251,134,30,0) 70%)`,
//           pointerEvents: "none",
//         },
//         "&::after": {
//           content: '""',
//           position: "absolute",
//           bottom: -160,
//           right: -120,
//           width: 400,
//           height: 400,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(255,184,116,0.13) 0%, rgba(255,184,116,0) 70%)`,
//           pointerEvents: "none",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 960,
//           mx: "auto",
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <Box
//           component={motion.div}
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           sx={{ textAlign: "center", mb: 4 }}
//         >
//           <Box
//             component="h1"
//             sx={{
//               fontWeight: 700,
//               fontSize: { xs: 34, md: 44 },
//               color: whiteColor,
//               mb: 1,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Terms &amp; Conditions
//           </Box>
//           <Box
//             component="p"
//             sx={{
//               fontSize: 15,
//               color: "rgba(255,255,255,0.72)",
//               maxWidth: 640,
//               mx: "auto",
//               lineHeight: 1.7,
//             }}
//           >
//             These terms outline how we work with you on your construction and
//             renovation projects at S&amp;S Associates.
//           </Box>
//         </Box>

//         <Box
//           component={motion.div}
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.2 }}
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//             gap: 2.2,
//             mb: 4,
//           }}
//         >
//           {terms.map((term) => {
//             const Icon = term.icon;
//             return (
//               <Box
//                 key={term.title}
//                 component={motion.div}
//                 variants={itemVariants}
//                 whileHover={{ y: -4 }}
//                 transition={{ duration: 0.2 }}
//                 sx={{
//                   position: "relative",
//                   background: `linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
//                   borderRadius: 2.4,
//                   p: 2.5,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 1.5,
//                   border: "1px solid rgba(255,255,255,0.12)",
//                   cursor: "default",
//                   backdropFilter: "blur(8px)",
//                   WebkitBackdropFilter: "blur(8px)",
//                   transition: "all 0.3s ease",
//                   "&:before": {
//                     content: '""',
//                     position: "absolute",
//                     inset: 0,
//                     borderRadius: btnRadius,
//                     opacity: 0,
//                     transition: "opacity 0.25s ease",
//                     zIndex: 0,
//                   },
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     borderColor: primaryColor,
//                     boxShadow: "0 14px 38px rgba(251,134,30,0.2)",
//                     "&:before": {
//                       opacity: 1,
//                     },
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "relative",
//                     zIndex: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1.5,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: "10px",
//                       backgroundColor: primaryBg,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: primaryColor,
//                     }}
//                   >
//                     <Icon sx={{ fontSize: 22 }} />
//                   </Box>
//                   <Box
//                     component="h2"
//                     sx={{
//                       fontWeight: 600,
//                       fontSize: 16,
//                       color: whiteColor,
//                     }}
//                   >
//                     {term.title}
//                   </Box>
//                 </Box>
//                 <Box
//                   component="p"
//                   sx={{
//                     position: "relative",
//                     zIndex: 1,
//                     fontSize: 14,
//                     lineHeight: 1.7,
//                     color: "rgba(255,255,255,0.72)",
//                   }}
//                 >
//                   {term.content}
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>

//         <Box
//           sx={{
//             borderRadius: 2.6,
//             background: "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 100%)",
//             border: "1px solid rgba(255,255,255,0.16)",
//             px: 2.5,
//             py: 2.25,
//             backdropFilter: "blur(8px)",
//             WebkitBackdropFilter: "blur(8px)",
//             boxShadow: "0 14px 34px rgba(0,0,0,0.24)",
//           }}
//         >
//           <Box
//             component="h3"
//             sx={{
//               fontWeight: 600,
//               fontSize: 16,
//               color: primaryLight,
//               mb: 0.5,
//             }}
//           >
//             Acceptance of these terms
//           </Box>
//           <Box
//             component="p"
//             sx={{
//               fontSize: 14,
//               lineHeight: 1.7,
//               color: "rgba(255,255,255,0.72)",
//               mb: 1,
//             }}
//           >
//             By engaging S&amp;S Associates, you acknowledge that you have read
//             and agreed to these Terms &amp; Conditions, along with any
//             additional terms included in your project documentation.
//           </Box>
//           <Box
//             component="p"
//             sx={{
//               fontSize: 13,
//               color: "rgba(255,255,255,0.56)",
//             }}
//           >
//             These terms may be updated from time to time to reflect changes in
//             our services or legal requirements.
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default TermsConditions;

"use client";

import {
  Gavel,
  AssignmentTurnedIn,
  Construction,
  Policy,
  VerifiedOutlined,
} from "@mui/icons-material";
import {
  primaryBg,
  primaryColor,
  primaryLight,
  secondaryColor,
  secondaryDark,
  secondaryLight,
  textGrayLight,
  whiteColor,
} from "@/components/utils/Colors";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

// ── Dark theme tokens ──────────────────────────────────────────────────────────
const toRgba = (rgb, alpha) => String(rgb).replace("rgb(", "rgba(").replace(")", `, ${alpha})`);

const dark = {
  bg: secondaryDark,
  surface: secondaryColor,
  surfaceElevated: secondaryLight,
  border: toRgba(textGrayLight, 0.16),
  borderAccent: toRgba(primaryColor, 0.45),
  gold: primaryColor,
  goldLight: primaryLight,
  goldBg: primaryBg,
  text: whiteColor,
  textMuted: "rgba(255,255,255,0.72)",
  textDim: "rgba(255,255,255,0.45)",
  white: whiteColor,
};

const terms = [
  {
    icon: Gavel,
    title: "Scope of Services",
    content:
      "S&S Associates provides construction, renovation, and project management services as outlined in our written proposals and agreements. Any additional work outside the agreed scope will be discussed and approved before proceeding.",
    number: "01",
  },
  {
    icon: AssignmentTurnedIn,
    title: "Proposals & Approvals",
    content:
      "All project details, including timelines, materials, and pricing, are documented in a formal proposal. Work begins only after written acceptance of the proposal and, where required, the receipt of an initial deposit.",
    number: "02",
  },
  {
    icon: Construction,
    title: "Site Access & Safety",
    content:
      "Clients agree to provide safe and reasonable access to the project site. Our team follows strict safety procedures and local regulations to protect workers, visitors, and the surrounding environment.",
    number: "03",
  },
  {
    icon: Policy,
    title: "Payments & Changes",
    content:
      "Invoices are issued in line with the agreed payment schedule. Variations requested during the project may affect the final cost or timeline and will be confirmed in writing before work continues.",
    number: "04",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function TermsConditions() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        py: { xs: 8, md: 11 },
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: dark.bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Sora', 'DM Sans', sans-serif",
        // Grid texture
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${toRgba(primaryColor, 0.06)} 1px, transparent 1px),
            linear-gradient(90deg, ${toRgba(primaryColor, 0.06)} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
        },
        // Top-left glow
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(primaryColor, 0.16)} 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* Bottom-right glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(primaryColor, 0.12)} 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 980, mx: "auto", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.6,
              borderRadius: "100px",
              border: `1px solid ${dark.borderAccent}`,
              backgroundColor: dark.goldBg,
              mb: 2.5,
            }}
          >
            <VerifiedOutlined sx={{ fontSize: 14, color: dark.gold }} />
            <Box component="span" sx={{ fontSize: 12, fontWeight: 600, color: dark.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </Box>
          </Box>

          <Box
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 34, md: 48 },
              color: dark.white,
              mb: 1.5,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Terms &amp;{" "}
            <Box component="span" sx={{ color: dark.gold, position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 2,
                left: 0,
                width: "100%",
                height: "2px",
                background: `linear-gradient(90deg, ${dark.gold}, transparent)`,
              }
            }}>
              Conditions
            </Box>
          </Box>

          <Box
            component="p"
            sx={{ fontSize: 15, color: dark.textMuted, maxWidth: 540, mx: "auto", lineHeight: 1.75 }}
          >
            These terms outline how we work with you on your construction and renovation projects at {process.env.NEXT_PUBLIC_COMPANY_NAME}.
          </Box>

          {/* Decorative divider */}
          <Box sx={{ mt: 3.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
            <Box sx={{ width: 48, height: 1, backgroundColor: dark.borderAccent }} />
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: dark.gold }} />
            <Box sx={{ width: 48, height: 1, backgroundColor: dark.borderAccent }} />
          </Box>
        </Box>

        {/* ── Cards Grid ── */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2.5,
            mb: 3,
          }}
        >
          {terms.map((term) => {
            const Icon = term.icon;
            return (
              <Box
                key={term.title}
                component={motion.div}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                sx={{
                  position: "relative",
                  backgroundColor: dark.surface,
                  borderRadius: "16px",
                  border: `1px solid ${dark.border}`,
                  p: { xs: 3, md: 3.5 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  overflow: "hidden",
                  cursor: "default",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    borderColor: dark.borderAccent,
                    boxShadow: `0 0 0 1px ${dark.borderAccent}, 0 20px 48px rgba(0,0,0,0.5)`,
                    "& .card-number": { color: dark.gold, opacity: 0.3 },
                    "& .icon-wrap": { backgroundColor: dark.gold, color: dark.bg },
                  },
                }}
              >
                {/* Background number watermark */}
                <Box
                  className="card-number"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    fontSize: 72,
                    fontWeight: 900,
                    color: dark.textDim,
                    opacity: 0.12,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    transition: "color 0.3s ease, opacity 0.3s ease",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {term.number}
                </Box>

                {/* Icon + Title */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    className="icon-wrap"
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: dark.goldBg,
                      border: `1px solid ${dark.borderAccent}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: dark.gold,
                      flexShrink: 0,
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                  <Box
                    component="h2"
                    sx={{ fontWeight: 700, fontSize: 16, color: dark.white, lineHeight: 1.3 }}
                  >
                    {term.title}
                  </Box>
                </Box>

                {/* Gold accent divider */}
                <Box sx={{ height: "1px", background: `linear-gradient(90deg, ${dark.borderAccent}, transparent)` }} />

                <Box
                  component="p"
                  sx={{ fontSize: 14, lineHeight: 1.8, color: dark.textMuted, position: "relative", zIndex: 1 }}
                >
                  {term.content}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* ── Footer Notice ── */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            borderRadius: "16px",
            backgroundColor: dark.surfaceElevated,
            border: `1px solid ${dark.borderAccent}`,
            px: { xs: 3, md: 4 },
            py: 3,
            position: "relative",
            overflow: "hidden",
            // Gold top shimmer line
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${dark.gold}, transparent)`,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: dark.goldBg,
                border: `1px solid ${dark.borderAccent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: dark.gold,
                flexShrink: 0,
                mt: 0.25,
              }}
            >
              <VerifiedOutlined sx={{ fontSize: 18 }} />
            </Box>
            <Box>
              <Box component="h3" sx={{ fontWeight: 700, fontSize: 15, color: dark.white, mb: 0.75 }}>
                Acceptance of these terms
              </Box>
              <Box component="p" sx={{ fontSize: 14, lineHeight: 1.75, color: dark.textMuted, mb: 1 }}>
                By engaging S&amp;S Associates, you acknowledge that you have read and agreed to these Terms &amp; Conditions, along with any additional terms included in your project documentation.
              </Box>
              <Box component="p" sx={{ fontSize: 13, color: dark.textDim, fontStyle: "italic" }}>
                These terms may be updated from time to time to reflect changes in our services or legal requirements.
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default TermsConditions;