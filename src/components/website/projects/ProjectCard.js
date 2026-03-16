"use client";

import { whiteColor, blackColor, textGrayLight, secondaryDark, primaryColor } from "@/components/utils/Colors";
import { btnRadius, boxShadow, transition } from "@/components/utils/GlobalVariables";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProjectCard() {

  const projects = [
    {
      image: "/images/projects/EY-Fit-Out-Thumbnail-min.webp",
      title: "Sustainably focused office fit-out for global professionals",
      companyName: "EY",
      address: "Bedford House, Belfast",
      href: "/projects/ey-fit-out",
    },
    {
      image: "/images/projects/thumbnail-min.webp",
      title: "Industrial fit-out for global innovation consultants",
      companyName: "PA Consulting",
      address: "The Printworks, Belfast",
      href: "/projects/pa-consulting",
    },
    {
      image: "/images/projects/somerville-metro-small-res-108-min.webp",
      title: "Inspiring and flexible office space with a touch of city luxury",
      companyName: "Metro",
      address: "Metro Building, Belfast",
      href: "/projects/metro",
    },
    {
      image: "/images/projects/Jacobs-Dublin-Office-Fit-Out-Thumbnail-min.webp",
      title: "Design & build fit-out for international consultant",
      companyName: "Jacobs",
      address: "Dublin",
      href: "/projects/jacobs",
    },
    {
      image: "/images/projects/rsm-project-supporting.webp",
      title: "Bespoke office joinery & fit-out for multinational tax consultants",
      companyName: "RSM",
      address: "The Ewart Building",
      href: "/projects/rsm",
    },
  ];



  return (
    <Box
      my={8}
      p={5}
      bgcolor={secondaryDark}
      borderRadius={6}
      maxWidth={1450}
      mx={[1, 2, 3, 4, "auto"]}
    >
      <Grid container spacing={5} alignItems="flex-start">
        {/* First grid item: static text block */}
        <Grid size={{xs:12,sm:6,md:4}}>
          <Box sx={{ minWidth: 0 }}>
        <Typography
          component="span"
          sx={{
            color: whiteColor,
            fontWeight: 700,
            fontSize: { xs: 25, sm: 30, md: 35, lg: 40 },
            lineHeight: 1.25,
            backgroundImage: `linear-gradient(${whiteColor}, ${whiteColor})`,
            backgroundSize: "0% 2px",
            backgroundPosition: "bottom left",
            backgroundRepeat: "no-repeat",
            transition: "background-size 0.6s ease",
            "&:hover": {
              backgroundSize: "100% 3px",
              textDecorationColor: whiteColor,
            },
          }}
        >
          Inspirational interior fit-outs and specialist joinery
        </Typography>
        <Typography
          sx={{
            color: textGrayLight,
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.65,
            mt: 2,
            mb: 4,
          }}
        >
          Discover some of our recent projects, showcasing distinct and memorable interior spaces.
        </Typography>
        <Button
          component={Link}
          href="/projects"
          startIcon={null}
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />}
          sx={{
            px: 2.5,
            py: 1.5,
            borderRadius: 999,
            backgroundColor: "#FAFAFA",
            color: blackColor,
            fontWeight: 600,
            fontSize: 15,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          All Projects
        </Button>
          </Box>
        </Grid>

        {/* Project Cards – mapped */}
        {projects.map((project) => (
          <Grid size={{xs:12,sm:6,md:4}} key={project.href}>
    <Box
      component={Link}
      href={project.href}
      sx={{
        display: "block",
        textDecoration: "none",
        borderRadius: btnRadius,
        overflow: "hidden",
        backgroundColor: secondaryDark,
        boxShadow,
        transition,
        minWidth: 0,
      }}
    >
        {/* Card Image */}
      <Box
        className="card-image-wrap" 
        sx={{ 
          position: "relative",
          width: "100%",
          height: 250,
          overflow: "hidden",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          transition: "border-radius 0.3s ease-in-out",
          "&:hover": {
            borderBottomLeftRadius: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 30,
        },
          "&:hover .card-image-inner": {
            transform: "scale(1.05)",
          },
          "&:hover .card-plus-btn": {
            backgroundColor: secondaryDark,
            color: whiteColor,
          },
          "&:hover .card-plus-icon": {
            transform: "rotate(360deg)",
          },
        }}
      >
        <Box
          className="card-image-inner"
          sx={{
            position: "absolute",
            inset: 0,
            transition: "transform 0.4s ease",
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box
          className="card-plus-btn"
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: primaryColor,
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <AddRoundedIcon
            className="card-plus-icon"
            sx={{
              fontSize: 20,
              transition: "transform 0.5s ease",
            }}
          />
        </Box>
      </Box>

      {/* Card Title */}
      <Box>
        <Box
          sx={{
            display: "inline-block",
            maxWidth: "100%",
            my: 1.5,
          }}
        >
          <Typography
            // className="card-title-text"
            component="span"
            sx={{
              display: "inline",
              fontWeight: 700,
              fontSize: { xs: 15, sm: 16, md: 23 },
              lineHeight: 1.35,
              color: whiteColor,
              backgroundImage: `linear-gradient(${whiteColor}, ${whiteColor})`,
            backgroundSize: "0% 2px",
            backgroundPosition: "bottom left",
            backgroundRepeat: "no-repeat",
            transition: "background-size 0.6s ease",
            "&:hover": {
              backgroundSize: "100% 3px",
              textDecorationColor: whiteColor,
            },
            }}
          >
            {project.title}
          </Typography>
        </Box>
        {project.companyName && project.address && (
          <Box
            component="span"
            sx={{
              fontWeight: 400,
              fontSize: 13,
              color: whiteColor,
              opacity: 0.85,
            }}
          >
            {project.companyName} {" | "}{project.address}
          </Box>
        )}
      </Box>
    </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
