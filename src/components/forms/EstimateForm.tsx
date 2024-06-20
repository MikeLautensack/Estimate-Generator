"use client";

import { useEffect, useState } from "react";
import { EstimateFormProps, EstimateFormValues } from "@/types/estimates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EstimateFormPartOne from "./EstimateFormPartOne";
import EstimateFormPartTwo from "./EstimateFormPartTwo";
import {
  FormProvider,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  preview,
  save,
  saveAndSend,
} from "@/utils/formUtils/estimateFormUtils";
import { Customers } from "@/types/customers";

const EstimateForm = ({
  estimate,
  customers,
  profile,
  changeOrders,
}: EstimateFormProps) => {
  const [lineItems, setLineItems] = useState([
    {
      item: "",
      description: "",
      quantity: 0,
      rateType: "unit",
      price: 0,
      amount: 0,
    },
  ]);

  const methods: UseFormReturn<EstimateFormValues> =
    useForm<EstimateFormValues>({
      defaultValues: {
        lineItems: lineItems,
        taxRate: 0,
      },
    });

  const control = methods.control;

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  useEffect(() => {
    if (estimate && estimate.lineItems) {
      setLineItems(estimate.lineItems);
      methods.setValue("estimateName", estimate.estimateName);
      methods.setValue("customer_id", estimate.customer_id);
      methods.setValue("customerName", estimate.customerName);
      methods.setValue("customerEmail", estimate.customerEmail);
      methods.setValue("projectAddress", estimate.projectAddress);
      methods.setValue("contractorName", estimate.contractorName);
      methods.setValue("contractorAddress", estimate.contractorAddress);
      methods.setValue("contractorPhone", estimate.contractorPhone);
      methods.setValue("lineItems", estimate.lineItems);
      methods.setValue("taxRate", estimate.taxRate);
      methods.setValue("message", estimate.message);
      methods.setValue("subtotal", estimate.subtotal);
      methods.setValue("tax", estimate.tax);
      methods.setValue("total", estimate.total);
      for (let i = 0; i < estimate.lineItems.length; i++) {
        methods.setValue(`lineItems.${i}.item`, estimate.lineItems[i].item);
        methods.setValue(
          `lineItems.${i}.description`,
          estimate.lineItems[i].description,
        );
        methods.setValue(
          `lineItems.${i}.rateType`,
          estimate.lineItems[i].rateType,
        );
        methods.setValue(
          `lineItems.${i}.quantity`,
          estimate.lineItems[i].quantity,
        );
        methods.setValue(`lineItems.${i}.price`, estimate.lineItems[i].price);
        methods.setValue(`lineItems.${i}.amount`, estimate.lineItems[i].amount);
      }
    }
  }, []);

  return (
    <div className="">
      <FormProvider {...methods}>
        <form className="w-full bg-neutral100">
          <Tabs defaultValue={"estimate-form-two"} className="w-full">
            <TabsList className="flex w-full">
              <TabsTrigger className="flex-1" value="estimate-form-one">
                1. Customer & Contact Info
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="estimate-form-two">
                2. Estimate Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value="estimate-form-one" className="w-full">
              <EstimateFormPartOne customers={customers} />
            </TabsContent>
            <TabsContent value="estimate-form-two" className="w-full">
              <EstimateFormPartTwo
                customers={customers}
                profile={profile}
                fields={fields}
                prepend={prepend}
                remove={remove}
                changeOrders={changeOrders!}
                estimate={estimate}
                methods={methods}
                preview={preview}
                save={save}
                saveAndSend={saveAndSend}
              />
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
};

export default EstimateForm;
