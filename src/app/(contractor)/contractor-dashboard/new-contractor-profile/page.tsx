import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import ProfileForm from "@/components/forms/ProfileForm";
import { SessionProvider } from "next-auth/react";

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");
  return (
    <main
      className={`p-4 flex flex-col flex-grow gap-2 min-h-[calc(100vh-56px)]`}
    >
      <Typography variant="h4" color="primary" className="">
        Create your contractor profile!
      </Typography>
      <ProfileForm
        session={session}
        mode="new"
        profileData={[
          {
            businessAddress: "",
            businessEmail: "",
            businessName: "",
            businessPhone: "",
            profileImgKey: "",
            profileImgUrl: "",
          },
        ]}
      />
    </main>
  );
};

export default Page;
