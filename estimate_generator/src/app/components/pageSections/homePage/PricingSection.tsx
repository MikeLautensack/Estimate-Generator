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
    <section id='pricing' className='w-full flex flex-col items-center desktop:h-screen bg-primary200'>

        <div className='my-4'>
          {/**
          * Heading
          */}
          <div className='flex flex-col items-center justify-center'>
            <h5 className='text-xl font-bold text-primary500'>PRICING</h5>
            <h3 className='text-2xl font-bold text-primary500 text-center'>Choose the Estimate Generator plan that fits your needs</h3>
          </div>

          {/**
           *  Rate Type Selection
           */}
          <div className='flex justify-center items-center gap-4 mt-4'>
            <div>
              <p className='text-primary500'>10% off</p>
              <h4 className='text-primary500'>Annual</h4>
            </div>
            <ReactSwitch
              onChange={click}
              checked={subRateType}
              offColor='#d4af37'
              onColor='#d4af37'
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <div className='flex flex-col'>
              <h4 className='text-primary500'>Monthly</h4>
            </div>
          </div>
        </div>

        {/**
         *  Subscription Cards`
         */}
        <div className='flex flex-col gap-4 mx-4 desktop:flex-row justify-evenly mb-4 h-full'>
          {subscriptionCards.map((subCard) => (
            <div className='basis-full' key={subscriptionCards.indexOf(subCard)}>
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
            </div>
          ))}
        </div>

      </section>
  )
}
