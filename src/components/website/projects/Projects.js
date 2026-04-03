import React from "react";
import Banner from "./Banner";
import ProjectCard from "./ProjectCard";
import ProjectsExpertiseGrid from "./ProjectsExpertiseGrid";
import ProjectsIntroStats from "./ProjectsIntroStats";
import ProjectsPageCTA from "./ProjectsPageCTA";

function Projects() {
  return (
    <>
      <Banner />
      <ProjectCard showCategoryFilter />
      {/* <ProjectsIntroStats /> */}
      <ProjectsExpertiseGrid />
      <ProjectsPageCTA />
    </>
  );
}

export default Projects;