'use client'

import React from 'react'
import { useState } from 'react'
import SubscriptionCard from '../../SubscriptionCard'
import { subscriptionCards } from '../../../../utils/content'
import ReactSwitch from 'react-switch'

export default function PricingSection() {

  const [ subRateType, setSubRateType ] = useState(false)

  const click = () => {
    if(subRateType) {
        setSubRateType(false)
    } else {
        setSubRateType(true)
    }
  }

  return (
    <section id='pricing' className='w-full flex flex-col items-center'>

        <div className='my-4'>
          {/**
          * Heading
          */}
          <div className='flex flex-col items-center justify-center'>
            <h5 className='text-xl font-bold text-accent500'>PRICING</h5>
            <h3 className='text-2xl font-bold text-secondary500 text-center'>Choose the Estimate Generator plan that fits your needs</h3>
          </div>

          {/**
           *  Rate Type Selection
           */}
          <div className='flex justify-center items-center gap-4 mt-4'>
            <div>
              <p className='text-secondary500'>10% off</p>
              <h4 className='text-secondary500'>Annual</h4>
            </div>
            <ReactSwitch
              onChange={click}
              checked={subRateType}
              offColor='#41aac5'
              onColor='#41aac5'
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <div className='flex flex-col'>
              <h4 className='text-secondary500'>Monthly</h4>
            </div>
          </div>
        </div>

        {/**
         *  Subscription Cards`
         */}
        <div className='flex flex-col gap-4 mx-4 desktop:flex-row justify-evenly mb-4'>
          {subscriptionCards.map((subCard) => (
            <SubscriptionCard
              heading={subCard.heading}
              paragraph={subCard.paragraph}
              annualPrice={subCard.annualPrice}
              monthlyPrice={subCard.monthlyPrice}
              annualSubHeading={subCard.annualSubHeading}
              monthlySubHeading={subCard.monthlySubHeading}
              featuresArray={subCard.featuresArray}
              state={subRateType}
            />
          ))}
        </div>

      </section>
  )
}
