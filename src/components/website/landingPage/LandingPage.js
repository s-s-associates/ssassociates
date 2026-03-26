"use client";
import React from 'react'
import OurClients from './OurClients'
import Stats from '../about/Stats'
import OurPrinciples from '../about/OurPrinciples'
import WhyChooseUs from '../about/WhyChooseUs'
import Faqs from './Faqs'
import ContactForm from '../contact/ContactForm'
import Projects from '../projects/Projects'
import HomeBanner from './HomeBanner'
import WhoWeAre from '../about/WhoWeAre';
import ServicesCards from '../services/ServicesCards';
import Map from '../contact/Map';
import CTASection from '../contact/CTASection';
import SocialMediaSection from '../contact/SocialMediaSection';

function LandingPage() {
  return (
    <div>
      <HomeBanner/>
      <SocialMediaSection/>
      <CTASection/>
      <Map/>
      <WhoWeAre/>
      <Stats/>
      <OurPrinciples/>
      <ServicesCards/>
      <Projects/>
      <WhyChooseUs/>
      <OurClients/>
      <ContactForm/>
      <Faqs/>
    </div>
  )
}

export default LandingPage