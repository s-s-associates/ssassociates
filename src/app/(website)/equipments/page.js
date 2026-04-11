import ToolsAndMachinery from "@/components/website/services/ToolsAndMachinery";
import { truncateMetaDescription } from "@/lib/site-config";
import React from "react";

export const metadata = {
  title: "Equipments",
  description: truncateMetaDescription(
    "Equipments of S&S Associates for projects. We have a wide range of equipments to choose from."
  ),
  alternates: { canonical: "/equipments" },
};

export default function EquipmentsPage() {
  return <ToolsAndMachinery />;
}
