'use client'

import React from 'react'
import { Button } from './ui/button'
import { 
    FaChevronUp,
    FaChevronDown
} from 'react-icons/fa'
import { TaxSelectorProps } from '@/types/estimates'
import { formatTaxString } from '@/utils/formatingFunctions'
 
const TaxSelector = ({
    taxRate,
    setTaxRate
}: TaxSelectorProps) => {

  const increaseTaxRate = () => {
    if (taxRate < 1) {
      setTaxRate(taxRate + 0.01)
    }
  }

  const decreaseTaxRate = () => {
    if (taxRate > 0) {
      setTaxRate(taxRate - 0.01);
    }
  }

  return (
    <div className='rounded relative'>
        <p>{formatTaxString(taxRate)}</p>
        <div className='flex flex-col absolute right-0 top-0 w-16 z-10'>
            <Button
                 className='bg-primary300 p-0 w-full h-1/2 rounded-none'
                 onClick={() => {
                    increaseTaxRate()
                 }}
                 type='button'
            >
                <FaChevronUp />
            </Button>
            <Button
                 className='bg-primary300 p-0 w-full h-1/2 rounded-none'
                 onClick={() => {
                    decreaseTaxRate()
                 }}
                 type='button'
            >
                <FaChevronDown />
            </Button>
        </div>
    </div>
  )
}

export default TaxSelector