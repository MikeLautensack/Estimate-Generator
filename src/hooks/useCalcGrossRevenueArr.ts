import { isBefore } from "date-fns";

const useCalcGrossRevenueArr = (estimates: any[], xLabels: string[]) => {
  let grossRevenueArr: string[] = [];
  for (let i = 0; i < xLabels.length; i++) {
    let revenue = 0;
    const dateOfTotalRevenue = new Date(xLabels[i]);
    for (let j = 0; j < estimates.length; j++) {
      const lastUpdated = new Date(estimates[j].updatedAt);
      const isBilled: boolean = estimates[j].status && "billed";
      if (isBefore(lastUpdated, dateOfTotalRevenue) && isBilled) {
        revenue += estimates[j].total;
      }
    }
    grossRevenueArr.push(revenue.toString());
  }
  return grossRevenueArr.map((rev) => parseFloat(rev));
  // .map((rev) => formatAsPrice(rev));
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
