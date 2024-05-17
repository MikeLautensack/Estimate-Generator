"use client";

import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoginFormValues } from "@/types/types";
import { onSubmit } from "@/utils/formUtils/signInForm";
import signInSchema from "@/validations/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField, Typography } from "@mui/material";

const SignInForm = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
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

  return (
    <form
      className="bg-blue-100 m-8 p-4 rounded-xl w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography>Welcome Back</Typography>
      <Typography>Please log in to continue</Typography>
      <div className="my-2">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </div>
      <div className="my-2">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </div>
      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          <input className="" type="checkbox"></input>
          <label className="text-black">Remember me</label>
        </div>
        <Button className="text-black">Forgot Password?</Button>
      </div>
      <Button
        className="w-full bg-blue-500 text-secondary500 py-2 rounded"
        type="submit"
        variant="text"
      >
        Sign In
      </Button>
      <div id="divider" className="w-full border border-black my-4"></div>
      <div className="flex gap-1 justify-center">
        <p className="text-[14px] text-black font-normal">No account yet?</p>
        <Button className="text-[14px] font-normal text-black">Sign Up</Button>
      </div>
    </form>
  );
};

export default SignInForm;
