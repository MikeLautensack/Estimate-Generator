"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext, useWatch } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { Customers } from "@/types/customers";
import { useCallback, useEffect, useState } from "react";

const getCustomerOptions = (customers: Customers[]) => {
  return customers.map((customer: Customers) => {
    return { label: customer.name, id: customer.customer_user_id };
  });
};

const EstimateFormPartOne = ({
  customers,
  saveStatus,
  saveAndSaveStatus,
}: EstimateFormPartOneProps) => {
  // Hooks
  const { control, setValue } = useFormContext();

  // State
  const [readonly, setReadonly] = useState<boolean>(false);
  const [customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    projectAddress: "",
    customer_id: "",
  });

  // Values
  const customerOptions = getCustomerOptions(customers);

  // Watched input
  const customerUserId = useWatch({ control, name: "customer_user_id" });

  // Callbacks
  const getCustomer = useCallback((customers: Customers[], name: string) => {
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].customer_user_id === name) {
        return customers[i];
      }
    }
  }, []);

  // Effects
  useEffect(() => {
    if (customerUserId !== 0) {
      setReadonly(true);
      const customer = getCustomer(customers, customerUserId);
      if (customer) {
        setCustomer({
          customerName: customer.name,
          customerEmail: customer.email,
          projectAddress: customer.address,
          customer_id: customer.id.toString(),
        });
      }
    }
  }, [customerUserId, customers, getCustomer]);

  useEffect(() => {
    setValue("customerName", customer.customerName);
    setValue("customerEmail", customer.customerEmail);
    setValue("projectAddress", customer.projectAddress);
    setValue("customer_id", customer.customer_id);
  }, [customer, setValue]);

  return (
    <div className="">
      <div className="">
        <MVLAutocomplete
          name="customer_user_id"
          label="Customers"
          options={customerOptions}
          idAsValue
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
      <div className="flex flex-col gap-2 my-2 text-black">
        <TextInput
          name="customerName"
          label="Customer Name"
          readonly={readonly}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
        <TextInput
          name="customerEmail"
          label="Customer Email"
          readonly={readonly}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
        <TextInput
          name="projectAddress"
          label="Project Address"
          readonly={readonly}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
