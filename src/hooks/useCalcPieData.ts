import { formatCapitalizeAll } from "@/utils/formatingFunctions";
import { useEffect, useState } from "react";

type Data = {
  id: number;
  value: number;
  label: string;
};

const useCalcPieData = (estimates: any[]) => {
  // State
  const [data, setData] = useState<Data[]>([]);

  // Enum
  const labels = [
    "Accepted",
    "Rejected",
    "Change Order Requested",
    "Pending Approval",
    "Work Completed",
    "Work In Progress (edited)",
    "Work In Progress",
    "Billed",
  ];

  // Effects
  useEffect(() => {
    let statusOptions: string[] = [];
    let quantityArray: number[] = [];
    let dataArray: Data[] = [];

    for (let i = 0; i < estimates.length; i++) {
      if (!statusOptions.includes(estimates[i].status)) {
        statusOptions.push(estimates[i].status);
      }
    }

    for (let i = 0; i < statusOptions.length; i++) {
      let count = 0;
      for (let j = 0; j < estimates.length; j++) {
        if (statusOptions[i] === estimates[j].status) {
          count++;
        }
      }
      quantityArray.push(count);
    }

    for (let i = 0; i < statusOptions.length; i++) {
      dataArray.push({
        id: i,
        value: quantityArray[i],
        label: formatCapitalizeAll(statusOptions[i]),
      });
    }

    setData(dataArray);
  }, [estimates, estimates.length]);

  return data;
};

export default useCalcPieData;
