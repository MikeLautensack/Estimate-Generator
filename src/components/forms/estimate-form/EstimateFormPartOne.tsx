"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext, useWatch } from "react-hook-form";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { Customers } from "@/types/customers";
import { useCallback, useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";
import MVLAddressInput from "../inputs/MVLAddressInput";

const getCustomerOptions = (customers: Customers[]) => {
  return customers.map((customer: Customers) => {
    return {
      label: `${customer.firstName} ${customer.lastName}`,
      id: customer.customer_user_id,
    };
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
    customerFirstName: "",
    customerLastName: "",
    customerEmail: "",
    projectAddress: "",
    projectAddress2: "",
    projectCity: "",
    projectState: "",
    projectZip: "",
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
          customerFirstName: customer.firstName,
          customerLastName: customer.lastName,
          customerEmail: customer.email,
          projectAddress: customer.address,
          projectAddress2: customer.address2,
          projectCity: customer.city,
          projectState: customer.state,
          projectZip: customer.zip,
          customer_id: customer.id.toString(),
        });
      }
    }
  }, [customerUserId, customers, getCustomer]);

  useEffect(() => {
    setValue("customerFirstName", customer.customerFirstName);
    setValue("customerLastName", customer.customerLastName);
    setValue("customerEmail", customer.customerEmail);
    setValue("projectAddress", customer.projectAddress);
    setValue("projectAddress2", customer.projectAddress2);
    setValue("projectCity", customer.projectCity);
    setValue("projectState", customer.projectState);
    setValue("projectZip", customer.projectZip);
    setValue("customer_id", customer.customer_id);
  }, [customer, setValue]);

  return (
    <div className="flex flex-col gap-4 justify-start items-start w-full">
      <Typography variant="h6">Customer Info</Typography>
      <div className="w-full">
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
      <div className="flex flex-col gap-4 my-2 w-full">
        <div className="flex justify-center items-center gap-4">
          <TextInput
            name="customerFirstName"
            label="Customer First Name"
            readonly={readonly}
            disabled={
              saveStatus === "saving" ||
              saveAndSaveStatus === "saving" ||
              saveAndSaveStatus === "sending"
            }
          />
          <TextInput
            name="customerLastName"
            label="Customer Last Name"
            readonly={readonly}
            disabled={
              saveStatus === "saving" ||
              saveAndSaveStatus === "saving" ||
              saveAndSaveStatus === "sending"
            }
          />
        </div>
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
        <Divider />
        <Typography variant="h6">Project Address</Typography>
        <MVLAddressInput
          addressInputNames={{
            address: "projectAddress",
            address2: "projectAddress2",
            city: "projectCity",
            state: "projectState",
            zip: "projectZip",
          }}
        />
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
