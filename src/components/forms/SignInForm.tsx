"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmit } from "@/utils/formUtils/signInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import TextInput from "./inputs/TextInput";
import { z } from "zod";
import Divider from "@mui/material/Divider";

const SignInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

const SignInForm = () => {
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Search params
  const searchParams = useSearchParams();

  // State
  const [serverEmailErrorText, setServerEmailErrorText] = useState<string>("");
  const [serverPasswordErrorText, setServerPasswordErrorText] =
    useState<string>("");
  const [emailInputServerError, setEmailInputServerError] =
    useState<boolean>(false);
  const [passwordInputServerError, setPasswordInputServerError] =
    useState<boolean>(false);

  // Effects
  useEffect(() => {}, []);

  useEffect(() => {
    let authError: string | null = null;
    if (searchParams) {
      authError = searchParams.get("error");
      if (authError) {
        if (authError === "Email not found") {
          setEmailInputServerError(true);
          setServerEmailErrorText(authError);
        } else if (authError === "Invalid password") {
          setPasswordInputServerError(true);
          setServerPasswordErrorText(authError);
        }
      }
    }
  }, [searchParams]);

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
            <TextInput name="email" label="Email Address" />
            <TextInput name="password" label="Password" />
          </div>
          <div className="flex justify-between my-2 items-center gap-16">
            <div className="flex gap-2 justify-center items-center">
              <input className="" type="checkbox"></input>
              <Typography variant="body1" color="onSurface">
                Remember me
              </Typography>
            </div>
            <Button className="text-black">Forgot Password?</Button>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button type="submit" variant="contained">
              Sign In
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
            <Button variant="text">Sign Up</Button>
          </div>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignInForm;
