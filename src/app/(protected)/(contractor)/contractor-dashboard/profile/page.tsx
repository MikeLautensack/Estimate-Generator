import ProfilePageTabs from "@/components/pageComponents/profile/ProfilePageTabs";
import { Card, Typography } from "@mui/material";
import React from "react";
import DIContainer from "@/core/IoCContainer";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";

const page = async () => {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  const profileData = await DIContainer.profilesUseCases.getProfileByUserId(
    user.id,
  );

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 flex-1">
      <Typography variant="h4" color="primary" className="">
        Contractor Profile
      </Typography>
      <Card
        sx={{ backgroundColor: "surfaceContainerLow" }}
        className="flex justify-start items-start rounded-lg p-4 w-full h-full"
      >
        <ProfileForm profile={profileData} />
      </Card>
    </main>
  );
};

export default page;
