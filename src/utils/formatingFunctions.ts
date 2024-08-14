import { format } from "date-fns";

export const formatTaxString = (num: number): string => {
  const number = num * 100;
  const roundedNumber = number.toFixed(2);
  const taxString = `${roundedNumber}%`;
  return taxString;
};

export const formatPriceString = (numStr: string): string => {
  const num = parseFloat(numStr);
  const roundedNumber = num.toFixed(2);
  const priceString = `$${roundedNumber}`;
  return priceString;
};

export const formatPhoneNumber = (num: string): string | null => {
  const cleaned = ("" + num).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
};

export const formatName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatCapitalize = (input: string): string => {
  if (input) {
    return input
      .split(" ") // Split the input string by spaces to get an array of words
      .map((word) => {
        if (word.length > 0) {
          return word[0].toUpperCase() + word.slice(1); // Capitalize the first char and concatenate with the rest of the word
        } else {
          return word; // In case there are multiple spaces, return the empty string as it is
        }
      })
      .join(" "); // Join the array of words back into a single string
  } else {
    return "";
  }
};

export const formatCapitalizeAll = (input: string): string => {
  return input
    .toLowerCase() // Convert the entire string to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/-/g, " ") // Replace all hyphens with spaces
    .split(/\s+/) // Split the string into an array of words using any whitespace as the delimiter
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string with spaces in between
};

export const formatRate = (
  rateType: string,
  price: string,
  itemName: string,
) => {
  const formatedPrice = formatPriceString(price);
  if (rateType === "Unit Rate") {
    return `${formatedPrice} per ${itemName}`;
  } else if (rateType === "SQFT") {
    return `${formatedPrice} per SQFT`;
  } else if (rateType === "LNFT") {
    return `${formatedPrice} per LNFT`;
  } else if (rateType === "Hourly") {
    return `${formatedPrice} per hour`;
  } else if (rateType === "Daily") {
    return `${formatedPrice} per day`;
  } else if (rateType === "Flat Rate") {
    return `${formatedPrice}`;
  }
};

export const formatDate = (date: Date, xunit: string) => {
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

export const formatAsPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
