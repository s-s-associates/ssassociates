// "use client";

// import {
//   secondaryDark,
//   whiteColor,
//   textGrayLight,
//   blackColor,
// } from "@/components/utils/Colors";
// import { btnRadius } from "@/components/utils/GlobalVariables";
// import { Box } from "@mui/material";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import Link from "next/link";
// import React from "react";
// import ProjectCard from "./ProjectCard";

// const projects = [
//   {
//     image: "/images/projects/EY-Fit-Out-Thumbnail-min.webp",
//     title: "Sustainably focused office fit-out for global professionals",
//     companyName: "EY",
//     address: "Bedford House, Belfast",
//     href: "/projects/ey-fit-out",
//   },
//   {
//     image: "/images/projects/thumbnail-min.webp",
//     title: "Industrial fit-out for global innovation consultants",
//     companyName: "PA Consulting",
//     address: "The Printworks, Belfast",
//     href: "/projects/pa-consulting",
//   },
//   {
//     image: "/images/projects/somerville-metro-small-res-108-min.webp",
//     title: "Inspiring and flexible office space with a touch of city luxury",
//     companyName: "Metro",
//     address: "Metro Building, Belfast",
//     href: "/projects/metro",
//   },
//   {
//     image: "/images/projects/Jacobs-Dublin-Office-Fit-Out-Thumbnail-min.webp",
//     title: "Design & build fit-out for international consultant",
//     companyName: "Jacobs",
//     address: "Dublin",
//     href: "/projects/jacobs",
//   },
//   {
//     image: "/images/projects/rsm-project-supporting.webp",
//     title: "Bespoke office joinery & fit-out for multinational tax consultants",
//     companyName: "RSM",
//     address: "The Ewart Building",
//     href: "/projects/rsm",
//   },
// ];

// export default function ProjectsCardsSection() {
// //   const [firstRowCards, secondRowCards] = [projects.slice(0, 2), projects.slice(2, 5)];

//   return (
//     <Box
//       component="section"
//       sx={{
//         backgroundColor: secondaryDark,
//         py: { xs: 6, md: 8 },
//         px: { xs: 2, sm: 3, md: 4 },
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//         }}
//       >
//         {/* Row 1: text block (left) + 2 cards (right) */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", lg: "minmax(280px, 1fr) 1fr" },
//             gridTemplateRows: { xs: "auto auto", lg: "1fr" },
//             gap: { xs: 4, lg: 4 },
//             alignItems: "start",
//             mb: { xs: 4, lg: 3 },
//           }}
//         >
//           {/* <Box sx={{ order: { xs: 1, lg: 0 } }}>
//             <Box
//               component="h2"
//               sx={{
//                 margin: 0,
//                 fontWeight: 700,
//                 fontSize: { xs: 26, sm: 28, md: 32 },
//                 lineHeight: 1.2,
//                 color: whiteColor,
//                 mb: 2,
//               }}
//             >
//               Inspirational interior fit-outs and specialist joinery
//             </Box>
//             <Box
//               component="p"
//               sx={{
//                 margin: 0,
//                 fontWeight: 400,
//                 fontSize: 15,
//                 lineHeight: 1.65,
//                 color: textGrayLight,
//                 mb: 3,
//                 maxWidth: 420,
//               }}
//             >
//               Discover some of our recent projects, showcasing distinct and
//               memorable interior spaces.
//             </Box>
//             <Box
//               component={Link}
//               href="/projects"
//               sx={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 1,
//                 px: 2.5,
//                 py: 1.5,
//                 borderRadius: btnRadius,
//                 backgroundColor: whiteColor,
//                 color: blackColor,
//                 fontWeight: 600,
//                 fontSize: 15,
//                 textDecoration: "none",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
//                 transition: "opacity 0.2s ease, transform 0.2s ease",
//                 "&:hover": {
//                   opacity: 0.95,
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               All Projects
//               <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
//             </Box>
//           </Box> */}

//           {/* <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
//               gap: 2.5,
//               order: { xs: 2, lg: 0 },
//             }}
//           >
//             {firstRowCards.map((project) => (
//               <ProjectCard
//                 key={project.href}
//                 image={project.image}
//                 title={project.title}
//                 companyName={project.companyName}
//                 address={project.address}
//                 href={project.href}
//               />
//             ))}
//           </Box> */}
//         </Box>

//         {/* Row 2: 3 cards */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: {
//               xs: "1fr",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//             },
//             gap: 2.5,
//           }}
//         >
//           {projects.map((project) => (
//             <ProjectCard
//               key={project.href}
//               image={project.image}
//               title={project.title}
//               companyName={project.companyName}
//               address={project.address}
//               href={project.href}
//             />
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// }
