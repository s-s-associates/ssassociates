import Services from "@/components/website/services/Services";
import { truncateMetaDescription } from "@/lib/site-config";
import React from "react";

export const metadata = {
  title: "Services",
  description: truncateMetaDescription(
    "Construction services — grey structure, residential and commercial builds, fit-outs, renovation, and project management by S&S Associates."
  ),
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <Services />;
}
