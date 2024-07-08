"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import { LineItemFormFieldProps } from "@/types/estimates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { formatPriceString } from "@/utils/formatingFunctions";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { calculateAmount } from "@/utils/formUtils/estimateFormUtils";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";

const LineItemFormField = ({
  fields,
  index,
  applyTotal,
  remove,
  setSubtotal,
}: LineItemFormFieldProps) => {
  // Hooks
  const { register, watch, setValue, getValues, control } = useFormContext();

  // State
  const [amount, setAmount] = useState(0);

  // Effects
  useEffect(() => {
    watch(() => {
      calculateAmount(
        watch(`lineItems.${index}.quantity` as const),
        watch(`lineItems.${index}.price` as const),
        setAmount,
      );
    });
    setValue(`lineItems.${index}.amount`, amount);
  }, [
    watch(`lineItems.${index}.quantity` as const),
    watch(`lineItems.${index}.price` as const),
    fields,
  ]);

  useEffect(() => {
    applyTotal(setSubtotal, setValue, getValues, fields);
  }, [watch(`lineItems.${index}.amount` as const)]);

  useEffect(() => {
    const value = getValues(`lineItems.${index}.rateType`);
    if (value === "flat") {
      setValue(`lineItems.${index}.quantity`, 1);
    }
  }, [watch(`lineItems.${index}.rateType` as const)]);

  return (
    <TableRow>
      <TableCell className="align-top">
        <TextInput
          name={`lineItems.${index}.item` as const}
          label="Item Name"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top">
        <TextInput
          name={`lineItems.${index}.description` as const}
          label="Item Description"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top">
        <div
          className={`${getValues(`lineItems.${index}.rateType`) === "flat" ? "hidden" : "flex"} flex-col gap-1 justify-start items-start`}
        >
          <TextInput
            name={`lineItems.${index}.quantity` as const}
            label="Quantity"
            size="small"
          />
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="flex w-full gap-8">
          <div className="w-full">
            <MVLAutocomplete
              name={`lineItems.${index}.rateType`}
              label="Rate Type"
              options={[
                "Unit Rate",
                "SQFT",
                "LNFT",
                "Hourly",
                "Daily",
                "Flat Rate",
              ]}
              size="small"
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextInput
              name={`lineItems.${index}.price` as const}
              label="Price"
              size="small"
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="align-center">
        <p>{formatPriceString(amount)}</p>
      </TableCell>
      <TableCell className="align-top">
        <div className="">
          <Button
            onClick={() => {
              remove(index);
            }}
            className=""
            variant="ghost"
          >
            <FaTrashAlt className="text-error500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LineItemFormField;
