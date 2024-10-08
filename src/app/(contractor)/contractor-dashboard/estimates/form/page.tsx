import { db } from "@/db";
import { customers } from "@/db/schemas/customers";
import { profiles } from "@/db/schemas/userProfile";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../../auth";
import { Typography } from "@mui/material";
import EstimateForm from "@/components/forms/estimate-form/EstimateForm";
import { Session } from "next-auth";
import { generateNumericId } from "@/utils/generateRandom";

async function getCustomers(session: Session) {
  const res = await db
    .select()
    .from(customers)
    .where(eq(customers.contractor_user_id, session?.user.id));
  return res;
}

async function getProfile() {
  const session = await auth();
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session?.user.id));
  return res;
}

const Page = async () => {
  const session = await auth();
  const customers = await getCustomers(session!);
  const profile = await getProfile();

  const newEstimateId = generateNumericId();
  const newLineItemId = generateNumericId();

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 w-full lg:w-[calc(100vw-258px)]">
      <Typography variant="h4" color="primary">
        Estimate Form
      </Typography>
      <div className="flex justify-center items-center flex-1 w-full">
        <EstimateForm
          estimate={{
            id: newEstimateId.toString(),
            estimateName: "",
            customerFirstName: "",
            customerLastName: "",
            customerEmail: "",
            projectAddress: "",
            projectAddress2: "",
            projectCity: "",
            projectState: "",
            projectZip: "",
            contractorName: "",
            contractorAddress: "",
            contractorAddress2: "",
            contractorCity: "",
            contractorState: "",
            contractorZip: "",
            contractorPhone: "",
            createdAt: new Date().toISOString().slice(0, 10),
            updatedAt: new Date().toISOString().slice(0, 10),
            expirationDate: new Date().toISOString().slice(0, 10),
            lineItems: [
              {
                id: newLineItemId.toString(),
                item: "",
                description: "",
                quantity: "0",
                rateType: "Unit",
                price: "0",
                amount: "0",
              },
            ],
            message: "",
            subtotal: "0",
            taxMode: "No Tax",
            taxRate: "0",
            discountMode: "No Discount",
            discountPercentage: "0",
            discount: "0",
            tax: "",
            total: "0",
            status: "new-estimate",
            customer_id: "",
            customer_user_id: "",
            contractor_user_id: session?.user.id,
          }}
          customers={customers}
          profile={profile[0]}
          mode="new-estimate"
          session={session!}
        />
      </div>
    </main>
  );
};

export default Page;
