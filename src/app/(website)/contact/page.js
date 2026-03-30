import Contact from "@/components/website/contact/Contact";
import { truncateMetaDescription } from "@/lib/site-config";
import React from "react";

export const metadata = {
  title: "Contact",
  description: truncateMetaDescription(
    "Contact S&S Associates for quotes, project enquiries, and construction consultations."
  ),
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
