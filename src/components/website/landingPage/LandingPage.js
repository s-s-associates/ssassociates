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
import CTASection from '../contact/CTASection';
import Testimonials from './Testimonials';

function LandingPage() {
  return (
    <div>
      <HomeBanner/>
      <ServicesCards/>
      <ProjectCard/>
      <OurClients/>
      <WhoWeAre/>
      <OurProcess/>
      <Stats/>
      <WhyChooseUs/>
      <ContactForm/>
      <Testimonials/>
      <Faqs/>
    </div>
  )
}

export default LandingPage