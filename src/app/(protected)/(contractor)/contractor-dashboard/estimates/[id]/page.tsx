import { estimates, lineItems } from "@/db/schemas/estimates";
import { db } from "../../../../../db";
import { eq } from "drizzle-orm";
import Estimate from "@/components/pageComponents/estimates/Estimate";
import { Estimates } from "@/types/estimates";
import { auth } from "../../../../../../auth";
import { Session } from "next-auth";
import { profiles } from "@/db/schemas/userProfile";

async function getEstimate(id: number) {
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
  const data = (await getEstimate(parseInt(params.id))) as Estimates;
  const session = await auth();
  const profile = await getProfile(session!);

  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-[calc(100vh-56px)]">
      <Estimate estimate={data} profile={profile} />
    </main>
  );
};

export default Page;
