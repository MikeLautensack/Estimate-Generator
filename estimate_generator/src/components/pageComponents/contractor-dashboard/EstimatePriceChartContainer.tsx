import React from 'react'
import { db } from '@/db'
import { estimates } from '@/db/schemas/estimates'
import { eq } from "drizzle-orm"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { Estimates } from '@/types/estimates'
import EstimatePriceChart from '../../charts/EstimatePriceChart'
import { NextResponse } from 'next/server'

async function getDataTestOne(id: number) {
    try {
        const data = await db.select()
                             .from(estimates)
                             .where(eq(estimates.contractor_user_id, id))
        return data
    } catch (error) {
        console.log(error)
    }
}

export default async function EstimatePriceChartContainer() {

  const session = await getServerSession(authOptions)
  const data = await getDataTestOne(session.user.id)

  const createChartArray = (inputArray: Estimates[]): any[] => {
    try {
        let outputArray: any[] = []
        let statusArray: string[] = []
        for (let i = 0; i < inputArray.length; i++) {
            let status = inputArray[i].status
            if (!statusArray.includes(status as string)) {
                statusArray.push(status as string)
            }
        }
        for (let i = 0; i < statusArray.length; i++) {
            let status = statusArray[i]
            const obj = calcEstimatePriceStats(inputArray, status)
            outputArray.push({
                name: status,
                meanPrice: obj.meanTotal,
                minPrice: obj.minTotal,
                maxPrice: obj.maxTotal
            })
        }
        return outputArray
    } catch (error) {
        console.log(error)
        return []
    }
  }

  const calcEstimatePriceStats = (inputArray: Estimates[], status: string) => {
    let currentTotal = 0
    let minTotal = Infinity
    let maxTotal = -Infinity
    let count = 0
    for (let i = 0; i < inputArray.length; i++) {
        const total = inputArray[i].total as number
        if (inputArray[i].status === status) {
            currentTotal += total
            count++
            if (minTotal > total) {
                minTotal = total
            }
            if (maxTotal < total) {
                maxTotal = total
            }
        } 
    }
    const meanTotal = count > 0 ? currentTotal / count : 0
    return {
        meanTotal,
        minTotal,
        maxTotal
    }
  }

  const chartArray = createChartArray(data as Estimates[])

  return (
    <div className='w-full h-full'>
        <EstimatePriceChart chartArray={chartArray}/>
    </div>
  )
}