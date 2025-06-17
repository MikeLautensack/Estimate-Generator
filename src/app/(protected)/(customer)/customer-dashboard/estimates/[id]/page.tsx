import Estimate from "@/components/pageComponents/estimates/Estimate";
import { db } from "@/db";
import { estimates, lineItems } from "@/db/schemas/estimates";
import { profiles } from "@/db/schemas/userProfile";
import { Estimates } from "@/types/estimates";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { auth } from "../../../../../../auth";

async function getData(id: number) {
  try {
    const estimateTableData = await db
      .select()
      .from(estimates)
      .where(eq(estimates.id, id));
    const lineItemsTableData = await db
      .select()
      .from(lineItems)
      .where(eq(lineItems.estimate_id, id));
    const estimate = {
      ...estimateTableData[0],
      lineItems: lineItemsTableData,
    };
    return estimate;
  } catch (error) {
    console.log(error);
  }
}

const getProfile = async (session: Session) => {
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session?.user?.id));
  return res;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const data = (await getData(parseInt(params.id))) as Estimates;
  const session = await auth();
  const profile = await getProfile(session!);

  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-screen">
      <Estimate estimate={data} profile={profile} />
    </main>
  );
};

export default Page;
