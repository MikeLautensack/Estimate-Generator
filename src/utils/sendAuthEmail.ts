import { signIn } from "../../supabase/client";

export const sendAuthEmail = async (
  email: string,
  callbackUrl: string,
  redirect: boolean,
) => {
  throw new Error("Not implemented");
};
