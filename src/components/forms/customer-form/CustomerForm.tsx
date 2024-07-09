"use client";

import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { customerFormProps } from "../../../types/formTypes";
import { Customers } from "@/types/customers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "@mui/material";
import TextInput from "../inputs/TextInput";
import { generateNumericId } from "@/utils/generateRandom";

const CustomerFormSchema = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
});

type CustomerFormValues = z.infer<typeof CustomerFormSchema>;

export type CustomerFormProps = {
  data: Customers;
  mode: "new-customer" | "edit-customer";
  user_id?: string;
};

const CustomerForm = ({ data, mode, user_id }: CustomerFormProps) => {
  // Hooks
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: { name: "", address: "", email: "", phone: "" },
  });

  // Callbacks
  const submit = useCallback(async (formData: CustomerFormValues) => {
    const USER_ID = data.contractor_user_id;
    const CUSTOMER_ID = data.id;

    if (mode === "new-customer") {
      try {
        console.log("post customer");
        const id = generateNumericId();
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${user_id}/customers/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              customer_user_id: user_id,
            }),
          },
        );
      } catch (error) {
        console.log("new customer form error", error);
      }
    } else {
      try {
        console.log("patch customer");
        await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              address: formData.address,
              email: formData.email,
              phone: formData.phone,
            }),
          },
        );
      } catch (error) {
        console.log("edit customer form error", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effects
  useEffect(() => {
    if (data !== null) {
      methods.setValue("name", data.name);
      methods.setValue("address", data.address);
      methods.setValue("email", data.email);
      methods.setValue("phone", data.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: "surfaceContainerLow",
        padding: "1rem",
        width: "20rem",
      }}
    >
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4"
          onSubmit={methods.handleSubmit(submit)}
        >
          <TextInput name="name" label="Name" />
          <TextInput name="address" label="Address" />
          <TextInput name="email" label="Email" />
          <TextInput name="phone" label="Phone" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CustomerForm;
