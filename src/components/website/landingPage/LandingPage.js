import React from 'react'
import OurClients from './OurClients'
import Stats from '../about/Stats'
import OurPrinciples from '../about/OurPrinciples'
import WhyChooseUs from '../about/WhyChooseUs'
import Faqs from './Faqs'
import ContactForm from '../contact/ContactForm'

function LandingPage() {
  return (
    <div>
        <Stats />
      <OurPrinciples />
      <WhyChooseUs />
        <OurClients/>
        <ContactForm/>
        <Faqs/>
    </div>
  )
}

export default LandingPage