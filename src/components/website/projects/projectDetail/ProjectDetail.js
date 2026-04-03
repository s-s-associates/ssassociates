import { bggrayColor } from "@/components/utils/Colors";
import { Box, Grid } from "@mui/material";
import Banner from "./Banner";
import ChallengesAndSolutions from "./ChallengesAndSolutions";
import Features from "./Features";
import Overview from "./Overview";
import ProjectActionsPanel from "./ProjectActionsPanel";
import ProjectCTA from "./ProjectCTA";
import ProjectFactsPanel from "./ProjectFactsPanel";
import ProjectSpecifications from "./ProjectSpecifications";
import { buildFeatureItems, splitToList } from "./projectDetailHelpers";
import Technologies from "./Technologies";
import ImagesGallery from "./ImagesGallery";
import ProjectVideoSection from "./ProjectVideoSection";

export default function ProjectDetail({ project }) {
  const projectData = project || {};
  const technologyItems = splitToList(projectData.materialsUsed);
  const featureItems = buildFeatureItems(projectData);

  return (
    <>
      <Banner project={projectData} />
      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, sm: 3, md: 4, lg: 5 }, pt: { xs: 3, sm: 4 }, pb: { xs: 4, sm: 6 } }}>
            <Overview description={projectData.description} />
      </Box>

      
        <ProjectFactsPanel project={projectData} />
        <ProjectSpecifications project={projectData} />

            <Features items={featureItems} />
            <ChallengesAndSolutions project={projectData} />
            {/* <Technologies items={technologyItems} /> */}
            <ImagesGallery title={projectData.title} images={projectData.imageGallery || []} />
            <ProjectVideoSection videoUrl={projectData.videoUrl} title={projectData.title} />

      <ProjectCTA />
    </>
  );
}
