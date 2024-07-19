"use client";

import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import TextInput from "./inputs/TextInput";
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileFormProps = {
  session: Session;
};

type LoadingState = "" | "loading" | "profile-created" | "error";

const ProfileFormSchema = z.object({
  businessAddress: z.string(),
  businessEmail: z.string(),
  businessName: z.string(),
  businessPhone: z.string(),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const ProfileForm = ({ session }: ProfileFormProps) => {
  //Hooks
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      businessAddress: "",
      businessEmail: "",
      businessName: "",
      businessPhone: "",
    },
  });
  const router = useRouter();

  // State
  const [loadingState, setLoadingState] = useState<LoadingState>("");

  // Callbacks
  const onSubmit: SubmitHandler<ProfileFormValues> = useCallback(
    async (data) => {
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
    },
    [router, session?.user?.id],
  );

  return (
    <FormProvider {...methods}>
      <Box
        component="div"
        className=""
        sx={{ backgroundColor: "surfaceContainerLow" }}
      >
        <form
          className="p-4 rounded flex flex-col gap-4"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput name="businessAddress" label="Business Address" />
          <TextInput name="businessEmail" label="Business Email" />
          <TextInput name="businessName" label="Business Name" />
          <TextInput name="businessPhone" label="Business Phone" />
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
          >
            {loadingState === "" ? (
              <Typography>Create Profile</Typography>
            ) : loadingState === "loading" ? (
              <CircularProgress sx={{ color: "#001824" }} />
            ) : loadingState === "error" ? (
              <Typography>Error</Typography>
            ) : (
              loadingState === "profile-created" && (
                <Typography>Profile Created!</Typography>
              )
            )}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
