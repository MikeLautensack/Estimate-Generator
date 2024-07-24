import ProfilePageTabs from "@/components/pageComponents/profile/ProfilePageTabs";
import { Card, Typography } from "@mui/material";
import React from "react";
import { auth } from "../../../../../auth";
import { Session } from "next-auth";
import { profiles } from "@/db/schemas/userProfile";
import { db } from "@/db";
import { eq } from "drizzle-orm";

async function getData(session: Session) {
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session.user?.id));
  return res;
}

const page = async () => {
  const session = await auth();
  const profileData = await getData(session!);
  console.log("profile data", profileData);
  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 flex-1">
      <Typography variant="h4" color="primary" className="">
        Contractor Profile
      </Typography>
      <Card
        sx={{ backgroundColor: "surfaceContainerLow" }}
        className="flex justify-start items-start rounded-lg p-4 w-full h-full"
      >
        <ProfilePageTabs session={session!} profileData={profileData} />
      </Card>
    </main>
  );
};

export default page;
