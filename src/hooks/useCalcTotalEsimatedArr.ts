import { isBefore } from "date-fns";

const useCalcTotalEstimatedArr = (estimates: any[], xLabels: string[]) => {
  let totalEstimatedArr: string[] = [];
  for (let i = 0; i < xLabels.length; i++) {
    let revenue = 0;
    const dateOfTotalRevenue = new Date(xLabels[i]);
    for (let j = 0; j < estimates.length; j++) {
      const lastUpdated = new Date(estimates[j].updatedAt);
      if (isBefore(lastUpdated, dateOfTotalRevenue)) {
        revenue += estimates[j].total;
      }
    }
    totalEstimatedArr.push(revenue.toString());
  }
  return totalEstimatedArr.map((total) => parseFloat(total));
};

export default useCalcTotalEstimatedArr;
