"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  console.log("signInWithGoogle debug >>>>>>>>>>>>>>");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return redirect(data.url);
};
