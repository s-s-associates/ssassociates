// "use client";

// import {
//   primaryColor,
//   primaryBg,
//   primaryLight,
//   secondaryDark,
//   secondaryLight,
//   whiteColor,
//   textGrayLight,
// } from "@/components/utils/Colors";
// import {
//   Security,
//   Visibility,
//   MailOutline,
//   DeleteSweep,
// } from "@mui/icons-material";
// import { Box } from "@mui/material";
// import { motion } from "framer-motion";
// import React from "react";

// const sections = [
//   {
//     icon: Security,
//     title: "Information We Collect",
//     content:
//       "We collect only the information necessary to provide our construction services and respond to your enquiries. This may include your name, contact details, project requirements, and any files or drawings you choose to share with us.",
//   },
//   {
//     icon: Visibility,
//     title: "How We Use Your Information",
//     content:
//       "Your information is used to prepare proposals, manage ongoing projects, improve our services, and communicate important updates. We never sell your personal data or share it with third parties for unrelated marketing.",
//   },
//   {
//     icon: MailOutline,
//     title: "Communication & Updates",
//     content:
//       "We may contact you by email or phone to share project updates, appointment reminders, or relevant service information. You can ask us to limit certain communications at any time.",
//   },
//   {
//     icon: DeleteSweep,
//     title: "Data Protection & Retention",
//     content:
//       "We store your information in secure systems and keep it only for as long as required for legal, accounting, or project-related reasons. When no longer needed, your data is safely deleted or anonymised.",
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

// function PrivacyPolicy() {
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
//             Privacy Policy
//           </Box>
//           <Box
//             component="p"
//             sx={{
//               fontSize: 15,
//               color: "rgba(255,255,255,0.72)",
//               maxWidth: 620,
//               mx: "auto",
//               lineHeight: 1.7,
//             }}
//           >
//             We respect your privacy and are committed to protecting the
//             information you share with S&amp;S Associates.
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
//           {sections.map((section) => {
//             const Icon = section.icon;
//             return (
//               <Box
//                 key={section.title}
//                 component={motion.div}
//                 variants={itemVariants}
//                 whileHover={{ y: -4 }}
//                 transition={{ duration: 0.2 }}
//                 sx={{
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
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     borderColor: primaryColor,
//                     boxShadow: "0 14px 38px rgba(251,134,30,0.2)",
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
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
//                     {section.title}
//                   </Box>
//                 </Box>
//                 <Box
//                   component="p"
//                   sx={{
//                     fontSize: 14,
//                     lineHeight: 1.7,
//                     color: "rgba(255,255,255,0.72)",
//                   }}
//                 >
//                   {section.content}
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>

//         <Box
//           sx={{
//             borderRadius: 2.6,
//             background: "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 100%)",
//             border: `1px solid rgba(255,255,255,0.16)`,
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
//             Your privacy choices
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
//             If you have questions about how we handle your information, or if
//             you would like to update, correct, or delete your details, please
//             contact our team. We will review your request and respond within a
//             reasonable timeframe.
//           </Box>
//           <Box
//             component="p"
//             sx={{
//               fontSize: 13,
//               color: "rgba(255,255,255,0.56)",
//             }}
//           >
//             This policy may be updated occasionally to reflect changes in our
//             services or applicable regulations.
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default PrivacyPolicy;

"use client";

import {
  Security,
  Visibility,
  MailOutline,
  DeleteSweep,
  ShieldOutlined,
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

const sections = [
  {
    icon: Security,
    title: "Information We Collect",
    content:
      "We collect only the information necessary to provide our construction services and respond to your enquiries. This may include your name, contact details, project requirements, and any files or drawings you choose to share with us.",
    number: "01",
  },
  {
    icon: Visibility,
    title: "How We Use Your Information",
    content:
      "Your information is used to prepare proposals, manage ongoing projects, improve our services, and communicate important updates. We never sell your personal data or share it with third parties for unrelated marketing.",
    number: "02",
  },
  {
    icon: MailOutline,
    title: "Communication & Updates",
    content:
      "We may contact you by email or phone to share project updates, appointment reminders, or relevant service information. You can ask us to limit certain communications at any time.",
    number: "03",
  },
  {
    icon: DeleteSweep,
    title: "Data Protection & Retention",
    content:
      "We store your information in secure systems and keep it only for as long as required for legal, accounting, or project-related reasons. When no longer needed, your data is safely deleted or anonymised.",
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

function PrivacyPolicy() {
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
        // Background grid texture
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
        // Radial glow top-right
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${toRgba(primaryColor, 0.16)} 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: "none",
        },
      }}
    >
      {/* Decorative bottom-left glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
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
            <ShieldOutlined sx={{ fontSize: 14, color: dark.gold }} />
            <Box component="span" sx={{ fontSize: 12, fontWeight: 600, color: dark.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              S&amp;S Associates
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
            Privacy{" "}
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
              Policy
            </Box>
          </Box>

          <Box
            component="p"
            sx={{ fontSize: 15, color: dark.textMuted, maxWidth: 520, mx: "auto", lineHeight: 1.75 }}
          >
            We respect your privacy and are committed to protecting the information you share with S&amp;S Associates.
          </Box>

          {/* Decorative line */}
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
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Box
                key={section.title}
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
                {/* Large background number */}
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
                  {section.number}
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
                    {section.title}
                  </Box>
                </Box>

                {/* Divider */}
                <Box sx={{ height: "1px", background: `linear-gradient(90deg, ${dark.borderAccent}, transparent)` }} />

                <Box
                  component="p"
                  sx={{ fontSize: 14, lineHeight: 1.8, color: dark.textMuted, position: "relative", zIndex: 1 }}
                >
                  {section.content}
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
              <ShieldOutlined sx={{ fontSize: 18 }} />
            </Box>
            <Box>
              <Box component="h3" sx={{ fontWeight: 700, fontSize: 15, color: dark.white, mb: 0.75 }}>
                Your privacy choices
              </Box>
              <Box component="p" sx={{ fontSize: 14, lineHeight: 1.75, color: dark.textMuted, mb: 1 }}>
                If you have questions about how we handle your information, or if you would like to update, correct, or delete your details, please contact our team. We will review your request and respond within a reasonable timeframe.
              </Box>
              <Box component="p" sx={{ fontSize: 13, color: dark.textDim, fontStyle: "italic" }}>
                This policy may be updated occasionally to reflect changes in our services or applicable regulations.
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}

export default PrivacyPolicy;