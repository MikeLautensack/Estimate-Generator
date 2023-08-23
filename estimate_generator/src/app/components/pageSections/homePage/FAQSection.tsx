'use client'

import React from 'react'
import { useReducer, useState } from 'react'
import FAQ from '../../FAQ'
import { State, Action, FAQItem } from '../../../../types/types'

const reducer = (state: State, action: Action): FAQItem[] => {
    switch (action) {
      case 'INCREMENT':
        return []
      case 'DECREMENT':
        return []
      case 'RESET':
        return []
      default:
        return []
    }
  };

export default function FAQSection() {

  const [ subRateType, setSubRateType ] = useState(false)
  const [FAQs, dispatch] = useReducer( reducer, [
    {
      question: 'Who should use the app?',
      answer: 'dkfhsdfhfhl;',
      opened: false
    },
    {
      question: 'What is included with my subscription?',
      answer: 'Will my customers need to make an Estimate Generator account as well?  What if Estimate Generator does not work for my business?',
      opened: false
    },
    {
      question: 'How do I suggest a new feature or report a bug?',
      answer: 'fgafgagafgafgafgafgafgfag',
      opened: false
    },
    {
      question: 'Will my customers need to make an Estimate Generator account as well?',
      answer: 'bgzfhfhahagfhahathathtgRT4',
      opened: false
    },
    {
      question: 'What if Estimate Generator does not work for my business?',
      answer: 'juokuieuikjswtjsgjsdhkuyisyhsfytja',
      opened: false
    }
  ])

  return (
    <section id='faq' className='px-4 bg-primary500 w-full'>
      <h5 className='text-xl text-accent500 font-bold text-center my-4'>FREQUENTLY ASKED QUESTIONS</h5>
      <div className='max-w-[75% flex justify-center'>
        <div className='flex flex-col gap-4 mb-16 mt-4 max-w-full'>
          {FAQs.map((faq: FAQItem) => (
            <FAQ
              question={faq.question}
              answer={faq.answer}
              opened={faq.opened}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
