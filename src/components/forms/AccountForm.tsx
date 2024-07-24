"use client";

import { Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./inputs/TextInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoadingState = "" | "loading" | "account-updated" | "error";

const AccountFormSchema = z.object({
  name: z.string(),
});

type AccountFormValues = z.infer<typeof AccountFormSchema>;

type AccountFormProps = {
  accountData: any;
  mode: "new" | "update";
};

const AccountForm = ({ accountData, mode }: AccountFormProps) => {
  //Hooks
  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      name: accountData[0].name,
    },
  });

  // State
  const [loadingState, setLoadingState] = useState<LoadingState>("");

  // Effects
  useEffect(() => {
    if (loadingState === "account-updated") {
      const timeout = setTimeout(() => {
        setLoadingState("");
      }, 5000);
      // Cleanup function
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loadingState]);

  // Callbacks
  const onSubmit: SubmitHandler<AccountFormValues> = useCallback(() => {}, []);

  return (
    <FormProvider {...methods}>
      <Box component="div" className="w-full">
        <form
          className="py-4 rounded flex flex-col gap-4 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <TextInput
            name="name"
            label="Name"
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
            {loadingState === "" ? (
              <Typography variant="body1" color="onPrimary">
                Update Name
              </Typography>
            ) : loadingState === "loading" ? (
              <CircularProgress sx={{ color: "#001824" }} />
            ) : (
              loadingState === "account-updated" && (
                <Typography variant="body1" color="onPrimary">
                  Account Updated!
                </Typography>
              )
            )}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default AccountForm;
