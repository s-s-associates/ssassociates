import SetupAdmin from "@/components/website/auth/SetupAdmin";
import React from "react";

export const metadata = {
  title: "Setup",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() {
  return <SetupAdmin />;
}
