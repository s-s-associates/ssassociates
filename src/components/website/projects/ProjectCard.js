"use client";

import {
  whiteColor,
  blackColor,
  textGrayLight,
  secondaryDark,
  primaryColor,
} from "@/components/utils/Colors";
import {
  btnRadius,
  boxShadow,
  transition,
  sectionRadius,
} from "@/components/utils/GlobalVariables";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const FALLBACK_IMAGE = "/images/projects/thumbnail-min.webp";
const SKELETON_COUNT = 6;

function hasClientLocationLine(project) {
  return Boolean(
    (project?.clientName || "").trim() &&
    (project?.location || project?.category || "").trim(),
  );
}

function ProjectCardSkeleton() {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box
        sx={{
          borderRadius: btnRadius,
          overflow: "hidden",
          backgroundColor: secondaryDark,
          boxShadow,
          minWidth: 0,
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            height: 250,
            width: "100%",
            transform: "none",
            bgcolor: "rgba(255,255,255,0.08)",
            borderRadius: `${sectionRadius} ${sectionRadius} ${sectionRadius} ${sectionRadius}`,
          }}
        />
        <Box sx={{ px: 0, py: 1.5 }}>
          <Skeleton
            width="92%"
            height={28}
            sx={{ bgcolor: "rgba(255,255,255,0.1)", mb: 1 }}
          />
          <Skeleton
            width="60%"
            height={18}
            sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
          />
        </Box>
      </Box>
    </Grid>
  );
}

export default function ProjectCard({ maxProjects, initialProjects }) {
  const hasInitial =
    Array.isArray(initialProjects) && initialProjects.length > 0;
  const [projects, setProjects] = useState(() =>
    hasInitial ? initialProjects : [],
  );
  const [loading, setLoading] = useState(() => !hasInitial);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (hasInitial) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (!data.success || !Array.isArray(data.projects)) {
          throw new Error(data.message || "Failed to load projects");
        }
        if (!cancelled) setProjects(data.projects);
      } catch (e) {
        if (!cancelled) {
          setFetchError(e?.message || "Failed to load projects");
          setProjects([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hasInitial]);

  const visibleProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];
    if (typeof maxProjects !== "number" || maxProjects <= 0) return projects;
    return projects.slice(0, maxProjects);
  }, [projects, maxProjects]);

  return (
    <Box
      my={8}
      px={[2, 3, 5]}
      py={[5, 5, 5]}
      bgcolor={secondaryDark}
      borderRadius={sectionRadius}
      maxWidth={1450}
      mx={[1, 2, 3, 4, "auto"]}
    >
      <Grid container spacing={5} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="h2"
              sx={{
                color: whiteColor,
                fontWeight: 700,
                fontSize: { xs: 25, sm: 30, md: 35, lg: 40 },
                lineHeight: 1.25,
                margin: 0,
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
              Discover some of our recent projects, showcasing distinct and
              memorable interior spaces.
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

        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ProjectCardSkeleton key={`sk-${i}`} />
          ))}

        {!loading &&
          !fetchError &&
          visibleProjects.map((project, index) => {
            const id = project?._id != null ? String(project._id) : "";
            const href = id ? `/projects/${id}` : "/projects";
            const image =
              project?.bannerUrl &&
              (String(project.bannerUrl).startsWith("http") ||
                String(project.bannerUrl).startsWith("/"))
                ? project.bannerUrl
                : FALLBACK_IMAGE;
            const title = project?.title || "Untitled project";
            const companyName = (project?.clientName || "").trim();
            const address = (
              project?.location ||
              project?.category ||
              ""
            ).trim();
            const showClientLocation = hasClientLocationLine(project);
            const imagePriority = index < 6;
            return (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={id || `${title}-${index}`}
              >
                <Box
                  component={Link}
                  href={href}
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
                  <Box
                    className="card-image-wrap"
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 250,
                      overflow: "hidden",
                      borderBottomLeftRadius: sectionRadius,
                      borderBottomRightRadius: sectionRadius,
                      borderTopLeftRadius: sectionRadius,
                      borderTopRightRadius: sectionRadius,
                      transition: "border-radius 0.3s ease-in-out",
                      "&:hover": {
                        borderBottomLeftRadius: sectionRadius,
                        borderTopLeftRadius: sectionRadius,
                        borderTopRightRadius: sectionRadius,
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
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                        priority={imagePriority}
                        fetchPriority={imagePriority ? "high" : "auto"}
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
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
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

                  <Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        maxWidth: "100%",
                        my: 1.5,
                      }}
                    >
                      <Typography
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
                        {title}
                      </Typography>
                    </Box>
                    {showClientLocation ? (
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 400,
                          fontSize: 13,
                          color: whiteColor,
                          opacity: 0.85,
                          display: "block",
                        }}
                      >
                        {companyName} {" | "}
                        {address}
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Grid>
            );
          })}

        {!loading && fetchError && (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography sx={{ color: textGrayLight, fontSize: 14, pt: 1 }}>
              Projects could not be loaded. Please try again later.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
