"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
import { LineItemFormFieldProps } from "@/types/estimates";
import { useFormContext, useWatch } from "react-hook-form";
import { formatPriceString } from "@/utils/formatingFunctions";
import { FaTrashAlt } from "react-icons/fa";
import TextInput from "../inputs/TextInput";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { Button } from "@mui/material";
import useCalcAmount from "./hooks/useCalcAmount";
import useCalcSubtotal from "./hooks/useCalcSubtotal";
import MVLMoneyInput from "../inputs/MVLMoneyInput";

const LineItemFormField = ({
  fields,
  index,
  remove,
}: LineItemFormFieldProps) => {
  // Hooks
  const { control, setValue, getValues } = useFormContext();

  // Watched fields
  const quantityVal = useWatch({
    control,
    name: `lineItems.${index}.quantity` as const,
  });
  const priceVal = useWatch({
    control,
    name: `lineItems.${index}.price` as const,
  });

  // Field names
  const amountName = `lineItems.${index}.amount`;

  // Custom hooks
  const amount = useCalcAmount(quantityVal, priceVal);
  const subtotal = useCalcSubtotal(fields, amount, index);

  // Effects
  useEffect(() => {
    setValue(amountName, amount);
  }, [amount, amountName, setValue]);

  useEffect(() => {
    setValue("subtotal", subtotal);
  }, [setValue, subtotal]);

  return (
    <TableRow>
      <TableCell className="align-top w-36">
        <TextInput
          name={`lineItems.${index}.item` as const}
          label="Item Name"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top w-full">
        <TextInput
          name={`lineItems.${index}.description` as const}
          label="Item Description"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top w-24">
        <div
          className={`${getValues(`lineItems.${index}.rateType`) === "flat" ? "hidden" : "flex"} flex-col gap-1 justify-start items-start w-24`}
        >
          <TextInput
            name={`lineItems.${index}.quantity` as const}
            label="Quantity"
            size="small"
          />
        </div>
      </TableCell>
      <TableCell className="align-top w-56">
        <div className="flex gap-8">
          <div className="w-24">
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
          <div className="flex flex-col gap-1 w-24">
            <MVLMoneyInput
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
            variant="text"
          >
            <FaTrashAlt className="text-error500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LineItemFormField;
