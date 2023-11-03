import React from 'react'
import Button from './Button'
import { SubscriptionCardProps } from "@/types/types"
import { FaCheck } from "react-icons/fa"

export default function SubscriptionCard({ heading, 
                                           paragraph,
                                           annualPrice, 
                                           monthlyPrice, 
                                           annualSubHeading, 
                                           monthlySubHeading,
                                           featuresArray, 
                                           state }: SubscriptionCardProps) {

  const displayPrice = () => {
    if(!state) {
        return annualPrice
    } else {
        return monthlyPrice
    }
  }

  const displaySubHeading = () => {
    if(!state) {
        return annualSubHeading
    } else {
        return monthlySubHeading
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center px-6 py-12 basis-full h-full bg-primary100 rounded hover:shadow-md hover:shadow-primary500 hover:scale-[1.03]'>
        <h4 className='text-[32px] font-bold text-primary500 text-center'>{heading}</h4>
        <p className='text-base font-normal text-primary500 text-center'>{paragraph}</p>
        <h1 className='text-[54px] font-bold text-center text-primary500'>{`${displayPrice()}`}</h1>
        <p className='text-base font-normal text-primary500 text-center'>{displaySubHeading()}</p>
        <Button
            className='bg-primary500 text-primary100 text-xl font-medium p-4 rounded'
        >
            Get Started
        </Button>
        <div className=''>
            {<ul className=''>{featuresArray.map((feature) => (
                <li className='flex gap-2 items-center text-[18px] font-normal' key={featuresArray.indexOf(feature)}>
                    <FaCheck className='text-succcess500'/>
                    <p className='text-primarys500'>{feature}</p>
                </li>
            ))}</ul>}
        </div>
    </div>
  )
}
