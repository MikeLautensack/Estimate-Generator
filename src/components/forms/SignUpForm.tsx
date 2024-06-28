"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { onSubmit } from "@/utils/formUtils/signUpForm";
import { Box, Button, Stack, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "./inputs/TextInput";
import Divider from "@mui/material/Divider";

const SignUpFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

const SignUpForm = () => {
  // Hooks
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  return (
    <FormProvider {...methods}>
      <form
        className="m-8 p-4 rounded-lg"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack spacing={2} alignItems="center">
          <Typography color="onSurface" variant="h4">
            Sign Up Free
          </Typography>
          <TextInput name="name" label="Name" />
          <TextInput name="email" label="Email Address" />
          <TextInput name="password" label="Password" />
          <TextInput name="confirmPassword" label="Confirm Password" />
          <div className="flex justify-between items-center my-2 gap-12">
            <div className="flex justify-between items-center gap-2">
              <input className="" type="checkbox"></input>
              <label className="">Remember me</label>
            </div>
            <Button variant="text">Forgot Password?</Button>
          </div>
          <Button variant="contained">Sign Up FREE</Button>
          <Divider
            flexItem
            sx={{ color: "outlineVariant", borderWidth: "1px" }}
          />
          <div className="flex justify-between items-center gap-1">
            <Typography color="onSurface" variant="body1">
              Already have an account?
            </Typography>
            <Button variant="text">Login</Button>
          </div>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
