import { formatDate } from "@/utils/formatingFunctions";
import { DateObject, Unit } from "./RevenueChart";
import { subDays, subMonths, isBefore, isEqual } from "date-fns";
import { roundUpToNiceNumber } from "@/utils/roundingUtils";

export const calculateXLabels = (xunit: Unit): DateObject[] => {
  const now = new Date();
  const dateArr: DateObject[] = [];

  switch (xunit) {
    case "daily":
      for (let i = 0; i < 7; i++) {
        const date = subDays(now, i);
        dateArr.unshift({ label: formatDate(date, xunit)!, date });
      }
      break;
    case "weekly":
      for (let i = 0; i < 4; i++) {
        const date = subDays(now, i * 7);
        dateArr.unshift({ label: formatDate(date, xunit)!, date });
      }
      break;
    case "bi-weekly":
      for (let i = 0; i < 4; i++) {
        const date = subDays(now, i * 14);
        dateArr.unshift({ label: formatDate(date, xunit)!, date });
      }
      break;
    case "monthly":
      for (let i = 0; i < 12; i++) {
        const date = subMonths(now, i);
        dateArr.unshift({ label: formatDate(date, xunit)!, date });
      }
      break;
    case "annually":
      for (let i = 0; i < 5; i++) {
        const date = subMonths(now, i * 12);
        dateArr.unshift({ label: formatDate(date, xunit)!, date });
      }
      break;
    default:
      break;
  }

  return dateArr;
};

export const calculateYLabels = (estimates: any[]) => {
  let high = 0;
  for (let i = 0; i < estimates.length; i++) {
    if (estimates[i].total > high) {
      high = estimates[i].total;
    }
  }
  const increment = high / 5;
  const roundedIncrement = roundUpToNiceNumber(increment);

  let amountArr = [0];
  let total = 0;
  for (let i = 0; i < 4; i++) {
    amountArr.unshift(total + roundedIncrement);
    total += roundedIncrement;
  }
  return amountArr;
};

export const calculateGrossRevenue = (
  estimates: any[],
  xLabels: DateObject[],
) => {
  return xLabels.map((label) => {
    const dateOfTotalRevenue = new Date(label.date);
    return estimates.reduce((total, estimate) => {
      const lastUpdated = new Date(estimate.updatedAt);
      const isBilled: boolean = estimate.status === "billed";
      if (
        (isBefore(lastUpdated, dateOfTotalRevenue) ||
          isEqual(lastUpdated, dateOfTotalRevenue)) &&
        isBilled
      ) {
        return total + parseFloat(estimate.total);
      }
      return total;
    }, 0);
  });
};

export const calculateTotalEstimated = (
  estimates: any[],
  xLabels: DateObject[],
) => {
  return xLabels.map((label) => {
    const labelDate = new Date(label.date);
    return estimates.reduce((total, estimate) => {
      const dateUpdated = new Date(estimate.updatedAt);
      if (isBefore(dateUpdated, labelDate) || isEqual(dateUpdated, labelDate)) {
        return total + parseFloat(estimate.total);
      }
      return total;
    }, 0);
  });
};
