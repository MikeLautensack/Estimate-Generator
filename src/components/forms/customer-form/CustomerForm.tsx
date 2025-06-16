"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import TextInput from "../inputs/TextInput";
import { SubmitHandler } from "react-hook-form";
import MVLPhoneNumber from "../inputs/MVLPhoneNumber";
import MVLAddressInput from "../inputs/MVLAddressInput";
import { useCustomersFormContext } from "@/contexts/CustomersFormContext";

const CustomerFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  address2: z.string(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "Zip Code is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  phone: z.string().min(1, { message: "Phone is required" }),
});

export type CustomerFormValues = z.infer<typeof CustomerFormSchema>;

const CustomerForm = () => {
  // Hooks
  const { mode, setOpen, data, id } = useCustomersFormContext();
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      email: data.email,
      phone: data.phone,
    },
  });

  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Event Handlers
  const submit: SubmitHandler<CustomerFormValues> = async (formData) => {
    let route = "/api/customers";
    let method = "POST";
    let body = {};

    if (mode === "create") {
      body = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        email: formData.email,
        phone: formData.phone,
      };
    }

    if (mode === "update") {
      route = `/api/customers/${id}`;
      method = "PATCH";
      body = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        email: formData.email,
        phone: formData.phone,
      };
    }

    try {
      setLoading(true);
      const res = await fetch(route, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.status !== 200) setError(true);
    } catch (error: any) {
      console.error("Customer form error", error);
      setLoading(false);
      setError(true);
    } finally {
      setLoading(false);
      methods.reset();
      setOpen(false);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "surfaceContainerLow",
        padding: "1rem",
        width: "30rem",
      }}
    >
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={methods.handleSubmit(submit)}
        >
          <Typography variant="h6">Customers Name</Typography>
          <div className="flex justify-center items-center gap-4">
            <TextInput name="firstName" label="First Name" disabled={loading} />
            <TextInput name="lastName" label="Last Name" disabled={loading} />
          </div>
          <Divider />
          <Typography variant="h6">Customers Project Address</Typography>
          <MVLAddressInput
            addressInputNames={{
              address: "address",
              address2: "address2",
              city: "city",
              state: "state",
              zip: "zip",
            }}
          />
          <Divider />
          <Typography variant="h6">Customers Contact Information</Typography>
          <TextInput name="email" label="Email" disabled={loading} />
          <MVLPhoneNumber name="phone" label="Phone" disabled={loading} />
          <Button
            variant="contained"
            type="submit"
            color={loading ? "primary" : ""}
            disabled={loading}
          >
            {mode === "create" && !loading ? (
              <Typography>Create Customer</Typography>
            ) : mode === "update" && !loading ? (
              <Typography>Update Customer</Typography>
            ) : (
              loading && <CircularProgress sx={{ color: "#001824" }} />
            )}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CustomerForm;
