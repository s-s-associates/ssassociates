import Projects from "@/components/website/projects/Projects";
import { truncateMetaDescription } from "@/lib/site-config";
import React from "react";

export const metadata = {
  title: "Projects",
  description: truncateMetaDescription(
    "Explore our portfolio of residential, commercial, and grey structure projects delivered by S&S Associates."
  ),
  alternates: { canonical: "/projects" },
};

function ProjectsPage() {
  return (
    <Projects />
  )
}

export default ProjectsPage