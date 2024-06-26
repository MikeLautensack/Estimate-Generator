import React from "react";
import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { eq } from "drizzle-orm";
import { Estimates } from "@/types/estimates";
import EstimatePriceChart from "../../charts/EstimatePriceChart";
import { auth } from "../../../../auth";
import { Card } from "@mui/material";

async function getDataTestOne(id: number) {
  try {
    const data = await db
      .select()
      .from(estimates)
      .where(eq(estimates.contractor_user_id, id.toString()));
    return data;
  } catch (error) {
    console.log(error);
  }
}

const EstimatePriceChartContainer = async () => {
  const session = await auth();
  const data = (await getDataTestOne(session?.user.id)) as Estimates[];

  const createChartArray = (inputArray: Estimates[]): any[] => {
    try {
      const outputArray: any[] = [];
      const statusArray: string[] = [];
      for (let i = 0; i < inputArray.length; i++) {
        const status = inputArray[i].status;
        if (!statusArray.includes(status)) {
          statusArray.push(status);
        }
      }
      for (let i = 0; i < statusArray.length; i++) {
        const status = statusArray[i];
        const obj = calcEstimatePriceStats(inputArray, status);
        outputArray.push({
          name: status,
          meanPrice: obj.meanTotal,
          minPrice: obj.minTotal,
          maxPrice: obj.maxTotal,
        });
      }
      return outputArray;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const calcEstimatePriceStats = (inputArray: Estimates[], status: string) => {
    let currentTotal = 0;
    let minTotal = Infinity;
    let maxTotal = -Infinity;
    let count = 0;
    for (let i = 0; i < inputArray.length; i++) {
      const total = inputArray[i].total;
      if (inputArray[i].status === status) {
        currentTotal += total;
        count++;
        if (minTotal > total) {
          minTotal = total;
        }
        if (maxTotal < total) {
          maxTotal = total;
        }
      }
    }
    const meanTotal = count > 0 ? currentTotal / count : 0;
    return {
      meanTotal,
      minTotal,
      maxTotal,
    };
  };

  const chartArray = createChartArray(data);

  return (
    <Card className="rounded-lg p-2 max-desktop:aspect-square relative">
      <EstimatePriceChart chartArray={chartArray} />
    </Card>
  );
};

export default EstimatePriceChartContainer;
