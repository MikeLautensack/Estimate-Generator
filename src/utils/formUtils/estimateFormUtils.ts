import { Customers } from "@/types/customers";
import { EstimateFormValues, Estimates, LineItems } from "@/types/estimates";
import { redirect } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

const preview = () => async () => {
  // // Check if form is in create mode or edit mode
  // if(estimate) {
  //   // create query string
  //   // const queryString = new URLSearchParams(data).toString()
  //   // console.log('q string', queryString)
  //   // redirect to /contractor-dashboard/estimates/xxxxxxx
  //   redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`);
  // } else {
  //   // redirect to /contractor-dashboard/estimates/xxxxxxx
  //   redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`);
  // }
};

const save = async () => {
  console.log("save");
};

const saveAndSend = async () => {
  console.log("save and send");
};

const onSubmit =
  ({ estimate, customers }: { estimate: Estimates; customers: Customers[] }) =>
  async (data: EstimateFormValues) => {
    const customer_user_id = getCustomerUserID(
      customers,
      data.customer_id as number,
    );
    if (estimate) {
      await fetch(
        `${process.env["NEXT_PUBLIC_ESTIMATES_EDIT_URL"] as string}/${estimate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            status: "Work In Progress (edited)",
          }),
        },
      );
    } else {
      await fetch(
        `${process.env["NEXT_PUBLIC_ESTIMATES_CREATE_URL"] as string}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            customer_user_id,
            status: "Work In Progress",
          }),
        },
      );
    }
  };

const getCustomerUserID = (customers: Customers[], id: number) => {
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].id == id) {
      return customers[i].customer_user_id;
    }
  }
};

const calculateTotal = (
  getValues: (payload?: string | string[]) => string,
  fields: LineItems[],
): number => {
  let num = 0;
  for (let i = 0; i < fields.length; i++) {
    num += parseInt(getValues(`lineItems.${i}.amount`));
  }
  return num;
};

const applyTotal = (
  setSubtotal: React.Dispatch<React.SetStateAction<number>>,
  setValue: (name: string, value: unknown, config?: object) => void,
  getValues: (payload?: string | string[]) => string,
  fields: LineItems[],
) => {
  const calculatedTotal = calculateTotal(getValues, fields);
  setSubtotal(calculatedTotal);
  setValue("subtotal", calculatedTotal);
};

const calculateAmount = (
  quantity: number,
  price: number,
  setAmount: React.Dispatch<React.SetStateAction<number>>,
): number => {
  const result = quantity * price;
  setAmount(result);
  return result;
};

export {
  preview,
  save,
  saveAndSend,
  onSubmit,
  getCustomerUserID,
  calculateTotal,
  applyTotal,
  calculateAmount,
};
