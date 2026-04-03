import LandingPage from "@/components/website/landingPage/LandingPage";
import { getPublicFaqs, getPublicProjects, getPublicServices, getPublicTestimonials } from "@/lib/public-content";
import { SITE_NAME, truncateMetaDescription } from "@/lib/site-config";

export const metadata = {
  title: { absolute: `${SITE_NAME} | Construction & Building Solutions` },
  description: truncateMetaDescription(
    "Residential and commercial construction, grey structure, and fit-outs — S&S Associates delivers quality building projects across Pakistan."
  ),
  alternates: { canonical: "/" },
};

/** ISR: fresh API-backed content periodically without client-only fetches for crawlers. */
export const revalidate = 60;

export default async function Home() {
  const [initialServices, initialProjects, initialTestimonials, initialFaqs] = await Promise.all([
    getPublicServices(),
    getPublicProjects(),
    getPublicTestimonials(),
    getPublicFaqs(),
  ]);

  return (
    <LandingPage
      initialServices={initialServices}
      initialProjects={initialProjects}
      initialTestimonials={initialTestimonials}
      initialFaqs={initialFaqs}
    />
  );
}
