"use client";

import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Customers } from "@/types/customers";
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
import { generateNumericId } from "@/utils/generateRandom";
import { SubmitHandler } from "react-hook-form";
import MVLPhoneNumber from "../inputs/MVLPhoneNumber";
import { sendAuthEmail } from "@/utils/sendAuthEmail";
import { Session } from "next-auth";
import MVLAddressInput from "../inputs/MVLAddressInput";

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

type CustomerFormValues = z.infer<typeof CustomerFormSchema>;

type LoadingState =
  | ""
  | "loading"
  | "customer-created"
  | "customer-updated"
  | "error";

export type CustomerFormProps = {
  data: Customers;
  mode: "new-customer" | "edit-customer";
  user_id?: string;
  session: Session;
};

const CustomerForm = ({ data, mode, user_id, session }: CustomerFormProps) => {
  // Hooks
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
  const [loadingState, setLoadingState] = useState<LoadingState>("");

  // Callbacks
  const submit: SubmitHandler<CustomerFormValues> = useCallback(
    async (formData) => {
      const USER_ID = data.contractor_user_id;
      const CUSTOMER_ID = data.id;

      if (mode === "new-customer") {
        try {
          setLoadingState("loading");
          const id = generateNumericId();
          const CUSTOMER_USER_ID = generateNumericId();
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}api/users/${user_id}/customers/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                address2: formData.address2,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                email: formData.email,
                phone: formData.phone,
                customer_user_id: CUSTOMER_USER_ID,
              }),
            },
          );
          if (res.status === 200) {
            setLoadingState("customer-created");
            // const emailRes = await sendAuthEmail(
            //   data.email,
            //   `${process.env.NEXT_PUBLIC_HOST}api/redirect?email-type=new-customer&customer-name=${formData.name}&contractor-name=${session.user.name}&redirect-flag=new-customer&estimate-id=null`,
            //   false,
            // );
          }
        } catch (error) {
          console.log("new customer form error", error);
          setLoadingState("error");
        }
      } else {
        try {
          setLoadingState("loading");
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                address2: formData.address2,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                email: formData.email,
                phone: formData.phone,
              }),
            },
          );
          if (res.status === 200) {
            setLoadingState("customer-updated");
          }
        } catch (error) {
          console.log("edit customer form error", error);
          setLoadingState("error");
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [data.contractor_user_id, data.id, mode, user_id],
  );

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
            <TextInput
              name="firstName"
              label="First Name"
              disabled={loadingState === "loading"}
            />
            <TextInput
              name="lastName"
              label="Last Name"
              disabled={loadingState === "loading"}
            />
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
          <TextInput
            name="email"
            label="Email"
            disabled={loadingState === "loading"}
          />
          <MVLPhoneNumber
            name="phone"
            label="Phone"
            disabled={loadingState === "loading"}
          />
          <Button
            variant="contained"
            type="submit"
            color={
              loadingState === ""
                ? "primary"
                : loadingState === "loading"
                  ? "primary"
                  : loadingState === "error"
                    ? "error"
                    : "success"
            }
            disabled={loadingState === "loading"}
          >
            {mode === "new-customer" && loadingState === "" ? (
              <Typography>Create Customer</Typography>
            ) : mode === "edit-customer" && loadingState === "" ? (
              <Typography>Update Customer</Typography>
            ) : loadingState === "loading" ? (
              <CircularProgress sx={{ color: "#001824" }} />
            ) : loadingState === "error" ? (
              <Typography>Error</Typography>
            ) : loadingState === "customer-created" ? (
              <Typography>Customer Created!</Typography>
            ) : (
              loadingState === "customer-updated" && (
                <Typography>Customer Updated!</Typography>
              )
            )}
          </Button>
        </form>
      </FormProvider>
    </Card>
  );
};

export default CustomerForm;
