import React from 'react'
import Banner from './Banner'
import StopLosing from './StopLosing'
import EverythingNeed from './EverythingNeed'

import Pricing from './Pricing'
import Insights from './Insights'
import Guessing from './Guessing'

function LandingPage() {
  return (
    <div>
        <Banner/>
        <StopLosing/>
        <Insights/>
        <EverythingNeed/>
   
        <Pricing/>
        <Guessing/>
    </div>
  )
}

export default LandingPage