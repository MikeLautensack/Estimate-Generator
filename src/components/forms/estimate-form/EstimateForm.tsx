"use client";

import { useCallback, useEffect, useState } from "react";
import EstimateFormPartOne from "./EstimateFormPartOne";
import EstimateFormPartTwo from "./EstimateFormPartTwo";
import {
  FormProvider,
  SubmitHandler,
  UseFormReturn,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Card, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { a11yProps } from "./utils";
import EstimateFormChangeOrdersTab from "./EstimateFormChangeOrdersTab";
import { Customers } from "@/types/customers";
import { Profile } from "@/types/profile";
import { ChangeOrder } from "@/types/changeOrders";
import { z } from "zod";
import useCalcTotal from "./hooks/useCalcTotal";
import EstimateFormButtons from "./EstimateFormButtons";
import useGetCustomerUserId from "./hooks/useGetCustomerUserId";
import { sendAuthEmail } from "@/utils/sendAuthEmail";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";

export type EstimateFormProps = {
  estimate: EstimateFormValues;
  customers: Customers[];
  profile: Profile;
  changeOrders?: ChangeOrder[];
  mode: "new-estimate" | "update-estimate";
};

const LineItemsSchema = z.object({
  id: z.string(),
  item: z.string().min(1, { message: "Item is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  quantity: z.string(),
  rateType: z.string(),
  price: z.string(),
  amount: z.string(),
});

const LineItemsArraySchema = z.array(LineItemsSchema);

const EstimateFormSchema = z.object({
  id: z.string(),
  estimateName: z.string().min(1, { message: "Estimate Name is required" }),
  customerName: z.string().min(1, { message: "Customer Name is required" }),
  customerEmail: z.string().min(1, { message: "Customer Email is required" }),
  projectAddress: z.string().min(1, { message: "Project Address is required" }),
  contractorName: z.string(),
  contractorAddress: z.string(),
  contractorPhone: z.string(),
  lineItems: LineItemsArraySchema,
  message: z.string().min(1, { message: "Message is required" }),
  subtotal: z.string(),
  taxRate: z.string(),
  tax: z.string(),
  total: z.string(),
  status: z.string(),
  customer_id: z.string(),
  customer_user_id: z.string().min(1, { message: "Customer is required" }),
  contractor_user_id: z.string(),
});

export type EstimateFormValues = z.infer<typeof EstimateFormSchema>;
export type LineItemsValues = z.infer<typeof LineItemsSchema>;
export type SaveStatus = "not-saved" | "saving" | "saved" | "error";
export type SaveAndSentStatus =
  | "not-saved"
  | "saving"
  | "saved"
  | "sending"
  | "error";

const EstimateForm = ({
  estimate,
  customers,
  profile,
  changeOrders,
  mode,
}: EstimateFormProps) => {
  // State
  const [tab, setTab] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("not-saved");
  const [saveAndSaveStatus, setSaveAndSaveStatus] =
    useState<SaveAndSentStatus>("not-saved");

  // Hooks
  const methods = useForm<EstimateFormValues>({
    resolver: zodResolver(EstimateFormSchema),
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

  console.log("debugging estimate form validation", methods.formState.errors);

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  // Watched fields
  const subtotal = useWatch({ control, name: "subtotal" });
  const tax = useWatch({ control, name: "tax" });
  const customerName = useWatch({ control, name: "customerName" });

  // Custom hooks
  const total = useCalcTotal(subtotal, tax);
  const customerUserId = useGetCustomerUserId(customers, customerName);

  // Effects
  useEffect(() => {
    methods.setValue("total", total);
  }, [methods, total]);

  useEffect(() => {
    methods.setValue("customer_user_id", customerUserId!);
  }, [customerUserId, methods]);

  useEffect(() => {
    if (saveStatus === "saved") {
      const timeout = setTimeout(() => {
        setSaveStatus("not-saved");
      }, 5000);
      // Cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [saveStatus]);

  useEffect(() => {
    if (saveAndSaveStatus === "saved") {
      const timeout = setTimeout(() => {
        setSaveAndSaveStatus("not-saved");
      }, 5000);
      // Cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [saveAndSaveStatus]);

  // Callbacks
  const save: SubmitHandler<EstimateFormValues> = useCallback(
    async (data) => {
      console.log("save callback data log", data);
      // IDs
      const USER_ID = estimate.contractor_user_id;
      const ESTIMATE_ID = estimate.id;
      const CUSTOMER_ID = data.customer_id;
      const customer_user_id = data.customer_user_id;

      // Fetchs
      if (mode === "new-estimate") {
        setSaveStatus("saving");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              customer_user_id,
            }),
          },
        );
        if (res.status === 200) {
          setSaveStatus("saved");
        } else {
          setSaveStatus("error");
        }
      } else if (mode === "update-estimate") {
        setSaveStatus("saving");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              customer_user_id,
              status: "updated-estimate",
            }),
          },
        );
        if (res.status === 200) {
          setSaveStatus("saved");
        } else {
          setSaveStatus("error");
        }
      }
    },
    [estimate.contractor_user_id, estimate.id, mode],
  );

  const saveAndSend: SubmitHandler<EstimateFormValues> = useCallback(
    async (data) => {
      console.log("save callback data log", data);
      // IDs
      const USER_ID = estimate.contractor_user_id;
      const ESTIMATE_ID = estimate.id;
      const CUSTOMER_ID = data.customer_id;
      const customer_user_id = data.customer_user_id;

      // Fetchs
      if (mode === "new-estimate") {
        setSaveAndSaveStatus("saving");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              customer_user_id,
            }),
          },
        );
        if (res.status === 200) {
          setSaveAndSaveStatus("sending");
          const emailRes = await sendAuthEmail(
            data.customerEmail,
            `${process.env.NEXT_PUBLIC_HOST}api/redirect?email-type=new-estimate&customer-name=${data.customerName}&contractor-name=${data.contractorName}&redirect-flag=new-estimate&estimate-id=${data.id}`,
            false,
          );
          if (emailRes?.status === 200) {
            setSaveAndSaveStatus("saved");
          }
        } else {
          setSaveAndSaveStatus("error");
        }
      } else if (mode === "update-estimate") {
        setSaveAndSaveStatus("saving");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              customer_user_id,
              status: "updated-estimate",
            }),
          },
        );
        if (res.status === 200) {
          setSaveAndSaveStatus("sending");
          const emailRes = await sendAuthEmail(
            data.customerEmail,
            `${process.env.NEXT_PUBLIC_HOST}api/redirect?email-type=updated-estimate&customer-name=${data.customerName}&contractor-name=${data.contractorName}&redirect-flag=updated-estimate&estimate-id=${data.id}`,
            false,
          );
          if (emailRes?.status === 200) {
            setSaveAndSaveStatus("saved");
          }
        } else {
          setSaveAndSaveStatus("error");
        }
      }
    },
    [estimate.contractor_user_id, estimate.id, mode],
  );

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
            {changeOrders && changeOrders?.length !== 0 && (
              <Tab label="3. Change Orders" {...a11yProps(2)} />
            )}
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <EstimateFormPartOne
              customers={customers}
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
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
              save={save}
              saveAndSend={saveAndSend}
              mode={mode}
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
          </CustomTabPanel>
          {changeOrders && changeOrders?.length !== 0 && (
            <CustomTabPanel value={tab} index={2}>
              <EstimateFormChangeOrdersTab changeOrders={changeOrders} />
            </CustomTabPanel>
          )}
          <EstimateFormButtons
            tab={tab}
            setTab={setTab}
            tabsCount={changeOrders && changeOrders.length !== 0 ? 3 : 2}
            save={save}
            saveAndSend={saveAndSend}
            saveStatus={saveStatus}
            saveAndSaveStatus={saveAndSaveStatus}
            mode={mode}
          />
          {/* <DevTool control={control} /> */}
        </form>
      </FormProvider>
    </Card>
  );
};

export default EstimateForm;
