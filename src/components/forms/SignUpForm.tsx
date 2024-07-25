"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "./inputs/TextInput";
import Divider from "@mui/material/Divider";
import { generateNumericId } from "@/utils/generateRandom";
import { signIn } from "next-auth/react";

const SignUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignUpFormValues = z.infer<typeof SignUpFormSchema>;

const SignUpForm = () => {
  // Hooks
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  // State
  const [loading, setLoading] = useState("");

  // Callbacks
  const onSubmit: SubmitHandler<SignUpFormValues> = useCallback(
    async (data) => {
      const id = generateNumericId();
      try {
        setLoading("loading");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${id}`,
          {
            method: "POST",
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password,
              role: "contractor",
            }),
          },
        );

        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: `${process.env.NEXT_PUBLIC_HOST}api/redirect?newUser=true`,
        });
        setLoading("");
        return response;
      } catch (error) {
        // Handle any errors that occurred during the fetch request
        console.error("Error:", error);
      }
    },
    [],
  );

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
          <TextInput
            name="name"
            label="Name"
            disabled={loading === "loading"}
          />
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
          {/* <TextInput
            name="confirmPassword"
            label="Confirm Password"
            disabled={loading === "loading"}
          /> */}
          {/* <div className="flex justify-between items-center my-2 gap-12">
            <div className="flex justify-between items-center gap-2">
              <input className="" type="checkbox"></input>
              <label className="">Remember me</label>
            </div>
            <Button variant="text">Forgot Password?</Button>
          </div> */}
          <Button
            variant="contained"
            type="submit"
            disabled={loading === "loading"}
          >
            {loading === ""
              ? "Sign Up"
              : loading === "loading" && (
                  <CircularProgress sx={{ color: "#001824" }} />
                )}
          </Button>
          <Divider
            flexItem
            sx={{ color: "outlineVariant", borderWidth: "1px" }}
          />
          <div className="flex justify-between items-center gap-1">
            <Typography color="onSurface" variant="body1">
              Already have an account?
            </Typography>
            <Button variant="text" disabled={loading === "loading"}>
              Login
            </Button>
          </div>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
