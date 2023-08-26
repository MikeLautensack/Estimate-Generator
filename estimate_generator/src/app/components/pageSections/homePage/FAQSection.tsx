'use client'

import React from 'react'
import { useReducer, useState } from 'react'
import FAQ from '../../FAQ'
import { Action, FAQItem } from '../../../../types/types'
import { FAQItemContent } from '@/utils/content'

const reducer = (state: FAQItem[], action: Action): FAQItem[] => {
    switch (action.type) {
      case 'action':
        return state.map((faq: FAQItem) => {
          if(action.payload == faq._id) {
            return {
              ...faq,
              opened: !faq.opened
            }
          } else {
            if(faq.opened === true) {
              return {
                ...faq,
                opened: false
              }
            } else {
              return faq
            }
          }
        })
      default:
        return []
    }
  };

export default function FAQSection() {

  const [ subRateType, setSubRateType ] = useState(false)
  const [FAQs, dispatch] = useReducer( reducer, FAQItemContent)

  return (
    <section id='faq' className='px-4 w-full'>
      <h5 className='text-xl text-primary500 font-bold text-center my-4'>FREQUENTLY ASKED QUESTIONS</h5>
      <div className='max-w-[75% flex justify-center'>
        <div className='flex flex-col gap-4 mb-16 mt-4 max-w-full'>
          {FAQs.map((faq: FAQItem) => (
            <div key={FAQs.indexOf(faq)}>
              <FAQ
                _id={faq._id}
                question={faq.question}
                answer={faq.answer}
                opened={faq.opened}
                dispatch={dispatch}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
