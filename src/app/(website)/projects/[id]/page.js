import { ProjectPageJsonLd } from "@/components/seo/SEO";
import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import ProjectDetail from "@/components/website/projects/projectDetail/ProjectDetail";
import { connectDB } from "@/lib/db";
import { normalizeProjectChallengesSolutions } from "@/lib/project-challenges-solutions";
import { getSiteUrl, truncateMetaDescription } from "@/lib/site-config";
import Project from "@/models/Project";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams?.id || "");
  const base = getSiteUrl();
  const path = `/projects/${id}`;
  try {
    await connectDB();
    const project = await Project.findById(id).select("title description tagline bannerUrl createdAt updatedAt").lean();
    if (!project) {
      return {
        title: "Project not found",
        robots: { index: false, follow: false },
      };
    }
    const desc = truncateMetaDescription(project.description || project.tagline || project.title || "");
    const canonical = `${base}${path}`;
    return {
      title: project.title || "Project",
      description: desc || undefined,
      alternates: { canonical: path },
      robots: { index: true, follow: true },
      openGraph: {
        title: project.title || "Project",
        description: desc || undefined,
        url: canonical,
        type: "article",
        publishedTime: project.createdAt ? new Date(project.createdAt).toISOString() : undefined,
        modifiedTime: project.updatedAt ? new Date(project.updatedAt).toISOString() : undefined,
        images: project.bannerUrl ? [{ url: project.bannerUrl, alt: project.title || "Project" }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: project.title || "Project",
        description: desc || undefined,
        images: project.bannerUrl ? [project.bannerUrl] : undefined,
      },
    };
  } catch {
    return { title: "Project", robots: { index: false } };
  }
}

export default async function ProjectDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams?.id || "");
  await connectDB();
  const project = await Project.findById(id).lean();

  if (!project) {
    return (
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: bggrayColor, minHeight: "100vh" }}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 820,
            mx: "auto",
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: `1px solid ${bordergrayColor}`,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 26, fontWeight: 700, mb: 1 }}>Project Not Found</Typography>
          <Typography sx={{ color: "rgba(0,0,0,0.6)", mb: 3 }}>
            The requested project details are not available in this demo preview.
          </Typography>
          <Link href="/projects" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<FiArrowLeft />}
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 2.2,
                "&:hover": { bgcolor: primaryHover },
              }}
            >
              Back to Projects
            </Button>
          </Link>
        </Paper>
      </Box>
    );
  }

  const normalized = normalizeProjectChallengesSolutions(project);
  const base = getSiteUrl();
  const path = `/projects/${id}`;
  return (
    <>
      <ProjectPageJsonLd project={normalized} baseUrl={base} path={path} />
      <ProjectDetail project={normalized} />
    </>
  );
}
