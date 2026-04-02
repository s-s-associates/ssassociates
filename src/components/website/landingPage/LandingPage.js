"use client";
import React from 'react'
import OurClients from './OurClients'
import Stats from '../about/Stats'
import OurPrinciples from '../about/OurPrinciples'
import WhyChooseUs from '../about/WhyChooseUs'
import Faqs from './Faqs'
import ContactForm from '../contact/ContactForm'
import HomeBanner from './HomeBanner'
import ServicesCards from '../services/ServicesCards';
import ProjectCard from '../projects/ProjectCard';
import WhoWeAre from '../about/WhoWeAre';
import OurProcess from '../about/OurProcess';
import Testimonials from './Testimonials';

function LandingPage() {
  return (
    <div>
      <HomeBanner/> {/* Dark Theme  */}
      <Stats/> {/* Light Theme  */}
      <ServicesCards/> {/* Dark Theme  */}
      <ProjectCard maxProjects={5} /> {/* Dark Theme  */}
      <OurClients/> {/* Dark Theme  */}
      <WhoWeAre/> {/* Light Theme  */}
      <OurProcess/> {/* Dark Theme  */}
      {/* <WhyChooseUs/> Dark Theme  */}
      <ContactForm/> {/* Light Theme  */}
      <Testimonials/> {/* Dark Theme  */}
      <Faqs/> {/* Light Theme  */}
    </div>
  )
}

export default LandingPage