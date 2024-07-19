import { signIn } from "next-auth/react";

export const sendAuthEmail = async (
  email: string,
  callbackUrl: string,
  redirect: boolean,
) => {
  const res = await signIn("resend", {
    email: email,
    callbackUrl: callbackUrl,
    redirect: redirect,
  });
  return res;
};
