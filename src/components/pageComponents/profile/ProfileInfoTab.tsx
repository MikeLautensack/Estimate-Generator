import ProfileForm from "@/components/forms/ProfileForm";
import { Box } from "@mui/system";
import { Session } from "next-auth";
import React from "react";

type ProfileInfoTabProps = {
  session: Session;
  profileData: any;
};

const ProfileInfoTab = ({ session, profileData }: ProfileInfoTabProps) => {
  console.log("profiledata__________", profileData);
  return (
    <Box
      component="div"
      className="flex flex-col gap-4 justify-start items-center"
    >
      <ProfileForm session={session!} profileData={profileData} mode="update" />
    </Box>
  );
};

export default ProfileInfoTab;
