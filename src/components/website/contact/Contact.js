import React from 'react'
import Banner from './Banner'
import ContactForm from './ContactForm'
import GetInTouch from './GetInTouch'
import Map from './Map'
import CTASection from './CTASection'
import SocialMediaSection from './SocialMediaSection'

function Contact() {
    return (
        <>
            <Banner/>
            <GetInTouch/>
            <ContactForm/>
            <SocialMediaSection/>
            <Map/>
            <CTASection/>
        </>
    )
}
export default Contact