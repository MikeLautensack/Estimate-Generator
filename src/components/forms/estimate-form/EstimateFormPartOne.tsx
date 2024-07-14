"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext, useWatch } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { Customers } from "@/types/customers";
import { useCallback, useEffect, useState } from "react";

const getCustomerStrings = (customers: Customers[]) => {
  return customers.map((customer: Customers) => customer.name);
};

const EstimateFormPartOne = ({ customers }: EstimateFormPartOneProps) => {
  // Hooks
  const { control, setValue } = useFormContext();

  // State
  const [readonly, setReadonly] = useState<boolean>(false);
  const [customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    projectAddress: "",
  });

  // Values
  const customerStrings = getCustomerStrings(customers);

  // Watched input
  const customerInputVal = useWatch({ control, name: "customer_id" });
  console.log("cust input val test", customerInputVal);

  // Callbacks
  const getCustomer = useCallback((customers: Customers[], name: string) => {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].name === name) {
        return customers[i];
      }
    }
  }, []);

  // Effects
  useEffect(() => {
    if (customerInputVal !== 0) {
      setReadonly(true);
      const customer = getCustomer(customers, customerInputVal);
      if (customer) {
        setCustomer({
          customerName: customer.name,
          customerEmail: customer.email,
          projectAddress: customer.address,
        });
      }
    }
  }, [customerInputVal, customers, getCustomer]);

  useEffect(() => {
    setValue("customerName", customer.customerName);
    setValue("customerEmail", customer.customerEmail);
    setValue("projectAddress", customer.projectAddress);
  }, [customer, setValue]);

  return (
    <div className="">
      <div className="">
        <MVLAutocomplete
          name="customerName"
          label="Customers"
          options={customerStrings}
        />
      </div>
      <div className="flex flex-col gap-2 my-2 text-black">
        <TextInput
          name="customerName"
          label="Customer Name"
          readonly={readonly}
        />
        <TextInput
          name="customerEmail"
          label="Customer Email"
          readonly={readonly}
        />
        <TextInput
          name="projectAddress"
          label="Project Address"
          readonly={readonly}
        />
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
