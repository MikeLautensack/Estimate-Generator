"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { Customers } from "@/types/customers";

const getCustomerStrings = (customers: Customers[]) => {
  return customers.map((customer: Customers) => customer.name);
};

const EstimateFormPartOne = ({ customers }: EstimateFormPartOneProps) => {
  const { register, getValues, control } = useFormContext();
  const customerStrings = getCustomerStrings(customers);
  return (
    <div className="">
      <div className="">
        {/* <FormField
          control={control}
          name={"customer_id"}
          render={({ field }) => (
            <EstimateFormOneSelect customers={customers} field={field} />
          )}
        /> */}
        <MVLAutocomplete
          name="customer_id"
          label="Customers"
          options={customerStrings}
        />
      </div>
      <div
        className={`${getValues("customer_id") ? "hidden" : "flex"} flex-col gap-2 my-2 text-black`}
      >
        <TextInput name="customerName" label="Customer Name" />
        <TextInput name="customerEmail" label="Customer Email" />
        <TextInput name="projectAddress" label="Project Address" />
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
