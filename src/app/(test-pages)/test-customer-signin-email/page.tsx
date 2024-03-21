"use client";

import ProfileForm from "@/components/forms/ProfileForm";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";

export default function page() {
  return (
    <div className="flex justify-center items-center bg-primary300">
      <Button
        onClick={() => {
          signIn("email", {
            email: "mikelautensack100@gmail.com",
            callbackUrl: "http://localhost:3000/api/redirect",
            redirect: false,
          });
        }}
      >
        <Mail className="mr-2 h-4 w-4" /> Email Provider
      </Button>
      <Button
        onClick={() => {
          signIn("resend", {
            email: "mikelautensack100@gmail.com",
            callbackUrl: "http://localhost:3000/api/redirect",
          });
        }}
      >
        <Mail className="mr-2 h-4 w-4" /> Custom Provider
      </Button>
      <ProfileForm />
    </div>
  );
}
