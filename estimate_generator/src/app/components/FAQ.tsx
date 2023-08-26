'use client'

import React from 'react'
import { FAQProps } from '../../types/types'
import Button from './buttonComponents/Button'
import { FaChevronDown } from "react-icons/fa"

export default function FAQ({ _id, question, answer, opened, dispatch }: FAQProps) {

  const click = () => {
    dispatch({ type: 'action', payload: _id})
  }

  return (
    <div className='flex flex-col max-w-full'>
        <div className='flex justify-between items-center p-2 border border-secondary500 max-w-full'>
          <h6 className='text-[18px] font-bold text-secondary500'>{question}</h6>
          <Button
              className=''
              onClick={click}
          >
            <FaChevronDown className='text-secondary500'/>
          </Button>
        </div>
        {opened  && <div className='flex flex-col justify-start items-start gap-2 border-l border-r border-b border-secondary500 p-2 max-w-full'>
                      <h6 className='underline text-xl text-secondary500 font-medium'>Answer</h6>
                      <p className='text-base text-secondary500 font-normal'>{answer}</p>
                    </div>}
    </div>
  )
}
