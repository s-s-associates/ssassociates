import React from 'react'
import OurClients from './OurClients'
import Stats from '../about/Stats'
import OurPrinciples from '../about/OurPrinciples'
import WhyChooseUs from '../about/WhyChooseUs'
import Faqs from './Faqs'
import ContactForm from '../contact/ContactForm'
import GsapBoxScrollAnimation from './GsapBoxScrollAnimation'
import Projects from '../projects/Projects'
import HomeBanner from './HomeBanner'

function LandingPage() {
  return (
    <div>
        <HomeBanner/>
        <Stats />
      <OurPrinciples />
      <Projects/>
      {/* <GsapBoxScrollAnimation /> */}
      <WhyChooseUs />
        <OurClients/>
        <ContactForm/>
        <Faqs/>
    </div>
  )
}

export default LandingPage