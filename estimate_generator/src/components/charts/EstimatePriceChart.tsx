'use client'

import { estimatesChartArrayProps } from '@/types/types'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const EstimatePriceChart = ({chartArray}: estimatesChartArrayProps) => {
  console.log('Chart Array: ', chartArray)
  return (
    <div className='border-4 border-teal-950 w-full h-full'>
        <ResponsiveContainer width="100%" height="100%" className='border-4 border-pink-600'>
            <BarChart
              className='border-4 border-purple-400' 
              data={chartArray}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="meanPrice" fill="#8884d8" />
              <Bar dataKey="minPrice" fill="#82ca9d" />
              <Bar dataKey="maxPrice" fill="#30D5C8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default EstimatePriceChart