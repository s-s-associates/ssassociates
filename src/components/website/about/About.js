import React from "react";
import Banner from "./Banner";
import OurPrinciples from "./OurPrinciples";
import CoreValues from "./CoreValues";
import OurProcess from "./OurProcess";
import WhoWeAre from "./WhoWeAre";
import Stats from "./Stats";
import WhyChooseUs from "./WhyChooseUs";
import MessageFromCEO from "./MessageFromCEO";

function About() {
  return (
    <>
      <Banner />
      <OurPrinciples />
      <Stats />
      <MessageFromCEO />
      <WhyChooseUs />
      <WhoWeAre />
      <OurProcess />
      <CoreValues />
    </>
  );
}

export default About;