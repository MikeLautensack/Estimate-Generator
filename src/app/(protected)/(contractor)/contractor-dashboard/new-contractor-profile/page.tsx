import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Card, Typography } from "@mui/material";
import ProfileForm from "@/components/forms/ProfileForm";
import { Session } from "next-auth";
import { db } from "@/db";
import { profiles } from "@/db/schemas/userProfile";
import { eq } from "drizzle-orm";

const getProfile = async (session: Session) => {
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session?.user?.id));
  return res;
};

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");
  const profile = await getProfile(session!);
  console.log("profile", profile);
  return (
    <main
      className={`p-4 flex flex-col flex-grow gap-2 min-h-[calc(100vh-56px)]`}
    >
      <Typography variant="h4" color="primary" className="">
        Create your contractor profile!
      </Typography>
      <Card
        sx={{ backgroundColor: "surfaceContainerLow" }}
        className="flex justify-start items-start rounded-lg p-4 w-full h-full"
      >
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
      </Card>
    </main>
  );
};

export default Page;
