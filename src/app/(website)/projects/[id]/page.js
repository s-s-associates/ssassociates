import { bggrayColor, bordergrayColor, primaryColor, primaryHover } from "@/components/utils/Colors";
import ProjectDetail from "@/components/website/projects/projectDetail/ProjectDetail";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

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

  return <ProjectDetail project={project} />;
}
