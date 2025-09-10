import { Typography } from "@mui/material";
import EstimateForm from "@/components/forms/estimate-form/EstimateForm";
import { generateNumericId } from "@/utils/generateRandom";
import DIContainer from "@/core/IoCContainer";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

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
            contractor_user_id: data?.user.id,
          }}
          customers={customers}
          profile={profile[0]}
          mode="new-estimate"
          data={data!}
        />
      </div>
    </main>
  );
};

export default Page;
