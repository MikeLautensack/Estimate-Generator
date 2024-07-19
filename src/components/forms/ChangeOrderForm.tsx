"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, Card } from "@mui/material";
import { z } from "zod";
import TextInput from "./inputs/TextInput";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaInput from "./inputs/TextAreaInput";
import { generateNumericId } from "@/utils/generateRandom";

type ChangeOrderFormProps = {
  data: any;
  mode: "new-change-order" | "edit-change-order";
};

const ChangeOrderFormSchema = z.object({
  changeOrderName: z.string(),
  description: z.string(),
});

type Loading = "default" | "loading" | "success" | "error";
type CustomerFormValues = z.infer<typeof ChangeOrderFormSchema>;

const ChangeOrderForm = ({ data, mode }: ChangeOrderFormProps) => {
  // Hooks
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(ChangeOrderFormSchema),
    defaultValues: {
      changeOrderName: data.changeOrderName,
      description: data.description,
    },
  });

  // State
  const [loading, setLoading] = useState<Loading>("default");

  // Callbacks
  const onSubmit: SubmitHandler<CustomerFormValues> = useCallback(
    async (formData) => {
      const USER_ID = data.contractor_user_id;
      const CUSTOMER_ID = data.customer_id;
      const ESTIMATE_ID = data.estimate_id;
      const CHANGE_ORDERS_ID = data.change_order_id;
      try {
        if (mode === "edit-change-order") {
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDERS_ID}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                changeOrderName: formData.changeOrderName,
                description: formData.description,
              }),
            },
          );
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/update-status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "Change Order Requested (edited)",
              }),
            },
          );
        } else if (mode === "new-change-order") {
          const id = generateNumericId();
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                changeOrderName: formData.changeOrderName,
                description: formData.description,
                estimateName: data?.estimateName,
                customerName: data?.customerName,
                projectAddress: data?.projectAddress,
                contractor_user_id: data?.contractor_user_id,
                customer_user_id: data.customer_user_id,
                estimate_id: data.estimate_id,
              }),
            },
          );
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/update-status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "Change Order Requested",
              }),
            },
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [
      data.contractor_user_id,
      data.customer_id,
      data.estimate_id,
      data.change_order_id,
      data?.estimateName,
      data?.customerName,
      data?.projectAddress,
      data.customer_user_id,
      mode,
    ],
  );

  return (
    <FormProvider {...methods}>
      <Card
        sx={{
          backgroundColor: "surfaceContainerLow",
          padding: "1rem",
        }}
        className="w-1/2"
      >
        <form
          className="flex flex-col gap-4 rounded-lg p-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput name="changeOrderName" label="Change Order Name" />
          <TextAreaInput name="description" label="Description" />
          <Button className="" variant="contained" type="submit">
            Submit Change Order
          </Button>
        </form>
      </Card>
    </FormProvider>
  );
};

export default ChangeOrderForm;
