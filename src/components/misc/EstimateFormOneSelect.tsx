import React from "react";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFormContext } from "react-hook-form";
import { EstimateFormPartOneSelectProps } from "@/types/estimates";
import { Customers } from "@/types/customers";

const EstimateFormOneSelect = ({
  customers,
  field,
}: EstimateFormPartOneSelectProps) => {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel className="text-blue-500 font-base font-semibold">
        Customers
      </FormLabel>
      <Select
        {...field}
        value={field.value as string}
        onValueChange={field.onChange}
        {...register("customer_id" as const)}
      >
        <FormControl>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Customers" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {customers.map((customer: Customers) => {
            return (
              <div key={customer.id}>
                <SelectItem value={`${customer.id}`}>
                  {customer.name}
                </SelectItem>
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </FormItem>
  );
};

export default EstimateFormOneSelect;
