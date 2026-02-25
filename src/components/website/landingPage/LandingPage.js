import React from 'react'
import Banner from './Banner'
import StopLosing from './StopLosing'
import EverythingNeed from './EverythingNeed'
import DataCome from './DataCome'
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
        <DataCome/>
        <Pricing/>
        <Guessing/>
    </div>
  )
}

export default LandingPage