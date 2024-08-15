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
import { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UploadButton } from "../../utils/uploadthing";
import MVLAddressInput from "./inputs/MVLAddressInput";

type ProfileFormProps = {
  session: Session;
  profileData?: any;
  mode: "new" | "update";
  profile?: any;
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

const ProfileForm = ({ session, profileData, mode }: ProfileFormProps) => {
  //Hooks
  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      businessAddress: profileData[0].businessAddress,
      businessAddress2: profileData[0].businessAddress2,
      businessCity: profileData[0].businessCity,
      businessState: profileData[0].businessState,
      businessZip: profileData[0].businessZip,
      businessEmail: profileData[0].businessEmail,
      businessName: profileData[0].businessName,
      businessPhone: profileData[0].businessPhone,
      profileImgKey: profileData[0].profileImgKey,
      profileImgUrl: profileData[0].profileImgUrl,
    },
  });

  const router = useRouter();

  // State
  const [loadingState, setLoadingState] = useState<LoadingState>("");
  const [profileImg, setProfileImg] = useState<string>(
    profileData ? profileData[0].profileImgUrl : "/images/Profile.png",
  );

  // Callbacks
  const onSubmit: SubmitHandler<ProfileFormValues> = useCallback(
    async (data) => {
      if (mode === "new") {
        setLoadingState("loading");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${session?.user?.id}/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );

        if (res.status === 200) {
          setLoadingState("profile-created");
          setTimeout(() => {
            router.push(`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard`);
            return res;
          }, 500);
        } else {
          setLoadingState("error");
        }
      } else if (mode === "update") {
        setLoadingState("loading");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/users/${session?.user?.id}/profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        if (res.status === 200) {
          setLoadingState("profile-updated");
        } else {
          setLoadingState("error");
        }
      }
    },
    [mode, router, session?.user?.id],
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
            {loadingState === "" && mode === "new" ? (
              <Typography>Create Profile</Typography>
            ) : loadingState === "" && mode === "update" ? (
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
