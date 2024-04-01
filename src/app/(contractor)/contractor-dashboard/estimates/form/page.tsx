import { authOptions } from "../../../../../utils/authOptions";
import EstimateForm from "@/components/forms/EstimateForm";
import Estimates from "@/components/pageComponents/customer-dashboard/Estimates";
import { db } from "@/db";
import { customers } from "@/db/schemas/customers";
import { profiles } from "@/db/schemas/userProfile";
import { Customers } from "@/types/customers";
import { Profile } from "@/types/profile";
import { eq } from "drizzle-orm";
import { Session, getServerSession } from "next-auth";

async function getCustomers() {
  const res = await db.select().from(customers);
  return res;
}

async function getProfile() {
  const session = (await getServerSession(authOptions)) as Session;
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session.user.id));
  return res;
}

const Page = async () => {
  const customers = await getCustomers();
  const profile = await getProfile();

  return (
    <main className="bg-gradient-to-br from-primary200 to-secondary200 p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1 gap-4">
      <h1 className="text-2xl desktop:text-[42px] font-bold font-sans text-primary500">
        Estimate Form
      </h1>
      <div className="flex justify-center items-center flex-1 w-full">
        <EstimateForm
          estimate={{
            id: 0,
            estimateName: "",
            customerName: "",
            customerEmail: "",
            projectAddress: "",
            contractorName: "",
            contractorAddress: "",
            contractorPhone: "",
            lineItems: [],
            message: "",
            subtotal: 0,
            taxRate: 0,
            tax: 0,
            total: 0,
            status: "",
            dateCreated: new Date(),
            dateUpdated: new Date(),
            customer_id: 0,
            customer_user_id: 0,
            contractor_user_id: 0,
          }}
          customers={customers}
          profile={profile[0]}
        />
      </div>
    </main>
  );
};

export default Page;
