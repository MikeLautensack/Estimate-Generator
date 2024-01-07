import EstimateStatusChart from '../../charts/EstimateStatusChart'
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/utils/authOptions"
import { customers } from "@/db/schemas/customers"
import { Customers } from '@/types/customers'
import HighProfitCustomersChart from '@/components/charts/HighProfitCustomersChart'
import { estimates } from '@/db/schemas/estimates'

async function getCustomers(id: number) {
    try {
        const data = await db.select()
                             .from(customers)
                             .where(eq(customers.contractor_user_id, id))
        return data
    } catch (error) {
        console.log(error)
    }
}

async function getEstimates(id: number) {
    try {
        const data = await db.select()
                             .from(estimates)
                             .where(eq(estimates.customer_user_id, id))
        return data
    } catch (error) {
        console.log(error)
    }
}

export default async function EstimateStatusChartContainer() {

    const session = await getServerSession(authOptions)
    const data = await getCustomers(session.user.id)  

    const createChartArray = async (inputArray: Customers[]) => {
        try {            
            let topFive: { name: string, meanTotal: number }[] = []
            for (let i = 0; i < inputArray.length; i++) {
                const meanTotal = await calcAvgCustomerSpend(inputArray[i])
                if (topFive.length < 5) {
                    topFive.push({
                        name: inputArray[i].name as string,
                        meanTotal: meanTotal
                    })
                    sortTopFive(topFive)
                } else {
                    if (meanTotal > topFive[0].meanTotal) {
                        topFive.push({
                            name: inputArray[i].name as string,
                            meanTotal: meanTotal
                        })
                    }
                    sortTopFive(topFive)
                    topFive.shift()
                }
            }
            return topFive
        } catch (error) {
            console.log(error)
            return []
        }
    }

    const calcAvgCustomerSpend = async (customer: Customers): Promise<number> => {
        let total: number = 0
        const estimates = await getEstimates(parseInt(customer.customer_user_id as string))
        if (estimates && estimates.length > 0) {            
            for (let i = 0; i < estimates!.length; i++) {
                total += estimates![i].total as number
            }
            const meanTotal = total / (estimates!.length)
            return meanTotal
        } else {
            return 0
        }
    }

    const sortTopFive = (array: { name: string, meanTotal: number }[]): void => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
                if (array[j].meanTotal > array[j + 1].meanTotal) {
                    const tmp = array[j]
                    array[j] = array[j + 1]
                    array[j + 1] = tmp
                }
            }
        }
    }
    
    const chartArray = await createChartArray(data as Customers[])

    return (
        <div className="bg-neutral100 rounded-lg p-2 max-desktop:aspect-square relative">
            {/* <h1>Estimate Staus Chart</h1> */}
            <HighProfitCustomersChart chartArray={chartArray}/>
        </div>
    )
}