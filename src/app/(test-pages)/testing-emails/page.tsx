"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default function page() {

  return (
    <div className="">
        <Button
            className=""
            onClick={async () => {
                signIn("email", {email: "mikelautensack100@gmail.com", callbackUrl: "http://localhost:3000/api/redirect?email-type=new-customer&customer-name=john-snow&contractor-name=colorcoatings-llc&redirect-flag=new-customer", redirect: false})
            }}
        >
            New Customer Email
        </Button>
        <Button
            className=""
            onClick={async () => {
                signIn("email", {email: "mikelautensack100@gmail.com", callbackUrl: "http://localhost:3000/api/redirect?email-type=new-estimate&customer-name=john-snow&contractor-name=colorcoatings-llc&redirect-flag=new-estimate&estimate-id=5336368", redirect: false})
            }}
        >
            New Estimate Email
        </Button>
        <Button
            className=""
            onClick={async () => {
                signIn("email", {email: "mikelautensack100@gmail.com", callbackUrl: "http://localhost:3000/api/redirect?email-type=updated-estimate&customer-name=john-snow&contractor-name=colorcoatings-llc&redirect-flag=updated-estimate&estimate-id=5336368", redirect: false})
            }}
        >
            Update Estimate Email
        </Button>
    </div>
  );
}
