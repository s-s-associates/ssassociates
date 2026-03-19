import React from "react";
import Banner from "./Banner";
import OurPrinciples from "./OurPrinciples";
import CoreValues from "./CoreValues";
import OurProcess from "./OurProcess";
import WhoWeAre from "./WhoWeAre";

function About() {
  return (
    <>
      <Banner />
      {/* <Stats /> */}
      <OurPrinciples />
      <WhoWeAre />
      <OurProcess />
      <CoreValues />
      {/* <WhyChooseUs /> */}
    </>
  );
}

export default About;