import React from "react";
import Banner from "./Banner";
import ServicesCards from "./ServicesCards";
import ServicesEngagementGrid from "./ServicesEngagementGrid";
import ServicesIntroStats from "./ServicesIntroStats";
import ServicesPageCTA from "./ServicesPageCTA";

function Services() {
  return (
    <>
      <Banner />
      <ServicesCards />
      {/* <ServicesIntroStats /> */}
      <ServicesEngagementGrid />
      <ServicesPageCTA />
    </>
  );
}

export default Services;