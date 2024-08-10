import { isBefore, isEqual } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { DateObject } from "./useCalcRevenueXLabels";

const useCalcTotalEstimatedArr = (
  estimates: any[],
  xLabels: DateObject[],
  xunit: string,
) => {
  // State
  const [totalEstimatedArr, setTotalEstimatedArr] = useState<number[]>([]);

  // Effects
  useEffect(() => {
    console.log("useCalcTotalEstimatedArr firing...");
    const arr = createDataArray(estimates, xLabels);
    setTotalEstimatedArr(arr);
  }, [estimates, xLabels, xunit]);

  return totalEstimatedArr;
};

export default useCalcTotalEstimatedArr;

const createDataArray = (estimates: any[], xLabels: DateObject[]) => {
  let data = [];

  for (let i = 0; i < xLabels.length; i++) {
    let revenue = 0;
    const labelDate = new Date(xLabels[i].date);
    for (let j = 0; j < estimates.length; j++) {
      const dateUpdated = new Date(estimates[j].updatedAt);
      if (isBefore(dateUpdated, labelDate) || isEqual(dateUpdated, labelDate)) {
        revenue += parseFloat(estimates[j].total);
      }
    }
    data.push(revenue);
  }

  return data;
};
