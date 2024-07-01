"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext } from "react-hook-form";
import { FormField } from "../../ui/form";
import EstimateFormOneSelect from "../../misc/EstimateFormOneSelect";
import TextInput from "../inputs/TextInput";

const EstimateFormPartOne = ({ customers }: EstimateFormPartOneProps) => {
  const { register, getValues, control } = useFormContext();

  return (
    <div className="">
      <div className="">
        <FormField
          control={control}
          name={"customer_id"}
          render={({ field }) => (
            <EstimateFormOneSelect customers={customers} field={field} />
          )}
        />
      </div>
      <div
        className={`${getValues("customer_id") ? "hidden" : "flex"} flex-col gap-2 my-2 text-black`}
      >
        <TextInput name="customerName" label="Customer Name" />
        <TextInput name="customerEmail" label="Customer Email" />
        <TextInput name="projectAddress" label="Project Address" />
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
