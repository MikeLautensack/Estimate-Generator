"use client";

import { useEffect, useState } from "react";
import { EstimateFormProps, EstimateFormValues } from "@/types/estimates";
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
import { Box, Card, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { a11yProps } from "./utils";

const EstimateForm = ({
  estimate,
  customers,
  profile,
  changeOrders,
}: EstimateFormProps) => {
  // State
  const [tab, setTab] = useState<number>(0);
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

  // Hooks
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

  // Effects
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{ padding: "1rem", backgroundColor: "surfaceContainerLow" }}
      className="flex w-full"
    >
      <FormProvider {...methods}>
        <form className="w-full">
          <Tabs
            defaultValue={"estimate-form-two"}
            className="w-full"
            onChange={(event: React.SyntheticEvent, newValue: number) =>
              setTab(newValue)
            }
          >
            <Tab label="1. Customer & Contact Info" {...a11yProps(0)} />
            <Tab label="2. Estimate Info" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <EstimateFormPartOne customers={customers} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
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
          </CustomTabPanel>
        </form>
      </FormProvider>
    </Card>
  );
};

export default EstimateForm;
