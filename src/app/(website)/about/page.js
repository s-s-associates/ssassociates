import About from "@/components/website/about/About";
import { truncateMetaDescription } from "@/lib/site-config";
import React from "react";

export const metadata = {
  title: "About us",
  description: truncateMetaDescription(
    "Learn about S&S Associates — our story, values, and experience in construction and building solutions."
  ),
  alternates: { canonical: "/about" },
};

export default function AboutRoute() {
    return (
        <>
        <About/>
        </>
    )
}
