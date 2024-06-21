"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  ChangeOrderFormProps,
  ChangeOrderForm as ChangeOrderFormType,
} from "@/types/formTypes";

const ChangeOrderForm = (data: ChangeOrderFormType) => {
  const { register, handleSubmit } = useForm<ChangeOrderFormProps>();

  const onSubmit: SubmitHandler<ChangeOrderFormProps> = async (formData) => {
    const USER_ID = data.data.contractor_user_id;
    const CUSTOMER_ID = data.data.customer_user_id;
    const ESTIMATE_ID = data.data.estimate_id;
    const CHANGE_ORDERS_ID = data.data.change_order_id;
    try {
      if (data.data?.mode == "put") {
        await fetch(
          `${process.env.HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDERS_ID}`,
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
          `${process.env.HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
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
      } else if (data.data?.mode == "post") {
        await fetch(
          `${process.env.HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDERS_ID}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              changeOrderName: formData.changeOrderName,
              description: formData.description,
              estimateName: data.data?.estimateName,
              customerName: data.data?.customerName,
              projectAddress: data.data?.projectAddress,
              contractor_user_id: data.data?.contractor_user_id,
              customer_user_id: data.data.customer_user_id,
              estimate_id: data.data.estimate_id,
            }),
          },
        );
        await fetch(
          `${process.env.HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
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
  };

  return (
    <form
      className="flex flex-col gap-4 bg-neutral100 rounded-lg p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <label>Change Order Name</label>
        <input
          className="bg-neutral500 rounded"
          {...register("changeOrderName")}
        ></input>
      </div>
      <div className="flex flex-col gap-1">
        <label>Change Order Description</label>
        <textarea
          className="bg-neutral500 rounded"
          {...register("description")}
        ></textarea>
      </div>
      <Button className="">Submit Change Order</Button>
    </form>
  );
};

export default ChangeOrderForm;
