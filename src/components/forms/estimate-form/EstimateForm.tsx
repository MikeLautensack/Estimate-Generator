"use client";

import { useCallback, useEffect, useState } from "react";
import EstimateFormPartOne from "./EstimateFormPartOne";
import EstimateFormPartTwo from "./EstimateFormPartTwo";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Card, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "./CustomTabPanel";
import { a11yProps, defaultValuesFactory } from "./utils";
import EstimateFormChangeOrdersTab from "./EstimateFormChangeOrdersTab";
import { ChangeOrder } from "@/types/changeOrders";
import { z } from "zod";
import useCalcTotal from "./hooks/useCalcTotal";
import EstimateFormButtons from "./EstimateFormButtons";
import useGetCustomerUserId from "./hooks/useGetCustomerUserId";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomersSelect } from "@/db/schemas/customers";
import { ProfileSelect } from "@/db/schemas/profiles";
import { EstimatesWithLineItemsSelect } from "@/db/schemas/estimates";

export type EstimateFormProps = {
  estimate: EstimatesWithLineItemsSelect;
  customers?: CustomersSelect[];
  profile?: ProfileSelect;
  changeOrders?: ChangeOrder[];
};

const LineItemsSchema = z.object({
  id: z.string(),
  item: z.string(),
  description: z.string(),
  quantity: z.string(),
  rateType: z.string(),
  price: z.string(),
  amount: z.string(),
});

const LineItemsArraySchema = z.array(LineItemsSchema);

const EstimateFormSchema = z.object({
  id: z.string(),
  estimateName: z.string().min(1, { message: "Estimate Name is required" }),
  customerFirstName: z
    .string()
    .min(1, { message: "Customer First Name is required" }),
  customerLastName: z
    .string()
    .min(1, { message: "Customer Last Name is required" }),
  customerEmail: z.string().min(1, { message: "Customer Email is required" }),
  projectAddress: z.string().min(1, { message: "Project Address is required" }),
  projectAddress2: z.string(),
  projectCity: z.string().min(1, { message: "Project City is required" }),
  projectState: z.string().min(1, { message: "Project State is required" }),
  projectZip: z.string().min(1, { message: "Project Zip is required" }),
  contractorName: z.string(),
  contractorAddress: z
    .string()
    .min(1, { message: "Contractor Address is required" }),
  contractorAddress2: z.string(),
  contractorCity: z.string().min(1, { message: "Contractor City is required" }),
  contractorState: z
    .string()
    .min(1, { message: "Contractor State is required" }),
  contractorZip: z.string().min(1, { message: "Contractor Zip is required" }),
  contractorPhone: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  expirationDate: z.string().date(),
  lineItems: LineItemsArraySchema,
  message: z.string().min(1, { message: "Message is required" }),
  subtotal: z.string(),
  taxMode: z.string(),
  taxRate: z.string(),
  tax: z.string(),
  discountMode: z.string(),
  discountPercentage: z.string(),
  discount: z.string(),
  total: z.string(),
  status: z.string(),
  customer_id: z.string(),
  user_id: z.string(),
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
}: EstimateFormProps) => {
  // State
  const [tab, setTab] = useState<number>(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("not-saved");
  const [saveAndSaveStatus, setSaveAndSaveStatus] =
    useState<SaveAndSentStatus>("not-saved");

  // Hooks
  const methods = useForm<EstimateFormValues>({
    resolver: zodResolver(EstimateFormSchema),
    defaultValues: defaultValuesFactory(estimate),
  });

  const control = methods.control;

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  // Watched fields
  const subtotal = useWatch({ control, name: "subtotal" });
  const tax = useWatch({ control, name: "tax" });
  const customerFirstName = useWatch({ control, name: "customerFirstName" });
  const customerLastName = useWatch({ control, name: "customerLastName" });
  const discount = useWatch({ control, name: "discount" });

  // Custom hooks
  const total = useCalcTotal(subtotal, tax, discount);
  const customerUserId = useGetCustomerUserId(
    customers,
    customerFirstName,
    customerLastName,
  );

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
      let route = `/api/estimates/${estimate.id}`;
      let method = "PATCH";
      let headers = {
        "Content-Type": "application/json",
      };
      let body = { ...data };

      setSaveStatus("saving");

      const res = await fetch(route, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      if (res.status === 200) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    },
    [estimate.userId, estimate.id],
  );

  const saveAndSend: SubmitHandler<EstimateFormValues> = useCallback(
    async (data) => {
      // // IDs
      // const USER_ID = estimate.contractor_user_id;
      // const ESTIMATE_ID = estimate.id;
      // const CUSTOMER_ID = data.customer_id;
      // const customer_user_id = data.customer_user_id;
      // let route = "/api/estimates";
      // let method = "POST";
      // let headers = {
      //   "Content-Type": "application/json",
      // };
      // let body = {
      //   ...data,
      //   customer_user_id,
      // };
      // setSaveAndSaveStatus("saving");
      // const res = await fetch(route, {
      //   method: method,
      //   headers: headers,
      //   body: JSON.stringify(body),
      // });
      // if (res.status === 200) {
      //   setSaveStatus("saved");
      // } else {
      //   setSaveStatus("error");
      // }
      // // Fetchs
      // if (mode === "new-estimate") {
      //   setSaveAndSaveStatus("saving");
      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         ...data,
      //         customer_user_id,
      //       }),
      //     },
      //   );
      //   if (res.status === 200) {
      //     const pdf = handlePdfDownload(res);
      //     setSaveAndSaveStatus("sending");
      //     const emailRes = await sendAuthEmail(
      //       data.customerEmail,
      //       `${process.env.NEXT_PUBLIC_HOST}api/redirect?email-type=new-estimate&customer-name=${`${data.customerFirstName} ${data.customerLastName}`}&contractor-name=${session.user.name}&redirect-flag=new-estimate&estimate-id=${ESTIMATE_ID}`,
      //       false,
      //     );
      //     // if (emailRes?.status === 200) {
      //     //   setSaveAndSaveStatus("saved");
      //     // }
      //   } else {
      //     setSaveAndSaveStatus("error");
      //   }
      // } else if (mode === "update-estimate") {
      //   setSaveAndSaveStatus("saving");
      //   const res = await fetch(
      //     `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         ...data,
      //         customer_user_id,
      //         status: "updated-estimate",
      //       }),
      //     },
      //   );
      //   if (res.status === 200) {
      //     const pdf = handlePdfDownload(res);
      //     setSaveAndSaveStatus("sending");
      //     const emailRes = await sendAuthEmail(
      //       data.customerEmail,
      //       `${process.env.NEXT_PUBLIC_HOST}api/redirect?email-type=updated-estimate&customer-name=${`${data.customerFirstName} ${data.customerLastName}`}&contractor-name=${session.user.name}&redirect-flag=updated-estimate&estimate-id=${ESTIMATE_ID}`,
      //       false,
      //     );
      //     // if (emailRes?.status === 200) {
      //     //   setSaveAndSaveStatus("saved");
      //     // }
      //   } else {
      //     setSaveAndSaveStatus("error");
      //   }
      // }
    },
    [],
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
              customers={customers ?? []}
              saveStatus={saveStatus}
              saveAndSaveStatus={saveAndSaveStatus}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <EstimateFormPartTwo
              customers={customers ?? []}
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
        </form>
      </FormProvider>
    </Card>
  );
};

export default EstimateForm;
