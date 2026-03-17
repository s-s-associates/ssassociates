import React from "react";
import Banner from "./Banner";
import OurPrinciples from "./OurPrinciples";
import CoreValues from "./CoreValues";
import OurProcess from "./OurProcess";

function About() {
  return (
    <>
      <Banner />
      {/* <Stats /> */}
      <OurPrinciples />
      <OurProcess />
      <CoreValues />
      {/* <WhyChooseUs /> */}
    </>
  );
}

export default About;