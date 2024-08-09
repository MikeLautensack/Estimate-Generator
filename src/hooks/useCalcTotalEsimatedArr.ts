import { isBefore, isEqual } from "date-fns";
import { useEffect, useState } from "react";

const useCalcTotalEstimatedArr = (estimates: any[], xLabels: string[]) => {
  const [totalEstimatedArr, setTotalEstimatedArr] = useState<number[]>([]);

  useEffect(() => {
    console.log("useCalcTotalEstimatedArr firing...");
  }, [estimates, xLabels]);

  return totalEstimatedArr;
};

export default useCalcTotalEstimatedArr;
