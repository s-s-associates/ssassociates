import LandingPage from "@/components/website/landingPage/LandingPage";
import { getPublicFaqs, getPublicProjects, getPublicServices, getPublicTestimonials } from "@/lib/public-content";

export const revalidate = 60;

export default async function HomePage() {
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
