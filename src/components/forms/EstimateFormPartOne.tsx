"use client";

import { EstimateFormPartOneProps } from "@/types/estimates";
import { useFormContext } from "react-hook-form";
import { FormField } from "../ui/form";
import EstimateFormOneSelect from "../misc/EstimateFormOneSelect";

const EstimateFormPartOne = ({ customers }: EstimateFormPartOneProps) => {
  const { register, getValues, control } = useFormContext();

  return (
    <div className="bg-neutral100">
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
        <div className="flex flex-col gap-1">
          <label>Name</label>
          <input
            {...register("customerName")}
            className="border-b-2 border-blue-500"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            {...register("customerEmail")}
            className="border-b-2 border-blue-500"
          ></input>
        </div>
        <div className="flex flex-col gap-1">
          <label>Address</label>
          <input
            {...register("projectAddress")}
            className="border-b-2 border-blue-500"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default EstimateFormPartOne;
