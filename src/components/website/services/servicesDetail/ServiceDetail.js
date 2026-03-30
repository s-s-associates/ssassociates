"use client";

import { Box } from "@mui/material";
import Banner from "./Banner";
import Deliverables from "./Deliverables";
import Overview from "./Overview";
import ServiceCTA from "./ServiceCTA";
import WhyChooseUs from "./WhyChooseUs";
import SubServicesDetail from "./SubServicesDetail";

export default function ServiceDetail({ service }) {
  const heroSrc =
    service.imageUrl?.trim() || "/images/projects/EY-Fit-Out-Thumbnail-min.webp";
  const whatYouGet = Array.isArray(service.whatYouGet) ? service.whatYouGet.filter(Boolean) : [];
  const subServicesDetail = Array.isArray(service.subServices) ? service.subServices : [];
  const extraBenefits = Array.isArray(service.extraBenefits) ? service.extraBenefits.filter(Boolean) : [];
  const conclusion =
    service.conclusion?.trim() ||
    "We deliver quality, transparency, and engineering rigor so your project stands on a solid foundation.";

  const descText = (service.description || "").trim();
  const descFallback = "Learn how we plan, build, and hand over with clarity at every stage.";
  const fullDescForHero = descText || descFallback;
  const HERO_WORD_LIMIT = 20;
  const descWords = fullDescForHero.trim().split(/\s+/).filter(Boolean);
  const isLongByWords = descWords.length > HERO_WORD_LIMIT;
  const heroBannerDescription = isLongByWords
    ? `${descWords.slice(0, HERO_WORD_LIMIT).join(" ")}…`
    : fullDescForHero;
  const showFullOverviewBelow = isLongByWords;

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Banner service={service} heroSrc={heroSrc} heroBannerDescription={heroBannerDescription} />
      <Deliverables whatYouGet={whatYouGet} />
      {showFullOverviewBelow ? <Overview fullDescForHero={fullDescForHero} /> : null}
      <WhyChooseUs extraBenefits={extraBenefits} />
      <SubServicesDetail subServices={subServicesDetail} />
      <ServiceCTA conclusion={conclusion} />
    </Box>
  );
}
