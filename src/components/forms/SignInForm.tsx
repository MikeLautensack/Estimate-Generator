"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import TextInput from "./inputs/TextInput";
import { z } from "zod";
import Divider from "@mui/material/Divider";
import { SubmitHandler } from "react-hook-form";
import { LoginFormValues } from "@/types/types";
import { signIn } from "next-auth/react";

const SignInFormSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

const SignInForm = () => {
  // Hooks
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("debugging customer form validation", methods.formState.errors);

  // Search params
  const searchParams = useSearchParams();

  // State
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState("");

  // Effects
  useEffect(() => {
    if (searchParams) {
      const authError = searchParams.get("error");
      if (authError) {
        if (authError === "Configuration") {
          setServerError("Invalid Credentials");
        }
      }
    }
  }, [searchParams]);

  // Callbacks
  const onSubmit: SubmitHandler<LoginFormValues> = useCallback(async (data) => {
    setLoading("loading");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}api/redirect`,
    });
    setLoading("");
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        className="m-8 p-4 rounded-xl"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack spacing={2}>
          <div className="flex flex-col justify-center items-center gap-2">
            <Typography color="onSurface" variant="h4">
              Welcome Back
            </Typography>
            <Typography color="onSurface" variant="body1">
              Please log in to continue
            </Typography>
          </div>
          <div className="flex flex-col gap-4">
            <TextInput
              name="email"
              label="Email Address"
              disabled={loading === "loading"}
            />
            <TextInput
              name="password"
              label="Password"
              disabled={loading === "loading"}
              type="password"
            />
            {serverError === "Invalid Credentials" && (
              <Typography variant="body1" color="error">
                Invalid Credentials
              </Typography>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              disabled={loading === "loading"}
            >
              {loading !== "loading" ? (
                "Sign In"
              ) : loading === "loading" ? (
                <CircularProgress sx={{ color: "#001824" }} />
              ) : (
                "error"
              )}
            </Button>
          </div>
          <Divider
            flexItem
            sx={{ color: "outlineVariant", borderWidth: "1px" }}
          />
          <div className="flex justify-center items-center gap-2">
            <Typography variant="body1" color="onSurface">
              No account yet?
            </Typography>
            <Button variant="text" disabled={loading === "loading"}>
              Sign Up
            </Button>
          </div>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
