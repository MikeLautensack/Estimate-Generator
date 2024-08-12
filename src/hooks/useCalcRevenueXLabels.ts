import { format, subDays, subMonths } from "date-fns";
import { useEffect, useState } from "react";

export type DateObject = {
  label: string;
  date: Date;
};

const useCalcRevenueXLabels = (xunit: string) => {
  const [xLabels, setXLabels] = useState<DateObject[]>([]);

  useEffect(() => {
    const today = new Date();
    switch (xunit) {
      case "daily":
        setXLabels(createDateArr(xunit, today));
        break;
      case "weekly":
        setXLabels(createDateArr(xunit, today));
        break;
      case "bi-weekly":
        setXLabels(createDateArr(xunit, today));
        break;
      case "monthly":
        setXLabels(createDateArr(xunit, today));
        break;
      case "annually":
        setXLabels(createDateArr(xunit, today));
        break;
    }
  }, [xunit]);

  return xLabels;
};

export default useCalcRevenueXLabels;

const createDateArr = (xunit: string, now: Date) => {
  // Create Array
  let dateArr: DateObject[] = [];

  // Create let to store how many x-units to create
  let xUnits = 0;

  switch (xunit) {
    case "daily":
      xUnits = 6;
      break;
    case "weekly":
      xUnits = 4;
      break;
    case "bi-weekly":
      xUnits = 4;
      break;
    case "monthly":
      xUnits = 12;
      break;
    case "annually":
      xUnits = 5;
      break;
  }

  let daysIncrement = 0;

  switch (xunit) {
    case "daily":
      daysIncrement = 1;
      break;
    case "weekly":
      daysIncrement = 7;
      break;
    case "bi-weekly":
      daysIncrement = 14;
      break;
    case "annually":
      daysIncrement = 365;
      break;
  }

  // Add dates to array
  if (xunit !== "monthly") {
    let lastDateAdded = now;
    for (let i = 0; i < xUnits; i++) {
      const date = subDays(lastDateAdded, daysIncrement);
      const dateLabel = formatDate(date, xunit);
      dateArr.unshift({ label: dateLabel!, date: date });
      lastDateAdded = date;
    }
  }

  if (xunit === "monthly") {
    let lastDateAdded = now;
    for (let i = 0; i < xUnits; i++) {
      const date = subMonths(lastDateAdded, 1);
      const dateLabel = formatDate(date, xunit);
      dateArr.unshift({ label: dateLabel!, date: date });
      lastDateAdded = date;
    }
  }

  // Return array
  return dateArr;
};

const formatDate = (date: Date, xunit: string) => {
  switch (xunit) {
    case "daily":
      const formatedDaily = format(date, "E");
      return formatedDaily;
    case "weekly":
      const formatedWeekly = format(date, "MM/dd/yyyy");
      return formatedWeekly;
    case "bi-weekly":
      const formatedBiWeekly = format(date, "MM/dd/yyyy");
      return formatedBiWeekly;
    case "monthly":
      const formatedMonthly = format(date, "MMM");
      return formatedMonthly;
    case "annually":
      const formatedAnnually = format(date, "yyyy");
      return formatedAnnually;
  }
};
