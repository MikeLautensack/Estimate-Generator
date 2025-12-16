import { estimates, lineItems } from "@/db/schemas/estimates";
import { eq } from "drizzle-orm";
import Estimate from "@/components/pageComponents/estimates/Estimate";
import { Estimates } from "@/types/estimates";
import { profiles } from "@/db/schemas/profiles";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex-1 p-8 desktop:px-16 lg:px-32 min-h-[calc(100vh-56px)]">
      estimate page
      {/* <Estimate estimate={data} profile={profile} /> */}
    </main>
  );
};

export default Page;
