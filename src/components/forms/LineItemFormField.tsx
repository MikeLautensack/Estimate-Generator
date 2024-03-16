"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useState,  useEffect } from "react";
import { LineItemFormFieldProps } from "@/types/estimates";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { formatPriceString } from "@/utils/formatingFunctions";
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { calculateAmount } from "@/utils/formUtils/estimateFormUtils";

const LineItemFormField = ({
    fields,
    index,
    applyTotal,
    remove
}: LineItemFormFieldProps) => {

  const { 
    register, 
    watch, 
    setValue, 
    getValues, 
    control 
  } = useFormContext();

  const [ amount, setAmount ] = useState(0);

  useEffect(() => {
    watch(() => {
      const amount = calculateAmount(watch(`lineItems.${index}.quantity` as const), watch(`lineItems.${index}.price` as const), setAmount);
    })
    setValue(`lineItems.${index}.amount`, amount);
  }, [watch(`lineItems.${index}.quantity` as const), watch(`lineItems.${index}.price` as const), fields]);

  useEffect(() => {
    applyTotal();
  }, [watch(`lineItems.${index}.amount` as const)])

  useEffect(() => {
    const value = getValues(`lineItems.${index}.rateType`)
    if(value === "flat") {
      setValue(`lineItems.${index}.quantity`, 1)
    }
  }, [watch(`lineItems.${index}.rateType` as const)])

  return (
    <TableRow className="bg-neutral100">
      <TableCell className="align-top">
        <div className="flex flex-col gap-1 justify-start items-start">
          <label>Item Name</label>
          <input 
            {...register(`lineItems.${index}.item` as const)} 
            className="border border-primary300 rounded"
          ></input>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="flex flex-col gap-1 justify-start items-start">
          <label>Item Description</label>
          <textarea 
            {...register(`lineItems.${index}.description` as const)} 
            className="border border-primary300 rounded"
          ></textarea>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className={`${getValues(`lineItems.${index}.rateType`) === "flat" ? "hidden" : "flex"} flex-col gap-1 justify-start items-start`}>
          <label>Quantity</label>
          <input 
            type="number" 
            {...register(`lineItems.${index}.quantity` as const, {valueAsNumber: true})} 
            className="border border-primary300 rounded"
          ></input>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="flex flex-col desktop:flex-row w-full">
          <div className="w-full">
            <FormField
              control={control}
              name={`lineItems.${index}.rateType`}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1">
                  <FormLabel>Rate Type</FormLabel>
                  <Select 
                    value={field.value} 
                    onValueChange={field.onChange} 
                    {...register(`lineItems.${index}.rateType` as const)}
                  >
                    <FormControl>                        
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rate Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="unit">Unit Rate</SelectItem>
                      <SelectItem value="sqft">SQFT</SelectItem>
                      <SelectItem value="lnft">LNFT</SelectItem>
                      <SelectItem value="hour">Hourly</SelectItem>
                      <SelectItem value="day">Dayly</SelectItem>
                      <SelectItem value="flat">Flat Rate</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Price</label>
            <input 
              type="number" {...register(`lineItems.${index}.price` as const, {valueAsNumber: true})} 
              className="border border-primary300 rounded"
            ></input>
          </div>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="">
          <p>{formatPriceString(amount)}</p>
        </div>
      </TableCell>
      <TableCell className="align-top">
        <div className="">
          <Button
            onClick={() => {
              remove(index)
            }}
            className=""
            variant="ghost"
          >
            <FaTrashAlt className="text-error500"/>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default LineItemFormField;