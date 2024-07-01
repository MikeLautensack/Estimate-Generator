"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { customerFormProps } from "../../../types/formTypes";
import { CustomerForm as CustomerFormType } from "@/types/customers";
import { submitCustomer } from "@/utils/formUtils/customerForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card } from "@mui/material";
import TextInput from "../inputs/TextInput";

const CustomerFormSchema = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
});

type CustomerFormValues = z.infer<typeof CustomerFormSchema>;

const CustomerForm = ({ data }: CustomerFormType) => {
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: { name: "", address: "", email: "", phone: "" },
  });

  useEffect(() => {
    if (data != null) {
      methods.setValue("name", data.name);
      methods.setValue("address", data.address);
      methods.setValue("email", data.email);
      methods.setValue("phone", data.phone);
    }
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
          onSubmit={methods.handleSubmit(submitCustomer(data))}
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
