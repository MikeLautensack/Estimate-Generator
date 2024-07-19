import { LoginFormValues } from "@/types/types";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";

const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: true,
    callbackUrl: `${process.env.NEXT_PUBLIC_HOST}api/redirect`,
  });
};

export { onSubmit };
