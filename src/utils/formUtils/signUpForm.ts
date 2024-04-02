import { RegisterFormValues } from "@/types/types";
import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";

const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_CREATE as string}`,
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
      callbackUrl: `${process.env["NEXT_PUBLIC_SIGN_IN_CALLBACK_URL"] as string}?newUser=true`,
    });

    return response;
  } catch (error) {
    // Handle any errors that occurred during the fetch request
    console.error("Error:", error);
  }
};

export { onSubmit };
