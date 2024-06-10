"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginFormValues } from "@/types/types";
import { onSubmit } from "@/utils/formUtils/signInForm";
import signInSchema from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signInSchema),
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
    <form
      className="bg-blue-100 m-8 p-4 rounded-xl w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <h2 className="text-base font-medium">Please log in to continue</h2>
      </div>
      <div className="my-2 w-full">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              label="Email Address"
              error={!!errors.email || emailInputServerError}
              helperText={errors.email?.message || serverEmailErrorText}
            />
          )}
        />
      </div>
      <div className="my-2 w-full">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              {...field}
              label="Password"
              error={!!errors.password || passwordInputServerError}
              helperText={errors.password?.message || serverPasswordErrorText}
            />
          )}
        />
      </div>
      <div className="flex justify-between my-2 items-center">
        <div className="flex gap-2 justify-center items-center">
          <input className="" type="checkbox"></input>
          <label className="text-black">Remember me</label>
        </div>
        <Button className="text-black">Forgot Password?</Button>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </div>
      <div id="divider" className="w-full border border-black my-4"></div>
      <div className="flex justify-center items-center">
        <p className="text-[14px] text-black font-normal">No account yet?</p>
        <Button className="text-[14px] font-normal text-black">Sign Up</Button>
      </div>
    </form>
  );
};

export default SignInForm;
