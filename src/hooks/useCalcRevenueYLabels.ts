import { useEffect, useState } from "react";

const useCalcRevenueYLabels = (estimates: any[]) => {
  // State
  const [priceArray, setPriceArray] = useState<number[]>([]);

  //Effects
  useEffect(() => {
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
    setPriceArray(amountArr);
  }, [estimates]);

  return priceArray;
};

export default useCalcRevenueYLabels;

// Function to round up to a nice number
const roundUpToNiceNumber = (num: number) => {
  const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
  const normalized = num / magnitude;
  let rounded;

  if (normalized <= 1.5) {
    rounded = 2;
  } else if (normalized <= 3) {
    rounded = 5;
  } else {
    rounded = 10;
  }

  return rounded * magnitude;
};

const formatAsPrice = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
