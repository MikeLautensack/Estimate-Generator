import { isBefore, isEqual } from "date-fns";
import { DateObject } from "./useCalcRevenueXLabels";
import { useEffect, useState } from "react";

const useCalcGrossRevenueArr = (
  estimates: any[],
  xLabels: DateObject[],
  xunit: string,
) => {
  // State
  const [revenueArr, setRevenueArr] = useState<number[]>();

  // Effects
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < xLabels.length; i++) {
      let revenue = 0;
      const dateOfTotalRevenue = new Date(xLabels[i].date);
      for (let j = 0; j < estimates.length; j++) {
        const lastUpdated = new Date(estimates[j].updatedAt);
        const isBilled: boolean = estimates[j].status && "billed";
        if (
          (isBefore(lastUpdated, dateOfTotalRevenue) && isBilled) ||
          (isEqual(lastUpdated, dateOfTotalRevenue) && isBilled)
        ) {
          revenue += estimates[j].total;
        }
      }
      arr.push(revenue);
    }
    setRevenueArr(arr);
  }, [estimates, xLabels, xunit]);

  return revenueArr;
};

export default useCalcGrossRevenueArr;

const formatAsPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
