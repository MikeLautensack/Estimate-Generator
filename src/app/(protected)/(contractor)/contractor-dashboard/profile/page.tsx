import ProfilePageTabs from "@/components/pageComponents/profile/ProfilePageTabs";
import { Card, Typography } from "@mui/material";
import React from "react";
import DIContainer from "@/core/DIContainer";
import { redirect } from "next/navigation";

const page = async () => {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 flex-1">
      <Typography variant="h4" color="primary" className="">
        Contractor Profile
      </Typography>
      <Card
        sx={{ backgroundColor: "surfaceContainerLow" }}
        className="flex justify-start items-start rounded-lg p-4 w-full h-full"
      >
        {/* <ProfilePageTabs session={session!} profileData={profileData} /> */}
      </Card>
    </main>
  );
};

export default page;
