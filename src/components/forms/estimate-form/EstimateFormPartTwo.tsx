"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import EstimateFormTable from "../../tables/contractorTables/estimateFormTable/EstimateFormTable";
import TaxSelector from "../../misc/TaxSelector";
import { formatPriceString } from "@/utils/formatingFunctions";
import { EstimateFormPartTwoProps } from "@/types/estimates";
import { applyTotal } from "@/utils/formUtils/estimateFormUtils";
import TextInput from "../inputs/TextInput";
import EstimateFormPartTwoButtons from "./EstimateFormPartTwoButtons";
import { Box, Button } from "@mui/material";
import DataField from "./DataField";
import TextAreaInput from "../inputs/TextAreaInput";
import TaxAndTotal from "./TaxAndTotal";
import MVLReadOnlyInput from "../inputs/MVLReadOnlyInput";

const EstimateFormPartTwo = ({
  customers,
  profile,
  fields,
  prepend,
  remove,
  methods,
  preview,
  save,
  saveAndSend,
}: EstimateFormPartTwoProps) => {
  // Hooks
  const { register, setValue, getValues } = useFormContext();

  // State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0.07);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Effects
  useEffect(() => {
    applyTotal(setSubtotal, setValue, getValues, fields);
  }, [fields]);

  useEffect(() => {
    const currentTax = subtotal * taxRate;
    setTax(currentTax);
    setValue("tax", currentTax);
    setValue("taxRate", taxRate);
    const total = subtotal + currentTax;
    setTotal(total);
    setValue("total", total);
  }, [subtotal, taxRate]);

  useEffect(() => {
    const name = profile?.businessName;
    const address = profile?.businessAddress;
    const phone = profile?.businessPhone;
    setBusinessName(name);
    setBusinessAddress(address);
    setBusinessPhone(phone);
    setValue("contractorName", name);
    setValue("contractorAddress", address);
    setValue("contractorPhone", phone);

    if (getValues("customer_id")) {
      let customer;
      for (let i = 0; i < customers.length; i++) {
        if (customers[i].id == getValues("customer_id")) {
          customer = customers[i];
        }
      }
      setCustomerName(customer?.name as string);
      setCustomerEmail(customer?.email as string);
      setProjectAddress(customer?.address as string);
      setValue("customerName", customer?.name as string);
      setValue("customerEmail", customer?.email as string);
      setValue("projectAddress", customer?.address as string);
    } else {
      setCustomerName(getValues("customerName") as string);
      setCustomerEmail(getValues("customerEmail") as string);
      setProjectAddress(getValues("projectAddress") as string);
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2 desktop:gap-4 w-full">
      <TextInput name="estimateName" label="Estimate Name" />
      <div className="flex flex-col gap-2 desktop:gap-4">
        <div className="flex flex-col gap-2 desktop:gap-4 md:flex-row desktop:overflow-x-scroll items-start">
          <Box
            component="div"
            className="flex flex-col gap-3 items-start w-full pt-3"
          >
            <MVLReadOnlyInput
              label="Customer Name"
              name="customerName"
              size="small"
            />
            <MVLReadOnlyInput
              label="Customer Email"
              name="customerEmail"
              size="small"
            />
            <MVLReadOnlyInput
              label="Project Address"
              name="projectAddress"
              size="small"
            />
          </Box>
          <Box
            component="div"
            className="flex flex-col gap-3 items-start w-full pt-3"
          >
            <MVLReadOnlyInput
              label="Business Name"
              value={businessName}
              size="small"
            />
            <MVLReadOnlyInput
              label="Business Address"
              value={businessAddress}
              size="small"
            />
            <MVLReadOnlyInput
              label="Business Phone"
              value={businessPhone}
              size="small"
            />
          </Box>
        </div>
        <div className="flex flex-col gap-2 desktop:gap-4">
          <Button
            type="button"
            onClick={() => {
              prepend({
                item: "",
                description: "",
                quantity: 0,
                rateType: "unit",
                price: 0,
                amount: 0,
              });
            }}
            className="w-full desktop:w-56"
            variant="contained"
          >
            New Line Item
          </Button>
          <EstimateFormTable
            fields={fields}
            applyTotal={applyTotal}
            remove={remove}
            setSubtotal={setSubtotal}
          />
        </div>
        <div className="flex flex-col desktop:flex-row gap-4">
          <div className="flex-grow">
            <TextAreaInput name="message" label="Message" />
          </div>
          <div className="flex justify-end">
            <TaxAndTotal />
          </div>
        </div>
        <EstimateFormPartTwoButtons />
      </div>
    </div>
  );
};

export default EstimateFormPartTwo;
