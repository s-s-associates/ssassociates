"use client";
import React from "react";
import OurClients from "./OurClients";
import Stats from "../about/Stats";
import Faqs from "./Faqs";
import ContactForm from "../contact/ContactForm";
import HomeBanner from "./HomeBanner";
import ServicesCards from "../services/ServicesCards";
import ProjectCard from "../projects/ProjectCard";
import WhoWeAre from "../about/WhoWeAre";
import OurProcess from "../about/OurProcess";
import Testimonials from "./Testimonials";

/**
 * @param {{ initialServices?: object[], initialProjects?: object[], initialTestimonials?: object[], initialFaqs?: object[] }} props
 * Server-fetched lists so services/projects/testimonials/FAQs render in HTML for crawlers.
 */
function LandingPage({
  initialServices = [],
  initialProjects = [],
  initialTestimonials = [],
  initialFaqs = [],
}) {
  return (
    <div>
      <HomeBanner />
      <Stats />
      <ServicesCards initialServices={initialServices} />
      <ProjectCard maxProjects={5} initialProjects={initialProjects} />
      <OurClients />
      <WhoWeAre />
      <OurProcess />
      <ContactForm />
      <Testimonials initialTestimonials={initialTestimonials} />
      <Faqs initialFaqs={initialFaqs} />
    </div>
  );
}

export default LandingPage;