"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { effect, z } from "zod";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import TextInput from "./inputs/TextInput";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileFormProps = {
  session: Session;
  profileData?: any;
  mode: "new" | "update";
};

type LoadingState =
  | ""
  | "loading"
  | "profile-created"
  | "profile-updated"
  | "error";

const ProfileFormSchema = z.object({
  businessAddress: z
    .string()
    .min(1, { message: "Business Address is required" }),
  businessEmail: z.string().min(1, { message: "Business Email is required" }),
  businessName: z.string().min(1, { message: "Business Name is required" }),
  businessPhone: z.string().min(1, { message: "Business Phone is required" }),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const ProfileForm = ({ session, profileData, mode }: ProfileFormProps) => {
  //Hooks
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      businessAddress: profileData[0].businessAddress,
      businessEmail: profileData[0].businessEmail,
      businessName: profileData[0].businessName,
      businessPhone: profileData[0].businessPhone,
    },
  });

  const router = useRouter();

  // State
  const [loadingState, setLoadingState] = useState<LoadingState>("");

  // Callbacks
  const onSubmit: SubmitHandler<ProfileFormValues> = useCallback(
    async (data) => {
      if (mode === "new") {
        setLoadingState("loading");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${session?.user?.id}/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (res.status === 200) {
          setLoadingState("profile-created");
          setTimeout(() => {
            router.push(`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard`);
            return res;
          }, 500);
        } else {
          setLoadingState("error");
        }
      } else if (mode === "update") {
        setLoadingState("loading");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${session?.user?.id}/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        if (res.status === 200) {
          setLoadingState("profile-updated");
        } else {
          setLoadingState("error");
        }
      }
    },
    [mode, router, session?.user?.id],
  );

  return (
    <FormProvider {...methods}>
      <Box component="div" className="w-full">
        <form
          className="p-4 rounded flex flex-col gap-4 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput
            name="businessAddress"
            label="Business Address"
            disabled={loadingState === "loading"}
          />
          <TextInput
            name="businessEmail"
            label="Business Email"
            disabled={loadingState === "loading"}
          />
          <TextInput
            name="businessName"
            label="Business Name"
            disabled={loadingState === "loading"}
          />
          <TextInput
            name="businessPhone"
            label="Business Phone"
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
            {loadingState === "" && mode === "new" ? (
              <Typography>Create Profile</Typography>
            ) : loadingState === "" && mode === "update" ? (
              <Typography>Update Profile</Typography>
            ) : loadingState === "loading" ? (
              <CircularProgress sx={{ color: "#001824" }} />
            ) : loadingState === "error" ? (
              <Typography>Error</Typography>
            ) : loadingState === "profile-created" ? (
              <Typography>Profile Created!</Typography>
            ) : (
              loadingState === "profile-updated" && (
                <Typography>Profile Updated!</Typography>
              )
            )}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
