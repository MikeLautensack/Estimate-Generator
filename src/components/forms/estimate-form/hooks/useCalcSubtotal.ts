import { useEffect, useState } from "react";
import { LineItemsValues } from "../EstimateForm";

const useCalcSubtotal = (
  fields: LineItemsValues[],
  amount: string,
  index: number,
) => {
  // State
  const [subtotal, setSubtotal] = useState<string>("");
  // console.log("is nan test ........");

  // Effects
  useEffect(() => {
    let newSubtotal = 0;
    for (let i = 0; i < fields.length; i++) {
      if (index !== i) {
        const fieldAmountFloat = parseFloat(fields[i].amount);
        // console.log(
        //   "is `fieldAmountFloat` nan?",
        //   isNaN(fieldAmountFloat),
        //   typeof fieldAmountFloat,
        // );
        newSubtotal += fieldAmountFloat;
        // console.log(
        //   "is `newSubtotal` nan?",
        //   isNaN(newSubtotal),
        //   typeof newSubtotal,
        // );
      }
    }
    const amountFloat = parseFloat(amount);
    // console.log("is `amountFloat` nan?", isNaN(amountFloat), typeof amountFloat);
    newSubtotal += amountFloat;
    // console.log(
    //   "is `newSubtotal`x2... nan?",
    //   isNaN(newSubtotal),
    //   typeof newSubtotal,
    // );
    setSubtotal(newSubtotal.toString());
  }, [fields, amount, index]);

  return subtotal;
};

export default useCalcSubtotal;
