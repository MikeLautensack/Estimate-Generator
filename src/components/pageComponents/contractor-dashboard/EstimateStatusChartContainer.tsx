import { estimates } from "@/db/schemas/estimates";
import EstimateStatusChart from "../../charts/EstimateStatusChart";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Estimates } from "@/types/estimates";

async function getData(id: number) {
    try {
        const data = await db.select()
                             .from(estimates)
                             .where(eq(estimates.contractor_user_id, id));
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default async function EstimateStatusChartContainer() {

    const session = await getServerSession(authOptions);
    const data = await getData(session.user.id);  

    const createChartArray = (inputArray: Estimates[]): any[] => {
        try {            
            let outputArray: any[] = [];
            let statusArray: string[] = [];
            for (let i = 0; i < inputArray.length; i++) {
                let status = inputArray[i].status;
                if (!statusArray.includes(status as string)) {
                    statusArray.push(status as string);
                }
            }
            for (let i = 0; i < statusArray.length; i++) {
                let status = statusArray[i];
                let statusCount = countStatusFrequency(inputArray, status);
                outputArray.push({
                    name: status,
                    value: statusCount
                });
            }
            return outputArray;
        } catch (error) {
            return [];
        }
    }

    const countStatusFrequency = (array1: Estimates[], status: string): number => {
        let count = 0;
        for (let i = 0; i < array1.length; i++) {
            if (array1[i].status === status) {
                count += 1;
            }
        }
        return count;
    }
    
    const chartArray = createChartArray(data as Estimates[]);

    return (
        <div className="bg-neutral100 rounded-lg p-2 max-desktop:aspect-square relative">
            {/* <h1>Estimate Staus Chart</h1> */}
            <EstimateStatusChart chartArray={chartArray}/>
        </div>
    );
}