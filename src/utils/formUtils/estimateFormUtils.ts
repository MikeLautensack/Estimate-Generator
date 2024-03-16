import { Customers } from "@/types/customers";
import { EstimateFormValues, Estimates } from "@/types/estimates";
import { redirect } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

const preview: (estimate: Estimates) => SubmitHandler<EstimateFormValues> = (estimate: Estimates) => async (data: EstimateFormValues) => {
  
  // Check if form is in create mode or edit mode
  if(estimate) {
    // create query string
    // const queryString = new URLSearchParams(data).toString()
    // console.log('q string', queryString)
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`);
  } else {
    // redirect to /contractor-dashboard/estimates/xxxxxxx
    redirect(`${process.env["NEXT_PUBLIC_ESTIMATE_URL"]}/`);
  }
}

const save: SubmitHandler<EstimateFormValues> = async (data) => {
  console.log("save");
}

const saveAndSend: SubmitHandler<EstimateFormValues> = async (data) => {
  console.log("save and send");
}

const onSubmit: ({ estimate, customers }: { estimate: any, customers: any}) => SubmitHandler<EstimateFormValues> = ({ estimate, customers }) => async (data: EstimateFormValues) => {
  const customer_user_id = getCustomerUserID(customers, data.customer_id as number);
  if(estimate) {
    await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_EDIT_URL"]}/${estimate.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        status: "Work In Progress (edited)"
      })
    });
  } else {
    await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_CREATE_URL"]}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        customer_user_id,
        status: "Work In Progress"
      })
    });
  }
}

const getCustomerUserID = (customers: Customers[], id: number) => {
  for(let i = 0; i < customers.length; i++) {
    if(customers[i].id == id) {
      return customers[i].customer_user_id;
    }
  }
}

const calculateTotal = (getValues: any, fields: any): number => {
  let num = 0;
  for(let i = 0; i < fields.length; i++) {
      num += getValues(`lineItems.${i}.amount`);
  }
  return num;
}

const applyTotal = (setSubtotal: any, setValue: any, getValues: any, fields: any) => {
  const calculatedTotal = calculateTotal(getValues, fields);
  setSubtotal(calculatedTotal);
  setValue("subtotal", calculatedTotal);
}

const calculateAmount = (quantity: number, price: number, setAmount: any): number => {
  const result = quantity * price;
  setAmount(result);
  return result;
}

export {
    preview,
    save,
    saveAndSend,
    onSubmit,
    getCustomerUserID,
    calculateTotal,
    applyTotal,
    calculateAmount
}