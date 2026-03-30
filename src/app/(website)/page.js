import LandingPage from "@/components/website/landingPage/LandingPage";
import { SITE_NAME, truncateMetaDescription } from "@/lib/site-config";

export const metadata = {
  title: { absolute: `${SITE_NAME} | Construction & Building Solutions` },
  description: truncateMetaDescription(
    "Residential and commercial construction, grey structure, and fit-outs — S&S Associates delivers quality building projects across Pakistan."
  ),
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
  <>
  <LandingPage/>
  </>
  );
}
