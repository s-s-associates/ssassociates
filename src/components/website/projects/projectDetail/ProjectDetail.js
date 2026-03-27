import { bggrayColor } from "@/components/utils/Colors";
import { Box, Grid } from "@mui/material";
import Banner from "./Banner";
import ChallengesAndSolutions from "./ChallengesAndSolutions";
import Features from "./Features";
import Overview from "./Overview";
import ProjectActionsPanel from "./ProjectActionsPanel";
import ProjectFactsPanel from "./ProjectFactsPanel";
import { buildFeatureItems, splitToList } from "./projectDetailHelpers";
import Technologies from "./Technologies";
import ImagesGallery from "./ImagesGallery";

export default function ProjectDetail({ project }) {
  const technologyItems = splitToList(project.materialsUsed);
  const featureItems = buildFeatureItems(project);

  return (
    <Box sx={{ bgcolor: bggrayColor, minHeight: "100vh" }}>
      <Banner project={project} />

      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, sm: 3, md: 4, lg: 5 }, pt: { xs: 3, sm: 4 }, pb: { xs: 4, sm: 6 } }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Overview description={project.description} />
            <ChallengesAndSolutions project={project} />
            <Features items={featureItems} />
            <Technologies items={technologyItems} />
            <ImagesGallery title={project.title} images={project.imageGallery || []} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <ProjectFactsPanel project={project} />
            <ProjectActionsPanel project={project} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
