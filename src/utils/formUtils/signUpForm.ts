import { RegisterFormValues } from "@/types/types";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";

const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
  await fetch(`${process.env.NEXT_PUBLIC_USER_CREATE}`, {
      method: "POST",
      body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "contractor"
      }),
  }).then((res) => {
    signIn("credentials", {
        email: data.email, 
        password: data.password, 
        redirect: true,
        callbackUrl: `${process.env["NEXT_PUBLIC_SIGN_IN_CALLBACK_URL"]}?newUser=true`
    });
  });
}

export {
    onSubmit
}