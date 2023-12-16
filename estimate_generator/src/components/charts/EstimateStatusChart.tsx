'use client'

import { estimatesChartArrayProps, chartArray } from "@/types/types"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const EstimateStatusChart = ({chartArray}: estimatesChartArrayProps) => {

  const generateColor = (name: string): string => {
    if(name === 'accepted') {
        return '#0275d8'
    } else if (name === 'rejected') {
        return '#FF0000'
    } else if (name === 'change order requested') {
        return '#f0ad4e'
    } else if (name === 'pending approval') {
        return '9d9d9d'
    } else if (name === 'work completed') {
        return '#039487'
    } else if (name === 'work in progress (edited)') {
        return '#30D5C8'
    } else if (name === 'work in progress') {
        return '#add8e6'
    }
    return ''
  }



  return (
    <div className="w-full h-full">
        {/* <h1 className="h-[1.5rem]">Estimates Status Graph</h1> */}
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={200} height={200}>
                <Legend verticalAlign="top" height={36}/>
                <Pie 
                    data={chartArray} 
                    dataKey='value' 
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    label
                >
                    {chartArray.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={generateColor(chartArray[index].name.toLowerCase())} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default EstimateStatusChart