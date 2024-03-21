"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import EstimateFormTable from "../tables/contractorTables/estimateFormTable/EstimateFormTable";
import TaxSelector from "../misc/TaxSelector";
import { formatPriceString } from "@/utils/formatingFunctions";
import { EstimateFormPartTwoProps } from "@/types/estimates";
import { applyTotal } from "@/utils/formUtils/estimateFormUtils";

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

  const { register, setValue, getValues } = useFormContext();

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
    const name = profile[0].businessName;
    const address = profile[0].businessAddress;
    const phone = profile[0].businessPhone;
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
      setCustomerName(getValues("customerName"));
      setCustomerEmail(getValues("customerEmail"));
      setProjectAddress(getValues("projectAddress"));
    }
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2 desktop:gap-4">
      <div className="flex flex-col flex-1 relative gap-1 my-2">
        <label className="font-bold text-2xl">Estimate Name</label>
        <input
          {...register("estimateName")}
          className="border-b-2 border-blue-500 max-w-xs"
        ></input>
      </div>
      <div className="flex flex-col gap-2 desktop:gap-4">
        <div className="flex flex-col gap-2 desktop:gap-4 desktop:flex-row desktop:overflow-x-scroll">
          <div className="flex flex-col flex-1 relative">
            <div className="flex justify-between items-center">
              <p>Customer Name:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                  {customerName}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Customer Email:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="">{customerEmail}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Project Address:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="">{projectAddress}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 relative">
            <div className="flex justify-between items-center">
              <p>Business Name:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="">{businessName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Business Address:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="">{businessAddress}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p>Business Phone:</p>
              <div className="max-tablet:overflow-x-scroll max-tablet:w-1/2">
                <p className="">{businessPhone}</p>
              </div>
            </div>
          </div>
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
          <div className="flex-1">
            <label className="">Message:</label>
            <textarea
              {...register("message")}
              className="w-full border border-primary300 rounded"
            ></textarea>
          </div>
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
        <div className="flex flex-col justify-evenly gap-2 desktop:flex-row">
          <Button
            type="submit"
            className="flex-1"
            onClick={methods.handleSubmit(preview)}
          >
            Preview Estimate
          </Button>
          <Button
            type="submit"
            className="flex-1"
            onClick={methods.handleSubmit(save)}
          >
            Save
          </Button>
          <Button
            type="submit"
            className="flex-1"
            onClick={methods.handleSubmit(saveAndSend)}
          >
            Save & Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimateFormPartTwo;
