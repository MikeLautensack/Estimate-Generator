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
import { Button, Typography } from "@mui/material";
import useCalcAmount from "./hooks/useCalcAmount";
import useCalcSubtotal from "./hooks/useCalcSubtotal";
import MVLMoneyInput from "../inputs/MVLMoneyInput";
import MVLNumber from "../inputs/MVLNumber";

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
  }, [setValue, subtotal, fields]);

  return (
    <TableRow>
      <TableCell className="align-top w-36 pr-2">
        <TextInput
          name={`lineItems.${index}.item` as const}
          label="Item Name"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top w-full px-2">
        <TextInput
          name={`lineItems.${index}.description` as const}
          label="Item Description"
          size="small"
        />
      </TableCell>
      <TableCell className="align-top w-32 px-2">
        <div
          className={`${getValues(`lineItems.${index}.rateType`) === "flat" ? "hidden" : "flex"} flex-col gap-1 justify-start items-start w-32`}
        >
          <MVLNumber
            name={`lineItems.${index}.quantity` as const}
            label="Quantity"
            size="small"
          />
        </div>
      </TableCell>
      <TableCell className="align-top w-[272px] px-2">
        <div className="flex gap-4">
          <div className="w-32">
            <MVLAutocomplete
              name={`lineItems.${index}.rateType`}
              label="Rate Type"
              options={[
                { label: "Unit Rate" },
                { label: "SQFT" },
                { label: "LNFT" },
                { label: "Hourly" },
                { label: "Daily" },
                { label: "Flat Rate" },
              ]}
              size="small"
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <MVLMoneyInput
              name={`lineItems.${index}.price` as const}
              label="Price"
              size="small"
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="align-center px-2">
        <Typography variant="body1" color="#3e9c35">
          {formatPriceString(amount)}
        </Typography>
      </TableCell>
      <TableCell className="align-top pl-2 pr-0">
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
