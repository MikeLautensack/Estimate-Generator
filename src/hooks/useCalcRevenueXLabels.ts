import { format, subDays, subMonths } from "date-fns";

const createDateArr = (xunit: string, now: Date) => {
  // Create Array
  let dateArr: Date[] = [now];

  // Create var to store how many x-units to create
  let xUnits = 7;

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
    case "anually":
      xUnits = 5;
      break;
  }

  let daysIncrement = 1;

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
    case "anually":
      daysIncrement = 365;
      break;
  }

  // Add dates to array
  if (xunit !== "monthly") {
    let lastDateAdded = now;
    for (let i = 0; i < xUnits; i++) {
      dateArr.unshift(subDays(lastDateAdded, daysIncrement));
      lastDateAdded = subDays(lastDateAdded, daysIncrement);
    }
  }

  if (xunit === "monthly") {
    let lastDateAdded = now;
    for (let i = 0; i < xUnits; i++) {
      dateArr.unshift(subMonths(lastDateAdded, 1));
      lastDateAdded = subMonths(lastDateAdded, 1);
    }
  }

  // Format array
  const formatedDateArr = formatDateArr(dateArr, xunit);

  // Return array
  return formatedDateArr;
};

const formatDateArr = (dateArr: Date[], xunit: string) => {
  let formatedDateArr = [];
  for (let i = 0; i < dateArr.length; i++) {
    switch (xunit) {
      case "daily":
        formatedDateArr.push(format(dateArr[i], "E"));
        break;
      case "weekly":
        formatedDateArr.push(format(dateArr[i], "MM/dd/yyyy"));
        break;
      case "bi-weekly":
        formatedDateArr.push(format(dateArr[i], "MM/dd/yyyy"));
        break;
      case "monthly":
        formatedDateArr.push(format(dateArr[i], "MMM"));
        break;
      case "anually":
        formatedDateArr.push(format(dateArr[i], "yyyy"));
        break;
    }
  }
  return formatedDateArr;
};

const useCalcRevenueXLabels = (xunit: string, today: Date) => {
  let xlabels: string[] = [];
  switch (xunit) {
    case "daily":
      xlabels = createDateArr(xunit, today);
      break;
    case "weekly":
      xlabels = createDateArr(xunit, today);
      break;
    case "bi-weekly":
      xlabels = createDateArr(xunit, today);
      break;
    case "monthly":
      xlabels = createDateArr(xunit, today);
      break;
    case "anually":
      xlabels = createDateArr(xunit, today);
      break;
  }
  return xlabels;
};

export default useCalcRevenueXLabels;
