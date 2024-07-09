"use client";

import { useCallback, useEffect, useState } from "react";
import { Estimates } from "@/types/estimates";
import EstimateFormPartOne from "./EstimateFormPartOne";
import EstimateFormPartTwo from "./EstimateFormPartTwo";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { getCustomerUserID } from "@/utils/formUtils/estimateFormUtils";
import { Card, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { a11yProps } from "./utils";
import EstimateFormChangeOrdersTab from "./EstimateFormChangeOrdersTab";
import { Customers } from "@/types/customers";
import { Profile } from "@/types/profile";
import { ChangeOrder } from "@/types/changeOrders";
import { z } from "zod";
import { estimates } from "@/db/schemas/estimates";

export type EstimateFormProps = {
  estimate: Estimates;
  customers: Customers[];
  profile: Profile;
  changeOrders?: ChangeOrder[];
  mode: "new-estimate" | "edit-estimate";
};

const LineItemsSchema = z.object({
  id: z.number(),
  item: z.string(),
  description: z.string(),
  quantity: z.number(),
  rateType: z.string(),
  price: z.number(),
  amount: z.number(),
});

const LineItemsArraySchema = z.array(LineItemsSchema);

const EstimateFormSchema = z.object({
  id: z.number(),
  estimateName: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  projectAddress: z.string(),
  contractorName: z.string(),
  contractorAddress: z.string(),
  contractorPhone: z.string(),
  lineItems: LineItemsArraySchema,
  message: z.string(),
  subtotal: z.number(),
  taxRate: z.number(),
  tax: z.number(),
  total: z.number(),
  status: z.string(),
  customer_id: z.number(),
  customer_user_id: z.string(),
  contractor_user_id: z.string(),
});

export type EstimateFormValues = z.infer<typeof EstimateFormSchema>;
export type LineItemsValues = z.infer<typeof LineItemsSchema>;

const EstimateForm = ({
  estimate,
  customers,
  profile,
  changeOrders,
  mode,
}: EstimateFormProps) => {
  // State
  const [tab, setTab] = useState<number>(0);

  // Hooks
  const methods: UseFormReturn<EstimateFormValues> =
    useForm<EstimateFormValues>({
      defaultValues: {
        id: estimate.id,
        estimateName: estimate.estimateName,
        customerName: estimate.customerName,
        customerEmail: estimate.customerEmail,
        projectAddress: estimate.projectAddress,
        contractorName: estimate.contractorName,
        contractorAddress: estimate.contractorAddress,
        contractorPhone: estimate.contractorPhone,
        lineItems: estimate.lineItems,
        message: estimate.message,
        subtotal: estimate.subtotal,
        taxRate: estimate.taxRate,
        tax: estimate.tax,
        total: estimate.total,
        status: estimate.status,
        customer_id: estimate.customer_id,
        customer_user_id: estimate.customer_user_id,
        contractor_user_id: estimate.contractor_user_id,
      },
    });

  const control = methods.control;

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  // Callbacks
  const save: SubmitHandler<EstimateFormValues> = useCallback(
    async (data) => {
      console.log("save callback data log", data);
      // IDs
      const USER_ID = estimate.contractor_user_id;
      const CUSTOMER_ID = estimate.customer_id;
      const ESTIMATE_ID = estimate.id;
      const CUSTOMER_USER_ID = estimate.customer_user_id;

      // Fetchs
      if (mode === "new-estimate") {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              CUSTOMER_USER_ID,
            }),
          },
        );
      } else if (mode === "edit-estimate") {
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              CUSTOMER_USER_ID,
            }),
          },
        );
      }
    },
    [
      estimate.contractor_user_id,
      estimate.customer_id,
      estimate.customer_user_id,
      estimate.id,
      mode,
    ],
  );
  const saveAndSend = useCallback(() => {}, []);
  const preview = useCallback(() => {}, []);

  // Effects
  // useEffect(() => {
  //   if (mode === "edit-customer") {
  //     if (estimate && estimate.lineItems) {
  //       setLineItems(estimate.lineItems);
  //       methods.setValue("estimateName", estimate.estimateName);
  //       methods.setValue("customer_id", estimate.customer_id);
  //       methods.setValue("customerName", estimate.customerName);
  //       methods.setValue("customerEmail", estimate.customerEmail);
  //       methods.setValue("projectAddress", estimate.projectAddress);
  //       methods.setValue("contractorName", estimate.contractorName);
  //       methods.setValue("contractorAddress", estimate.contractorAddress);
  //       methods.setValue("contractorPhone", estimate.contractorPhone);
  //       methods.setValue("lineItems", estimate.lineItems);
  //       methods.setValue("taxRate", estimate.taxRate);
  //       methods.setValue("message", estimate.message);
  //       methods.setValue("subtotal", estimate.subtotal);
  //       methods.setValue("tax", estimate.tax);
  //       methods.setValue("total", estimate.total);
  //       for (let i = 0; i < estimate.lineItems.length; i++) {
  //         methods.setValue(`lineItems.${i}.item`, estimate.lineItems[i].item);
  //         methods.setValue(
  //           `lineItems.${i}.description`,
  //           estimate.lineItems[i].description,
  //         );
  //         methods.setValue(
  //           `lineItems.${i}.rateType`,
  //           estimate.lineItems[i].rateType,
  //         );
  //         methods.setValue(
  //           `lineItems.${i}.quantity`,
  //           estimate.lineItems[i].quantity,
  //         );
  //         methods.setValue(`lineItems.${i}.price`, estimate.lineItems[i].price);
  //         methods.setValue(
  //           `lineItems.${i}.amount`,
  //           estimate.lineItems[i].amount,
  //         );
  //       }
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
            onChange={(_: unknown, newValue: number) => setTab(newValue)}
            value={tab}
          >
            <Tab label="1. Customer & Contact Info" {...a11yProps(0)} />
            <Tab label="2. Estimate Info" {...a11yProps(1)} />
            {changeOrders && <Tab label="3. Change Orders" {...a11yProps(2)} />}
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
          {changeOrders && (
            <CustomTabPanel value={tab} index={2}>
              <EstimateFormChangeOrdersTab changeOrders={changeOrders} />
            </CustomTabPanel>
          )}
        </form>
      </FormProvider>
    </Card>
  );
};

export default EstimateForm;
