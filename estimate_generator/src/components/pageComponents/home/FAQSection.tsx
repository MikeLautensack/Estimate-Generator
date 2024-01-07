'use client'

import React from 'react'
import { useReducer, useState } from 'react'
import FAQ from '../../misc/FAQ'
import { Action, FAQItem } from '../../../types/types'
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
        return FAQItemContent
    }
  };

export default function FAQSection() {

  const [ subRateType, setSubRateType ] = useState(false)
  const [FAQs, dispatch] = useReducer( reducer, FAQItemContent)

  return (
    <section id='faq' className='px-4 w-full flex-1 flex flex-col'>
      <h5 className='text-xl text-primary300 font-bold text-center my-4'>FREQUENTLY ASKED QUESTIONS</h5>
      <div className='flex flex-1 justify-center'>
        <div className='flex flex-col gap-4 my-12 w-[50%] max-w-[50%]'>
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
