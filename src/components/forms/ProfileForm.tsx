"use client";

import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import TextInput from "./inputs/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UploadButton } from "../../utils/uploadthing";
import MVLAddressInput from "./inputs/MVLAddressInput";
import { ProfileSelect } from "@/db/schemas/profiles";

type ProfileFormProps = {
  profile?: ProfileSelect;
};

type LoadingState =
  | ""
  | "loading"
  | "profile-created"
  | "profile-updated"
  | "error";

const ProfileFormSchema = z.object({
  businessAddress: z
    .string()
    .min(1, { message: "Business Address is required" }),
  businessAddress2: z.string(),
  businessCity: z.string().min(1, { message: "Business City is required" }),
  businessState: z.string().min(1, { message: "Business State is required" }),
  businessZip: z.string().min(1, { message: "Business Zip is required" }),
  businessEmail: z
    .string()
    .min(1, { message: "Business Email is required" })
    .email(),
  businessName: z.string().min(1, { message: "Business Name is required" }),
  businessPhone: z.string().min(1, { message: "Business Phone is required" }),
  profileImgKey: z.string(),
  profileImgUrl: z.string(),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

const ProfileForm = ({ profile }: ProfileFormProps) => {
  //Hooks
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      businessAddress: profile ? profile.businessAddress : "",
      businessAddress2: profile ? profile.businessAddress2 : "",
      businessCity: profile ? profile.businessCity : "",
      businessState: profile ? profile.businessState : "",
      businessZip: profile ? profile.businessZip : "",
      businessEmail: profile ? profile.businessEmail : "",
      businessName: profile ? profile.businessName : "",
      businessPhone: profile ? profile.businessPhone : "",
      profileImgKey: profile ? profile.profileImgKey! : "",
      profileImgUrl: profile ? profile.profileImgUrl! : "",
    },
  });

  const router = useRouter();

  // State
  const [loadingState, setLoadingState] = useState<LoadingState>("");
  const [profileImg, setProfileImg] = useState<string>(
    profile ? profile.profileImgUrl! : "/images/Profile.png",
  );

  // Callbacks
  const onSubmit: SubmitHandler<ProfileFormValues> = useCallback(
    async (data) => {
      setLoadingState("loading");
      const endpoint = profile ? "/api/profiles/" : "";
      const method = profile ? "PATCH" : "POST";
      const body = {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(data),
      };
      const res = await fetch(endpoint, body);

      if (res.status === 200) {
        const loadingState = profile ? "profile-updated" : "profile-created";
        setLoadingState(loadingState);
        setTimeout(() => {
          router.push(`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard`);
          return res;
        }, 500);
      } else {
        setLoadingState("error");
      }
    },
    [router],
  );

  return (
    <FormProvider {...methods}>
      <Box component="div" className="w-full flex flex-col">
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <div className="">
            <Image
              src={profileImg}
              width={100}
              height={100}
              alt="Profile Picture"
              className="rounded-full"
            />
          </div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              // Do something with the response
              setProfileImg(`${res[0].url}`);
              methods.setValue("profileImgKey", res[0].key);
              methods.setValue("profileImgUrl", res[0].url);
              console.log("Files: ", res);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              console.log(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <form
          className="p-4 rounded flex flex-col gap-4 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Divider />
          <Typography variant="h6">Business Profile Name</Typography>
          <TextInput
            name="businessName"
            label="Business Name"
            disabled={loadingState === "loading"}
          />
          <Divider />
          <Typography variant="h6">Business Contact Info</Typography>
          <TextInput
            name="businessEmail"
            label="Business Email"
            disabled={loadingState === "loading"}
          />
          <TextInput
            name="businessPhone"
            label="Business Phone"
            disabled={loadingState === "loading"}
          />
          <Divider />
          <Typography variant="h6">Business Address</Typography>
          <MVLAddressInput
            addressInputNames={{
              address: "businessAddress",
              address2: "businessAddress2",
              city: "businessCity",
              state: "businessState",
              zip: "businessZip",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            color={
              loadingState === ""
                ? "primary"
                : loadingState === "loading"
                  ? "primary"
                  : loadingState === "error"
                    ? "error"
                    : "success"
            }
            disabled={loadingState === "loading"}
            onClick={() => console.log("submitting profile form")}
          >
            {loadingState === "" && !profile ? (
              <Typography>Create Profile</Typography>
            ) : loadingState === "" && profile ? (
              <Typography>Update Profile</Typography>
            ) : loadingState === "loading" ? (
              <CircularProgress sx={{ color: "#001824" }} />
            ) : loadingState === "error" ? (
              <Typography>Error</Typography>
            ) : loadingState === "profile-created" ? (
              <Typography>Profile Created!</Typography>
            ) : (
              loadingState === "profile-updated" && (
                <Typography>Profile Updated!</Typography>
              )
            )}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
