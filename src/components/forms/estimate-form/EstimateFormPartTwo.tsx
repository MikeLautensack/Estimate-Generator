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
    <div className="p-4 flex flex-col gap-2 desktop:gap-4">
      <TextInput name="estimateName" label="Estimate Name" />
      <div className="flex flex-col gap-2 desktop:gap-4">
        <div className="flex flex-col gap-2 desktop:gap-4 desktop:flex-row desktop:overflow-x-scroll">
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItem: "center",
              gap: "0.5rem",
            }}
          >
            <DataField name="Customer Name" val={customerName} />
            <DataField name="Customer Email" val={customerEmail} />
            <DataField name="Project Address" val={projectAddress} />
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItem: "center",
              gap: "0.5rem",
            }}
          >
            <DataField name="Business Name" val={businessName} />
            <DataField name="Business Address" val={businessAddress} />
            <DataField name="Business Phone" val={businessPhone} />
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
          <TextAreaInput name="message" label="Message" />
          <div className="flex flex-col gap-1 my-2 flex-1">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Subtotal:</p>
              <p className="text-green-400">{formatPriceString(subtotal)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold flex-1">Tax:</p>
              <div className="flex flex-row-reverse flex-1 justify-start gap-8">
                {/* <input type='number' min={1} max={100}></input> */}
                <TaxSelector taxRate={taxRate} setTaxRate={setTaxRate} />
                <p className="text-green-500">{formatPriceString(tax)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Total:</p>
              <p className="text-green-700 font-semibold">
                {formatPriceString(total)}
              </p>
            </div>
          </div>
        </div>
        <EstimateFormPartTwoButtons />
      </div>
    </div>
  );
};

export default EstimateFormPartTwo;
